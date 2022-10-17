import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import React from 'react';
import HeaderBar from './components/HeaderBar';
import {useState} from 'react';
import {
  createDayHourChunks,
  createDayWiseCalendar,
  createMonthHandler,
  createMonthWeekChunks,
  getAllMonths,
  getCurrentMonth,
  getCurrentYear,
  reservations,
} from './data';
import MonthWeekSlider from './components/MonthWeekSlider';
import MonthCalendar from './components/MonthCalendar';
import WeekBar from './components/WeekBar';
import {useEffect} from 'react';
import WeekCalendar from './components/WeekCalendar';
import R from '@components/utils/R';

const CalendarMain = props => {
  const {typeOfCalendar} = props;
  const [calenderType, setCalenderType] = useState(typeOfCalendar);
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [monthArray, setMonthArray] = useState([]);
  const [monthWeekSliderData, setMonthWeekSliderData] = useState(
    getAllMonths(),
  );
  const [selectedWeeklyChunk, setSelectedWeeklyChunk] = useState([]);
  const [selectedDailyChunk, setSelectedDailyChunk] = useState(null);

  useEffect(() => {
    setCalenderType(typeOfCalendar.toLowerCase());
  }, [typeOfCalendar]);

  useEffect(() => {
    if (calenderType === 'month') {
      if (selectedMonth && selectedYear) {
        let month = createMonthHandler(selectedMonth, selectedYear);
        setMonthArray(month);
        setMonthWeekSliderData(getAllMonths());
      }
    }
    if (calenderType === 'week') {
      let month = createMonthWeekChunks(selectedMonth, selectedYear);
      setMonthWeekSliderData(month);
      setSelectedWeeklyChunk(month[0]);
    }
    if (calenderType === 'day') {
      let month = createDayWiseCalendar(selectedMonth, selectedYear);
      setMonthWeekSliderData(month);
      setSelectedDailyChunk(month[0]);
    }
  }, [selectedMonth, selectedYear, calenderType]);

  return (
    <View style={styles.container}>
      <HeaderBar
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        calenderType={calenderType}
      />
      <MonthWeekSlider
        calenderType={calenderType}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        monthWeekSliderData={monthWeekSliderData}
        selectedWeeklyChunk={selectedWeeklyChunk}
        setSelectedWeeklyChunk={setSelectedWeeklyChunk}
        selectedDailyChunk={selectedDailyChunk}
        setSelectedDailyChunk={setSelectedDailyChunk}
      />
      {calenderType === 'month' && (
        <ScrollView
          horizontal
          contentContainerStyle={styles.monthCalendarScroll}>
          <WeekBar />

          <MonthCalendar
            monthArray={monthArray}
            selectedMonth={selectedMonth}
            reservations={reservations}
            calenderType={calenderType}
          />
        </ScrollView>
      )}
      {['week', 'day'].includes(calenderType) && (
        <WeekCalendar
          monthArray={
            calenderType === 'week'
              ? selectedWeeklyChunk
              : createDayHourChunks(selectedDailyChunk)
          }
          reservations={reservations}
          calenderType={calenderType}
        />
      )}
    </View>
  );
};

export default CalendarMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: R.unit.scale(24),
  },
  monthCalendarScroll: {
    flexGrow: 1,
    flexDirection: 'column',
    display: 'flex',
  },
});

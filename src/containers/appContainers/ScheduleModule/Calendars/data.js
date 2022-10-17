import moment from 'moment';
import {Dimensions} from 'react-native';

export const getCurrentMonth = () => moment().format('MMM');
export const getInitialMonthIndex = () => moment().format('M');
export const getCurrentYear = () => moment().format('YYYY');
export const getAllMonths = () => moment.monthsShort();
export const getAllWeekDays = () => moment.weekdaysShort();

export const columnWidth = Dimensions.get('window').width / 7;

export const createMonthHandler = (month, year) => {
  // month start and end
  const monthStart = new Date(
    moment(`${month} ${year}`, 'MMM YYYY').startOf('month').format(),
  );
  const monthEnd = new Date(moment(monthStart).endOf('month').format());

  //  month start's week start & end
  const monthWeekStartDate = moment(
    new Date(moment(monthStart).startOf('week').format()),
  );
  const monthWeekEndDate = moment(
    new Date(moment(monthEnd).endOf('week').format()),
  );

  //   -------------------------------------------------------------------
  let differencePromise = moment.duration(
    monthWeekEndDate.diff(monthWeekStartDate),
  );

  let differenceInDays = Math.floor(differencePromise.asDays());

  let completeMonth = [];
  for (let i = 0; i <= differenceInDays; i++) {
    completeMonth.push(monthWeekStartDate.format());
    monthWeekStartDate.add(1, 'days');
  }

  return completeMonth;
};

export const reservations = [
  {
    start: moment(moment().add(-3, 'hours').format()).add(0, 'days').format(),
    end: moment(moment().add(3, 'hours').format()).add(0, 'days').format(),
    type: '1-on-1',
    id: 1,
    title: 'Tennis Lesson with Jennys',
    eventDate: moment().add(0, 'days').format(),
    location: 'Green Tennis Court',
    status: 'upcoming',
  },
  {
    start: moment(moment().add(-3, 'hours').format()).add(0, 'days').format(),
    end: moment(moment().add(3, 'hours').format()).add(0, 'days').format(),
    type: '1-on-1',
    id: 1,
    title: 'Tennis Lesson with Jennys',
    eventDate: moment().add(0, 'days').format(),
    location: 'Green Tennis Court',
    status: 'upcoming',
  },
  {
    start: moment(moment().add(-3, 'hours').format()).add(0, 'days').format(),
    end: moment(moment().add(3, 'hours').format()).add(0, 'days').format(),
    type: '1-on-1',
    id: 1,
    title: 'Tennis Lesson with Kate',
    eventDate: moment().add(0, 'days').format(),
    location: 'Royal Tennis Court',
    status: 'upcoming',
  },
  {
    start: moment(moment().add(0, 'hours').format()).add(1, 'days').format(),
    end: moment(moment().add(2, 'hours').format()).add(1, 'days').format(),
    type: '1-on-1',
    id: 2,
    title: 'Tennis Lesson with Jenny',
    eventDate: moment().add(1, 'days').format(),
    location: 'Green Tennis Court',
    status: 'pending',
  },
  {
    start: moment(moment().add(-8, 'hours').format()).add(2, 'days').format(),
    end: moment(moment().add(-1, 'hours').format()).add(2, 'days').format(),
    type: '1-on-1',
    id: 2,
    title: 'Tennis Lesson with Jenny',
    eventDate: moment().add(2, 'days').format(),
    location: 'Green Tennis Court',
    status: 'past',
  },
];

export const createMonthWeekChunks = (month, year) => {
  const monthArray = createMonthHandler(month, year);
  // let [...arr] = monthArray;

  let chunksArray = [];
  // while (arr.length) {
  //   chunksArray.push(arr.splice(0, 7));
  // }

  for (let i = 0; i < monthArray.length; i += 7) {
    chunksArray.push(monthArray.slice(i, i + 7));
  }

  return chunksArray;
};

export const createDayWiseCalendar = (month, year) => {
  const monthArray = createMonthHandler(month, year);
  let dailyCalendar = [];

  for (let i = 0; i < monthArray.length; i++) {
    if (moment(monthArray[i]).format('MMM') === month) {
      dailyCalendar.push(monthArray[i]);
    }
  }

  return dailyCalendar;
};

export const createDayHourChunks = day => {
  if (!day) return [];
  let start = new Date(moment(day).startOf('day').format());
  let end = new Date(moment(day).endOf('day').format());

  let slices = [];

  while (end >= start) {
    start = new Date(start.getTime() + 60 * 60 * 1000);
    slices.push(moment(start).format());
  }
  return slices;
};

import React from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import R from '@components/utils/R';
import {navigationRef} from '@components/navigation/navigationService';
import {
  BookingsTabIcon,
  MessageTabIcon,
  NotificationTabIcon,
  ToDoTabIcon,
  UserTabIcon,
} from '@components/utils/Svg';
import Text from '@components/common/Text';
import {useSelector} from 'react-redux';

//COACH ON BOARDING
import SelectSportScreen from '@containers/appContainers/coachOnBoardingModule/selectSportScreen';
import PersonalInfoScreen from '@containers/appContainers/coachOnBoardingModule/personalInfoScreen';
import ExperienceScreen from '@containers/appContainers/coachOnBoardingModule/credentialsAndExperienceScreen';
import UploadImagesScreen from '@containers/appContainers/coachOnBoardingModule/uploadImagesScreen';
import BackgroundCheckScreen from '@containers/appContainers/coachOnBoardingModule/backgroundCheckScreen';
import SetLessonsScreen from '@containers/appContainers/coachOnBoardingModule/setLessonScreen';
import HostSessionScreen from '@containers/appContainers/coachOnBoardingModule/hostSession';
import FAQScreen from '@containers/appContainers/coachOnBoardingModule/FaqScreen';
import PaymentScreen from '@containers/appContainers/coachOnBoardingModule/PaymentScreen';
import Pricing from '@components/view/screens/onBoardingCoach/Payment/Pricing';
import AvailabilityScreen from '@containers/appContainers/coachOnBoardingModule/AvailabilityScreen';
import PreviewProfileScreen from '@containers/appContainers/coachOnBoardingModule/PreviewProfileScreen';
import ProfileScreen from '@containers/appContainers/profileModule/ProfileScreen';
import ProfileStepsScreen from '@containers/appContainers/homeModule/ProfileStepsScreen';
import ToDoScreen from '@containers/appContainers/homeModule/ToDoScreen';
import EvaluationScreen from '@containers/appContainers/homeModule/ToDoScreen/EvaluationScreen';
import UpdateEvaluationScreen from '@containers/appContainers/homeModule/ToDoScreen/UpdateEvaluationScreen';
import ScheduleScreen from '@containers/appContainers/ScheduleModule/ScheduleScreen';
import NotificationScreen from '@containers/appContainers/NotificationModule/NotificationScreen';
import ReviewsScreen from '@containers/appContainers/profileModule/ReviewsModule/ReviewsScreen';

//INBOX SCREENNS
import ChatScreen from '@containers/appContainers/InboxModule/ChatScreen';
import ChatsListScreen from '@containers/appContainers/InboxModule/ChatsListScreen';
import EditProfileScreen from '@containers/appContainers/profileModule/EditProfileSubModule';
import EditLessonScreen from '@containers/appContainers/profileModule/EditLessonSubModule';
import SettingsScreen from '@containers/appContainers/profileModule/SettingsSubModule';
import PricingInfo from '@containers/appContainers/profileModule/EditLessonSubModule/PricingInfo';
import SupportChat from '@components/view/screens/Notifications/SupportChat';
import StudentProfileScreen from '@containers/appContainers/homeModule/StudentProfileScreen';
import SeasonalStaticsScreen from '@containers/appContainers/profileModule/InsightsSubModule/SeasonalStaticsScreen';
import InsightsScreen from '@containers/appContainers/profileModule/InsightsSubModule';
import LessonDetailsScreen from '@containers/appContainers/homeModule/LessonDetailsScreen';
import ScheduleAvailabilityScreen from '@containers/appContainers/ScheduleModule/AvailabilityScreen';

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  const CoachStack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();
  const coach = useSelector(state => state.coach);

  const CustomTabBar = props => {
    return (
      <View>
        {Platform.OS === 'ios' ? (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: R.unit.height(coach?.isOnBoard ? 0.08 : 0),
              // height: R.unit.height(!coach?.isOnBoard ? 0.08 : 0),
              backgroundColor: 'transparent',
            }}>
            <BottomTabBar {...props.props} />
          </View>
        ) : (
          <View>
            <BottomTabBar {...props.props} />
          </View>
        )}
      </View>
    );
  };

  const BottomTabNavigator = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator
          initialRouteName={!coach?.isOnBoard ? 'Coach' : 'Home'}
          // initialRouteName={!coach?.isOnBoard ? 'Home' : 'Home'}
          screenOptions={{
            headerShown: false,
            tabBarVisible: true,
          }}
          tabBar={props => <CustomTabBar props={props} />}
          tabBarOptions={{
            showLabel: false,
            activeTintColor: 'white',
            inactiveTintColor: '#d9d9d9',
            paddingBottom: 0,

            style: {
              backgroundColor: R.color.white,
              height:
                Platform.OS === 'ios' ? R.unit.scale(70) : R.unit.scale(60),
              paddingVertical: R.unit.scale(0),
              alignItems: 'center',
              paddingBottom: 0,
              marginBottom: 0,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeStackNavigator}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.tab}>
                  <View style={styles.svgView}>
                    <ToDoTabIcon
                      stroke={focused ? R.color.mainColor : R.color.gray}
                      width="100%"
                      height="100%"
                    />
                  </View>
                  <Text
                    variant={'body5'}
                    font={focused ? 'InterSemiBold' : 'interRegular'}
                    gutterTop={4}
                    color={focused ? R.color.black : R.color.gray}
                    align={'center'}
                    transform={'none'}>
                    To do
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="ScheduleTab"
            component={ScheduleStackNavigator}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.tab}>
                  <View style={styles.svgView}>
                    <BookingsTabIcon
                      stroke={focused ? R.color.mainColor : R.color.gray}
                      width="100%"
                      height="100%"
                    />
                  </View>
                  <Text
                    variant={'body5'}
                    font={focused ? 'InterSemiBold' : 'interRegular'}
                    gutterTop={4}
                    color={focused ? R.color.black : R.color.gray}
                    align={'center'}
                    style={{width: '100%'}}
                    transform={'none'}>
                    Schedule
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={NotificationsStackNavigator}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.tab}>
                  <View
                    style={{
                      ...styles.svgView,
                      marginTop: 1,
                      height: R.unit.scale(29),
                    }}>
                    <NotificationTabIcon
                      stroke={focused ? R.color.mainColor : R.color.gray}
                      width="100%"
                      height="100%"
                    />
                  </View>
                  <Text
                    variant={'body5'}
                    font={focused ? 'InterSemiBold' : 'interRegular'}
                    gutterTop={3}
                    color={focused ? R.color.black : R.color.gray}
                    align={'center'}
                    transform={'none'}>
                    Notifications
                  </Text>
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Inbox"
            component={MessagesStackNavigator}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.tab}>
                  <View style={{...styles.svgView, height: R.unit.scale(29)}}>
                    <MessageTabIcon
                      stroke={focused ? R.color.mainColor : R.color.gray}
                      width="100%"
                      height="100%"
                    />
                  </View>
                  <Text
                    variant={'body5'}
                    font={focused ? 'InterSemiBold' : 'interRegular'}
                    gutterTop={4}
                    color={focused ? R.color.black : R.color.gray}
                    align={'center'}
                    transform={'none'}>
                    Inbox
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="ProfileTab"
            component={ProfileStackNavigator}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.tab}>
                  <View style={styles.svgView}>
                    <UserTabIcon
                      stroke={focused ? R.color.mainColor : R.color.gray}
                      fill={focused ? R.color.mainColor : R.color.gray}
                      width="100%"
                      height="100%"
                    />
                  </View>
                  <Text
                    variant={'body5'}
                    font={focused ? 'InterSemiBold' : 'interRegular'}
                    gutterTop={4}
                    color={focused ? R.color.black : R.color.gray}
                    align={'center'}
                    transform={'none'}>
                    Profile
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Coach"
            component={CoachOnBoardingStack}
            options={{
              tabBarButton: () => null,
              tabBarVisible: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };

  const HomeStackNavigator = props => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'ToDo'}>
        <Stack.Screen name="ToDo" component={ToDoScreen} />
        <Stack.Screen name="ProfileSteps" component={ProfileStepsScreen} />
        <Stack.Screen name="EvaluationScreen" component={EvaluationScreen} />
        <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
        <Stack.Screen name="LessonDetails" component={LessonDetailsScreen} />
        <Stack.Screen
          name="UpdateEvaluation"
          component={UpdateEvaluationScreen}
        />
      </Stack.Navigator>
    );
  };

  const ScheduleStackNavigator = props => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Schedule'}>
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen
          name="ScheduleAvailability"
          component={ScheduleAvailabilityScreen}
        />
      </Stack.Navigator>
    );
  };

  const NotificationsStackNavigator = props => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Notification'}>
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="NotificationChat" component={SupportChat} />
      </Stack.Navigator>
    );
  };

  const MessagesStackNavigator = props => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ChatsList" component={ChatsListScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    );
  };

  const ProfileStackNavigator = props => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Profile'}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: 'transparent'},
            cardStyleInterpolator: ({current: {progress}}) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
        />
        <Stack.Screen name="EditLesson" component={EditLessonScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Insights" component={InsightsScreen} />
        <Stack.Screen name="Seasonal" component={SeasonalStaticsScreen} />
        <CoachStack.Screen name="PricingInfo" component={PricingInfo} />
      </Stack.Navigator>
    );
  };

  const CoachOnBoardingStack = props => {
    return (
      <CoachStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'SelectSports'}>
        <CoachStack.Screen name="SelectSports" component={SelectSportScreen} />
        <CoachStack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        <CoachStack.Screen name="Experience" component={ExperienceScreen} />
        <CoachStack.Screen name="UploadImages" component={UploadImagesScreen} />
        <CoachStack.Screen
          name="BackgroundCheck"
          component={BackgroundCheckScreen}
        />
        <CoachStack.Screen name="SetLessons" component={SetLessonsScreen} />
        <CoachStack.Screen name="HostSession" component={HostSessionScreen} />
        <CoachStack.Screen name="FAQ" component={FAQScreen} />
        <CoachStack.Screen name="Payment" component={PaymentScreen} />
        <CoachStack.Screen name="Pricing" component={Pricing} />
        <CoachStack.Screen name="Availability" component={AvailabilityScreen} />
        <CoachStack.Screen
          name="PreviewProfile"
          component={PreviewProfileScreen}
        />
      </CoachStack.Navigator>
    );
  };

  return <BottomTabNavigator />;
};
export default AppStack;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: R.color.white,
    marginTop: R.unit.scale(5),
    height: R.unit.scale(5),
    width: R.unit.scale(5),
    borderRadius: R.unit.scale(10),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(29),
  },
  tab: {
    width: R.unit.width(0.19),
    alignItems: 'center',
  },
});

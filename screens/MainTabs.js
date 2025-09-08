import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";

import Home from "./Home";
import Topics from "./Topics";
import TopicDetails from "./TopicDetails";
import Quiz from "./Quiz";
import Questions2 from "./Questions2";
import Results from "./Results";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();
const TopicsStack = createNativeStackNavigator();
const QuizStack = createNativeStackNavigator();

function TopicsStackScreen() {
  return (
    <TopicsStack.Navigator screenOptions={{ headerShown: false }}>
      <TopicsStack.Screen name="TopicsList" component={Topics} />
      <TopicsStack.Screen name="TopicDetails" component={TopicDetails} />
    </TopicsStack.Navigator>
  );
}

function QuizStackScreen() {
  return (
    <QuizStack.Navigator screenOptions={{ headerShown: false }}>
      <QuizStack.Screen name="QuizHome" component={Quiz} />
      <QuizStack.Screen name="Questions2" component={Questions2} />
      <QuizStack.Screen name="Results" component={Results} />
    </QuizStack.Navigator>
  );
}

function TabIcon({ focused, activeIcon, inactiveIcon, label }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {focused ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#E9F7EF",
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 6,
            minWidth: 100,
          }}
        >
          <Image
            source={activeIcon}
            style={{ width: 22, height: 22, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 14,
              color: "#00A86B",
              fontWeight: "600",
            }}
          >
            {label}
          </Text>
        </View>
      ) : (
        <Image
          source={inactiveIcon}
          style={{ width: 22, height: 22, tintColor: "#999" }}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: 65,
          elevation: 5,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          paddingBottom: 8,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon={require("../assets/home-active.png")}
              inactiveIcon={require("../assets/home.png")}
              label="Home"
            />
          ),
        }}
      />

      <Tab.Screen
        name="TopicsTab"
        component={TopicsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon={require("../assets/topics-active.png")}
              inactiveIcon={require("../assets/topics.png")}
              label="Topics"
            />
          ),
        }}
      />

      <Tab.Screen
        name="QuizTab"
        component={QuizStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon={require("../assets/quiz-active.png")}
              inactiveIcon={require("../assets/quiz.png")}
              label="Quiz"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon={require("../assets/settings-active.png")}
              inactiveIcon={require("../assets/settings.png")}
              label="Settings"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ImageListScreen from "../screen/ImageListScreen";
import FavoriteImageListScreen from "../screen/FavoriteImageListScreen";
import { Ionicons } from "@expo/vector-icons"
import { Text } from "react-native";

const Tabs = createBottomTabNavigator()

const getTabBarItem = (name) => {
  if (name === "ImageList") {
    return {
      title: "홈",
      iconName: "home"
    }
  }
  if (name === "FavoriteImageList") {
    return {
      title: "즐겨찾기",
      iconName: "star"
    }
  }
}

const tabBarLabel = ({ color, route }) => {
  const tabBarTitle = getTabBarItem(route.name).title
  return <Text style={{ color, fontSize: 10 }}>{tabBarTitle}</Text>
}

const tabBarIcon = ({ focused, color, size, route }) => {
  const iconName = getTabBarItem(route.name).iconName
  return (
    <Ionicons name={iconName} size={size} color={color} />
  )
}

export default () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: (v) => tabBarLabel({...v, route}),
        tabBarIcon: (v) => tabBarIcon({...v, route})
      })}
    >
      <Tabs.Screen name="ImageList" component={ImageListScreen} />
      <Tabs.Screen name="FavoriteImageList" component={FavoriteImageListScreen} />
    </Tabs.Navigator>
  )
}
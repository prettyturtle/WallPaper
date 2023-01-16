import { useNavigation } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { Animated, Image, TouchableOpacity, useWindowDimensions } from "react-native"

export default (props) => {
  const { width } = useWindowDimensions()
  const navigation = useNavigation()
  const [animationValue, setAnimationValue] = useState(new Animated.Value(0))

  const onPressItem = useCallback(() => {
    navigation.push("ImageDetail", { url: props.url })
  }, [])

  const onPressIn = useCallback(() => {
    console.log("onPressIn")
    Animated.timing(animationValue, {
      duration: 200,
      toValue: 1
    }).start()
  }, [])
  const onPressOut = useCallback(() => {
    console.log("onPressOut")
    Animated.timing(animationValue, {
      duration: 200,
      toValue: 0
    }).start()
  }, [])

  const scale = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.95]
  })

  return (
    <TouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
      onPress={onPressItem}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10
      }}
    >
      <Animated.View
        style={{ transform: [{ scale: scale }] }}
      >
        <Image
          source={{ uri: props.url }}
          style={{
            width: width - 40,
            height: width * 1.2
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  )
}
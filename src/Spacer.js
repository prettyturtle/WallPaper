import { View } from "react-native"

export default (props) => {
  const { isHorizontal, isVertical, spacing } = props

  if (isHorizontal) {
    return (
      <View style={{ width: spacing, height: "100%" }} />
    )
  }
  if (isVertical) {
    return (
      <View style={{ width: "100%", height: spacing }} />
    )
  }

}
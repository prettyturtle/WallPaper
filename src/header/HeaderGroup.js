import { View } from "react-native"

export default (props) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      {props.children}
    </View>
  )
}
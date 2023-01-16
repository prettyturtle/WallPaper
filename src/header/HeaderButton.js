import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default (props) => {
  const { onPress, iconName } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={iconName} size={24} color="black" />
    </TouchableOpacity>
  )
}
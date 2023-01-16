import { Text } from "react-native"

export default (props) => {
  const { title } = props

  return (
    <Text style={{ fontSize: 18 }}>{title}</Text>
  )
}
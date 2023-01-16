import { FlatList, Text, View } from "react-native"
import { IMAGE_LIST } from "../constants.js"
import { Header } from "../header/Header.js"
import PhotoListItem from "../PhotoListItem"
import Spacer from "../Spacer.js"



export default (props) => {

  const renderItem = ({ item }) => {
    return (
      <PhotoListItem url={item} />
    )
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Header>
        <Header.Group>
          {/* <Header.Button onPress={() => {}} iconName="arrow-back" /> */}
          <Header.Title title="IMAGE LIST"/>
        </Header.Group>
      </Header>
      <FlatList
        data={IMAGE_LIST}
        renderItem={renderItem}
      />

    </View>
  )
}
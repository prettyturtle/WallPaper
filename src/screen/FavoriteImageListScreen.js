import { FlatList, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { Header } from "../header/Header"
import PhotoListItem from "../PhotoListItem"

export default (props) => {
  const imageList = useSelector((state) => state.favorite.favoriteList)

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
          <Header.Title title="FAVORITE"/>
        </Header.Group>
      </Header>
      <FlatList
        data={imageList}
        renderItem={renderItem}
      />

    </View>
  )
}
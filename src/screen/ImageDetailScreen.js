import { useNavigation, useRoute } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { ActivityIndicator, Button, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { Header } from "../header/Header"
import { Ionicons } from "@expo/vector-icons"
import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import { useDispatch, useSelector } from "react-redux"
import { onClickFavorite } from "../actions/favorite"

export default (props) => {
  const navigation = useNavigation()
  const route = useRoute()
  const [downloading, setDownloading] = useState(false)

  const dispatch = useDispatch()

  const onPressFavorite = useCallback(() => {
    console.log("onPressFavorite")
    dispatch(onClickFavorite(route.params.url))
  }, [])

  const onPressBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }, [])

  const onPressDownload = useCallback(async () => {
    setDownloading(true)
    const downloadResumable = FileSystem.createDownloadResumable(
      route.params.url,
      `${FileSystem.documentDirectory}${new Date().getMilliseconds()}.jpg`
    )

    try {
      const permissionResult = await MediaLibrary.getPermissionsAsync(true)
      console.log("권한 설정", permissionResult)

      if (permissionResult.status === "denied") {
        setDownloading(false)
        return
      }

      if (permissionResult.status === "undetermined") {
        const requestResult = await MediaLibrary.requestPermissionsAsync()
        console.log("요청 권한", requestResult)

        if (requestResult.status === "denied") {
          setDownloading(false)
          return
        }
      }

      const { uri } = await downloadResumable.downloadAsync()
      console.log("다운로드 완료", uri)

      const asset = await MediaLibrary.createAssetAsync(uri)
      const album = await MediaLibrary.createAlbumAsync("My First Album", asset, false)

      console.log("앨범", album)
    } catch (e) {
      
    }
    setDownloading(false)

  }, [])

  const { width } = useWindowDimensions()

  const isFavorite = useSelector((state) => {
    return state.favorite.favoriteList.filter((item) => item === route.params.url).length > 0
  })

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Button onPress={onPressBack} iconName="arrow-back" />
          <Header.Title title="IMAGE DETAIL" />
        </Header.Group>
        <Header.Button onPress={onPressFavorite} iconName={isFavorite ? "heart" : "heart-outline"} />
      </Header>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{
            uri: props.route.params.url
          }}
          style={{
            width: width - 40,
            height: width * 1.5
          }}
        />
      </View>
      <TouchableOpacity onPress={onPressDownload}>
        <View style={{ backgroundColor: "black", paddingBottom: 52 }}>
          {downloading ? (
            <View style={{height: 52, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
              <ActivityIndicator />
            </View>
          ) : (
          <View style={{ height: 52, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 18 }}>Download</Text>
            <Ionicons name="download" size={24} color="white" />
          </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Menu = () => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <Button title="Cards shuffling" onPress={() => navigate('CardsShuffling' as never)} />
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
})

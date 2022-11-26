import React from 'react'
import { Button, ScrollView, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { routes } from '@app/Navigation'

const Menu = () => {
  const { navigate } = useNavigation()

  return (
    <ScrollView>
      <View style={styles.container}>
        {routes.map((route, idx) => (
          <View style={styles.btn} key={route.name}>
            <Button title={route.name} onPress={() => navigate(route.name as never)} />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  btn: {
    marginBottom: 5,
  },
})

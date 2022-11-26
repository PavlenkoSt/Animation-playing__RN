import React from 'react'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Navigation from './Navigation'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <Navigation />
    </GestureHandlerRootView>
  )
}

export default App

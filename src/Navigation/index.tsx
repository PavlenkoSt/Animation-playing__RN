import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Menu from '@app/screens/Menu'
import CardsShuffling from '@app/screens/CardsShuffling'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="CardsShuffling" component={CardsShuffling} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Menu from '@app/screens/Menu'

import CardsShuffling from '@app/screens/CardsShuffling'
import SliderWithSteps from '@app/screens/SliderWithSteps'
import ChanelScroll from '@app/screens/ChanelScroll'

const Stack = createNativeStackNavigator()

export const routes = [
  { name: 'CardsShuffling', component: CardsShuffling },
  { name: 'SliderWithSteps', component: SliderWithSteps },
  { name: 'ChanelScroll', component: ChanelScroll },
]

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} />
        {routes.map((route) => (
          <Stack.Screen name={route.name} component={route.component} key={route.name} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

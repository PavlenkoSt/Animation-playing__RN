import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

import Card from './Card'

const cards = [
  { id: 1, path: require('@app/assets/imgs/Cards/1.jpg') },
  { id: 2, path: require('@app/assets/imgs/Cards/2.jpg') },
  { id: 3, path: require('@app/assets/imgs/Cards/3.png') },
  { id: 4, path: require('@app/assets/imgs/Cards/4.jpg') },
  { id: 5, path: require('@app/assets/imgs/Cards/5.jpg') },
]

const CardsShuffling = () => {
  const shuffleBack = useSharedValue(false)

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card key={card.id} path={card.path} index={index} shuffleBack={shuffleBack} />
      ))}
    </View>
  )
}

export default CardsShuffling

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
})

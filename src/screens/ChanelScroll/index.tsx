import React from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import ChanelItem, { MAX_HEIGHT } from './ChanelItem'

const items = [
  { img: require('@app/assets/imgs/Chanel/1.jpg'), title: 'Chanel', id: 1 },
  { img: require('@app/assets/imgs/Chanel/2.jpg'), title: 'Style', id: 2 },
  { img: require('@app/assets/imgs/Chanel/3.jpg'), title: 'Some guy', id: 3 },
  { img: require('@app/assets/imgs/Chanel/5.jpg'), title: 'Some girl', id: 5 },
  { img: require('@app/assets/imgs/Chanel/6.jpg'), title: 'Some girl again', id: 6 },
  { img: require('@app/assets/imgs/Chanel/7.jpg'), title: 'And again', id: 7 },
  { img: require('@app/assets/imgs/Chanel/8.jpg'), title: "I don't know what is it", id: 8 },
  {
    img: require('@app/assets/imgs/Chanel/9.jpg'),
    title: 'I suppose it is a some girl again',
    id: 9,
  },
]

const ChanelScroll = () => {
  const y = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll({ contentOffset }) {
      y.value = contentOffset.y
    },
  })

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{ height: (items.length + 1) * MAX_HEIGHT - 55 }}
      snapToInterval={MAX_HEIGHT}
      style={{ backgroundColor: '#000' }}
      decelerationRate={0.5}
    >
      {items.map((item, index) => (
        <ChanelItem key={item.id} img={item.img} index={index} title={item.title} y={y} />
      ))}
    </Animated.ScrollView>
  )
}

export default ChanelScroll

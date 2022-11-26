import React, { FC, useEffect } from 'react'
import { Dimensions, Image, ImageSourcePropType, StyleSheet } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { snapPoint } from 'react-native-redash'

interface IProps {
  path: ImageSourcePropType
  index: number
  shuffleBack: SharedValue<boolean>
}

const { width, height } = Dimensions.get('window')

const CARD_HEIGHT = 300
const CARD_WIDTH = 200

const SIDE_SNAP = width

console.log('SIDE_SNAP', SIDE_SNAP)
console.log('width', width)

const SNAP_POINTS = [-SIDE_SNAP, 0, SIDE_SNAP]

const getRandomRotate = () => {
  'worklet'
  return Math.random() * 20 - 10
}

const Card: FC<IProps> = ({ path, index, shuffleBack }) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(-height)

  const scale = useSharedValue(1)

  const rotate = useSharedValue(getRandomRotate())
  const rotateX = useSharedValue(30)

  useEffect(() => {
    const delay = index * 100

    translateY.value = withDelay(delay, withTiming(0))
  }, [index])

  useAnimatedReaction(
    () => shuffleBack.value,
    () => {
      if (!shuffleBack.value) return

      const delay = index * 100

      translateX.value = withDelay(
        delay,
        withSpring(0, {}, () => {
          shuffleBack.value = false
        })
      )
    }
  )

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart(_, ctx) {
      ctx.x = translateX.value
      ctx.y = translateY.value

      scale.value = withTiming(1.1)
      rotate.value = withTiming(0)
      rotateX.value = withSpring(10)
    },
    onActive({ translationX, translationY }, ctx) {
      translateX.value = translationX + ctx.x
      translateY.value = translationY + ctx.y
    },
    onFinish({ velocityX }) {
      const destination = snapPoint(translateX.value, velocityX, SNAP_POINTS)

      translateX.value = withSpring(destination)
      translateY.value = withSpring(0)

      rotate.value = withSpring(getRandomRotate())
      rotateX.value = withSpring(30)

      scale.value = withTiming(1, {}, () => {
        if (index === 0 && destination !== 0) {
          shuffleBack.value = true
        }
      })
    },
  })

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateX: `${rotateX.value}deg` },
        { perspective: 700 },
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
      ],
    }
  })

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.container, animatedCardStyle]}>
        <Image source={path} style={styles.img} />
      </Animated.View>
    </PanGestureHandler>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: height / 1.5 - CARD_HEIGHT,
    borderColor: '#333',
    borderWidth: 0.5,
  },
  img: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
})

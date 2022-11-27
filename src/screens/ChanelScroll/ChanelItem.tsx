import React, { FC } from 'react'
import { Dimensions, ImageSourcePropType, StyleSheet } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

interface IProps {
  index: number
  img: ImageSourcePropType
  title: string
  y: SharedValue<number>
}

const { width, height } = Dimensions.get('window')

const MIN_HEIGHT = 120
export const MAX_HEIGHT = height / 2

const ChanelItem: FC<IProps> = ({ img, index, title, y }) => {
  const rangeValuesForInterpolate = [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT]

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        y.value,
        rangeValuesForInterpolate,
        [MIN_HEIGHT, MAX_HEIGHT],
        Extrapolate.CLAMP
      ),
    }
  })

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(y.value, rangeValuesForInterpolate, [0, 1]),
    }
  })

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Animated.Image source={img} style={styles.img} />
      <Animated.Text style={[styles.text, textAnimatedStyle]}>{title}</Animated.Text>
    </Animated.View>
  )
}

export default ChanelItem

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  img: {
    width,
    height: '100%',
  },
  text: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 15,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ccc',
  },
})

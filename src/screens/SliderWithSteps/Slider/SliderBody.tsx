import React, { Dispatch, FC, SetStateAction } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { SharedValue } from 'react-native-reanimated'
import { ReText } from 'react-native-redash'

import { SLIDER_POINT_SIZE } from '@app/consts'

type SliderBodyPropsType = {
  disabled: boolean
  text: SharedValue<string>
  sliderWidth: number
  setSliderWidth: Dispatch<SetStateAction<number>>
  animatedStyles: {
    transform: {
      translateX: number
    }[]
  }
  isRtl: boolean
}

const SliderBody: FC<SliderBodyPropsType> = ({
  disabled,
  text,
  setSliderWidth,
  sliderWidth,
  animatedStyles,
  isRtl,
}) => {
  return (
    <View
      style={[styles.container, isRtl && styles.containerRtl]}
      onLayout={({ nativeEvent }) => setSliderWidth(nativeEvent.layout.width)}
      testID="SliderContainer"
    >
      <View style={styles.slider} testID="Slider">
        <Animated.View
          style={[
            styles.filledLine,
            {
              width: sliderWidth + sliderWidth / 2,
              left: -sliderWidth - sliderWidth / 2.1 - SLIDER_POINT_SIZE / 4,
            },
            animatedStyles,
          ]}
          testID="SliderProgressLine"
        />
      </View>
      <Animated.View
        style={[styles.point, animatedStyles, disabled && styles.pointDisable]}
        testID="SliderPoint"
      >
        <ReText
          style={[
            styles.label,
            isRtl ? { bottom: -50 } : { top: -50 },
            isRtl && styles.labelRtl,
            disabled && styles.labelDisable,
          ]}
          text={text}
          textAlign="center"
          testID="SliderPointText"
        />
      </Animated.View>
    </View>
  )
}

export default SliderBody

const styles = StyleSheet.create({
  point: {
    width: SLIDER_POINT_SIZE,
    height: SLIDER_POINT_SIZE,
    borderRadius: 50,
    position: 'relative',
    top: -SLIDER_POINT_SIZE + SLIDER_POINT_SIZE / 4,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#006dbf',
  },
  pointDisable: {
    borderColor: '#ccc',
  },
  label: {
    position: 'absolute',
    transform: [{ translateX: -SLIDER_POINT_SIZE / 6 }],
    borderWidth: 2,
    borderColor: '#006dbf',
    borderRadius: 40,
    paddingVertical: 5,
    width: 30,
    height: 42,
    left: -3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#000000',
    fontFamily: '$fontBold',
  },
  labelRtl: {
    transform: [{ rotate: '180deg' }, { translateX: SLIDER_POINT_SIZE / 6 }],
  },
  labelDisable: {
    borderColor: '#ccc',
    color: '#ccc',
  },
  slider: {
    backgroundColor: '#DDE0EC',
    height: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    paddingTop: 30,
  },
  containerRtl: {
    transform: [{ rotate: '180deg' }],
  },
  filledLine: {
    backgroundColor: '#006dbf',
    height: 10,
    position: 'relative',
  },
})

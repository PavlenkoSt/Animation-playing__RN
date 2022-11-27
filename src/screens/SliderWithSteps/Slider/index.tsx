import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import { SLIDER_POINT_SIZE } from '@app/consts'

import SliderBody from './SliderBody'

type SliderPropsType = {
  value: number
  setValue: Dispatch<SetStateAction<number>>
  disabled: boolean
  isRtl: boolean
}

const Slider: FC<SliderPropsType> = ({ value, setValue, disabled, isRtl }) => {
  const [sliderWidth, setSliderWidth] = useState(0)
  const [edited, setEdited] = useState(false)

  const points = useMemo(() => generatePoints(sliderWidth, 5), [sliderWidth])

  const translateX = useSharedValue(0)
  const text = useSharedValue('0')

  useEffect(() => {
    if (edited || !points.length) return

    translateX.value = withSpring(points[value])
    text.value = value.toString()
  }, [value, edited, points])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const gesture = Gesture.Pan()
    .onUpdate(({ x }) => {
      if (disabled) return

      runOnJS(setEdited)(true)

      if (x < 0) {
        translateX.value = 0
        runOnJS(setValue)(0)
        return
      }

      if (x > sliderWidth - SLIDER_POINT_SIZE) {
        translateX.value = sliderWidth - SLIDER_POINT_SIZE
        runOnJS(setValue)(5)
        return
      }

      translateX.value = withSpring(x)

      const closestPoint = getClosestPoint(x, points, sliderWidth)

      text.value = closestPoint.toString()

      runOnJS(setValue)(closestPoint)
    })
    .onFinalize(({ x }) => {
      if (disabled) return

      runOnJS(setEdited)(true)

      const closestPoint = getClosestPoint(x, points, sliderWidth)

      text.value = closestPoint.toString()

      translateX.value = withSpring(points[closestPoint])
      runOnJS(setValue)(closestPoint)
    })

  if (disabled) {
    return (
      <SliderBody
        sliderWidth={sliderWidth}
        setSliderWidth={setSliderWidth}
        disabled={disabled}
        text={text}
        animatedStyles={animatedStyles}
        isRtl={isRtl}
      />
    )
  }

  return (
    <GestureDetector gesture={gesture}>
      <SliderBody
        sliderWidth={sliderWidth}
        setSliderWidth={setSliderWidth}
        disabled={disabled}
        text={text}
        animatedStyles={animatedStyles}
        isRtl={isRtl}
      />
    </GestureDetector>
  )
}

export default Slider

function generatePoints(width: number, numberOfPoints: number) {
  const res: number[] = []

  const part = (width - SLIDER_POINT_SIZE) / numberOfPoints || 0

  res.push(0)

  Array(numberOfPoints)
    .fill(0)
    .forEach((item, idx) => {
      res.push(part * (idx + 1))
    })

  return res
}

function getClosestPoint(x: number, points: number[], sliderWidth: number) {
  'worklet'
  const closestToPoints = [...points].map((point) => Math.abs(point - x))

  const minClose = { point: 0, x: sliderWidth }

  closestToPoints.forEach((closePoint, idx) => {
    if (closePoint < minClose.x) {
      minClose.x = closePoint
      minClose.point = idx
    }
  })

  return minClose.point
}

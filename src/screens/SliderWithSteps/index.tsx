import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'

import Slider from './Slider'

const SliderWithSteps = () => {
  const [value, setValue] = useState(0)
  const [isRtl, setIsRtl] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.rtlSwitcher}>
        <Text>Rtl for slider</Text>
        <Switch value={isRtl} onValueChange={setIsRtl} />
      </View>
      <Slider value={value} setValue={setValue} disabled={false} isRtl={isRtl} />
    </View>
  )
}

export default SliderWithSteps

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  rtlSwitcher: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
    marginTop: -150,
  },
})

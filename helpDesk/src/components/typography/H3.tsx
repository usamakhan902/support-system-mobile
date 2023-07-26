import React from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'
import { ColorSet, Fonts, FamilySet } from '../../styles'

interface H3Props {
  style?: TextStyle | undefined
  children?: React.ReactNode
}

const H3: React.FC<H3Props> = props => {
  const { style } = props
  return <Text style={{ ...styles.label, ...style }}>{props.children}</Text>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  label: {
    color: ColorSet.black,
    ...Fonts.size.normal,
    fontFamily: FamilySet.semiboldSf,
  },
})

export default H3

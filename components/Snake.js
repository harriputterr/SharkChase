import React, { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

export default function Snake({snake = [{x, y}]}) {
  return (
    <Fragment>
        {snake.map((segment, index) => {
            const segmentStyle = {
                left: segment.x * 10,
                top: segment.y * 10,
            }
            return <View key={index} style={[styles.snake, segmentStyle]} />
        })}
    </Fragment>
  )
}

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        backgroundColor: "#333333",
        position: 'absolute',
        borderRadius: 7,
    }
})

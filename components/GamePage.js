import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PanGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import Snake from './Snake'


const SNAKE_INIT_POS = [{x: 5, y: 5}];
const FOOD_INIT_POS = [{x: 5, y: 20}];
const GAME_BOUNDS = {xMin: 0, xMAX: 35, yMin: 0, yMax:63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Direction = {
  Right: 0,
  Up: 1,
  Left: 2,
  Down: 3,
}

const GamePage = ({ navigation }) => {
  const [direction, setDirection ] = useState(Direction.Right);
  const [snake, setSnake ] = useState(SNAKE_INIT_POS);
  const [food, setFood ] = useState(FOOD_INIT_POS);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPause] = useState(false);

  useEffect(() => {
    if (!isGameOver){
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL )
      return () => clearInterval(intervalId);
    }
  }, [snake,isGameOver, isPaused]);
  
  const finalScore = 123; // Placeholder score value

  const handleGesture = (event) => {

    const {translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)){
      if (translationX > 0 ){
        // We are moving right. 
        setDirection(Direction.Right);

      } else{
        // We are moving left.
        setDirection(Direction.Left);
      }
    }
    else{
      if (translationY > 0){
        // We are moving Down.
          setDirection(Direction.Down)
      }
      else{
        // We are moving up.
        setDirection(Direction.Up);
      }
    }
  }

  const handlePausePress = () => {
    // Pause button logic
    console.log('Pause button pressed');
  };

  const handleEndGame = () => {
    // Navigate to the EndPage with the final score when the game ends
    navigation.navigate('End', { score: finalScore });
  };

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = {...snakeHead};

    switch (direction) {
      case Direction.Up:
        newHead.y--;
        break;
      case Direction.Down:
        newHead.y++;
        break;
      case Direction.Left:
        newHead.x--;
        break;
      case Direction.Right:
        newHead.x++;
        break;
      default:
        break;
    }

    setSnake([newHead, ...snake.slice(0, -1)]);
  }
  // Add logic to call handleEndGame() when the game is over

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
      <Text style={styles.score}>Score: 0</Text>
      <SafeAreaView style={[styles.gameArea, styles.boundaries]} >
        <Snake snake={snake} />
      </SafeAreaView>
      <TouchableOpacity style={styles.pauseButton} onPress={handlePausePress}>
        <Ionicons name="pause" size={32} color="black" />
      </TouchableOpacity>
      {/* Temporary button to simulate game end */}
      <TouchableOpacity onPress={handleEndGame}>
        <Text>End Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50, 
    paddingBottom: 50, 
  },
  score: {
    fontSize: 24,
    position: 'absolute',
    top: 10,
  },
  gameArea: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    height: '60%',
    marginTop: '20%',
    marginBottom: '20%',
  },
  pauseButton: {
    position: 'absolute',
    bottom: 10,
  },
  boundaries: {
    flex: 1,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#ffffff",
  }
});

export default GamePage;

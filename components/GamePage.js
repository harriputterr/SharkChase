import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Snake from './Snake';
import Food from './Food';
import { checkEatsFood } from '../utils/checkEatsFood';
import { randFoodPos } from '../utils/randFoodPos';

const SNAKE_INIT_POS = [{ x: 5, y: 5 }];
const FOOD_INIT_POS = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 32, yMin: 0, yMax: 49 };
const MOVE_INTERVAL = 100;
const SCORE_INCREMENT = 10;

const Direction = {
  Right: 0,
  Up: 1,
  Left: 2,
  Down: 3,
};

const GamePage = ({ navigation }) => {
  const [direction, setDirection] = useState(Direction.Right);
  const [snake, setSnake] = useState(SNAKE_INIT_POS);
  const [food, setFood] = useState(FOOD_INIT_POS);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);

  const handleGesture = (event) => {
    // Handle gestures to change the snake's direction
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        // We are moving right.
        setDirection(Direction.Right);
      } else {
        // We are moving left.
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        // We are moving Down.
        setDirection(Direction.Down);
      } else {
        // We are moving up.
        setDirection(Direction.Up);
      }
    }
  };

  const handlePausePress = () => {
    setIsPaused(!isPaused);
  };

  const handleEndGame = () => {
    setIsGameOver(true);
    // Navigate to the EndPage with the final score when the game ends
    navigation.navigate('End', { score });
    handleRestartGame();
  };

  const handleRestartGame = () => {
    setDirection(Direction.Right);
    setSnake(SNAKE_INIT_POS);
    setFood(FOOD_INIT_POS);
    setScore(0);
  }

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead };

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
    
    // Check for collisions with boundaries
    if (
      newHead.x < GAME_BOUNDS.xMin ||
      newHead.x >= GAME_BOUNDS.xMax ||
      newHead.y < GAME_BOUNDS.yMin ||
      newHead.y >= GAME_BOUNDS.yMax
    ) {
      handleEndGame();
      return;
    }

    if (checkEatsFood(newHead, food, 2)){
      setFood(randFoodPos(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    }
    else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.score}>Score: {score}</Text>
        <SafeAreaView style={[styles.gameArea, styles.boundaries]}>
          <Snake snake={snake} />
          <Food position={food} />
        </SafeAreaView>
        <TouchableOpacity style={styles.pauseButton} onPress={handlePausePress}>
          {isPaused ? 
          <Ionicons name="play" size={32} color="black" onPress={handlePausePress}/> : 
          <Ionicons name="pause" size={32} color="black" onPress={handlePausePress}/>}
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
    borderWidth: 5,
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
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: '#ffffff',
  },
  endOrRestart: {
    position: 'relative',
    bottom: 25,
    fontSize: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 20
    
  }
});

export default GamePage;

import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [targetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [count, setCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);

  // Tarkistetaan arvaus ja päivitetään palaute.
  const makeGuess = () => {
    if (gameOver) {
      return;
    }

    const num = parseInt(guess, 10);
    if (isNaN(num)) {
      return;
    }

    const nextCount = count + 1;
    setCount(nextCount);
    setGuess('');

    if (num < targetNumber) {
      setFeedback(`Your guess ${num} is too low`);
    } else if (num > targetNumber) {
      setFeedback(`Your guess ${num} is too high`);
    } else {
      setFeedback(`You guessed the number in ${nextCount} guesses`);
      setGameOver(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess a number between 1-100</Text>
      <Text style={styles.feedback}>{feedback}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={guess}
        onChangeText={setGuess}
        editable={!gameOver}
      />

      <Button
        title="Make guess"
        onPress={makeGuess}
        disabled={gameOver}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  feedback: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    width: 200,
    padding: 8,
    marginBottom: 15,
    textAlign: 'center',
  },
});

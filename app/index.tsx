import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated } from 'react-native';

const fortunes = [
  { result: '大吉！', message: '素晴らしい1日になるでしょう！', color: '#FF4D4D' },
  { result: '中吉', message: '良いことがありそうです。', color: '#4DA6FF' },
  { result: '小吉', message: '穏やかな1日になりそうです。', color: '#4DFF88' },
  { result: '末吉', message: '慎重に行動しましょう。', color: '#FFB74D' },
  { result: '凶', message: '今日は静かに過ごすことをお勧めします。', color: '#9E9E9E' }
];

export default function FortuneScreen() {
  const [question, setQuestion] = useState('');
  const [fortune, setFortune] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const shakeBall = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      const randomIndex = Math.floor(Math.random() * fortunes.length);
      setFortune(fortunes[randomIndex]);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 1500);
  };

  const getFortune = () => {
    if (!question.trim()) {
      alert('質問を入力してください！');
      return;
    }
    fadeAnim.setValue(0);
    setFortune(null);
    shakeBall();
  };

  return (
    <View style={styles.container}>
      <View style={styles.ballContainer}>
        <View style={[styles.ball, isShaking && styles.shake]}>
          <Text style={styles.ballText}>🔮</Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        value={question}
        onChangeText={setQuestion}
        placeholder="運勢を占いたいことを入力してください..."
        placeholderTextColor="#666"
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={getFortune}
        disabled={isShaking}
      >
        <Text style={styles.buttonText}>占う</Text>
      </TouchableOpacity>

      {fortune && (
        <Animated.View style={[styles.resultContainer, { opacity: fadeAnim }]}>
          <Text style={[styles.fortuneResult, { color: fortune.color }]}>
            {fortune.result}
          </Text>
          <Text style={styles.fortuneMessage}>{fortune.message}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  ballContainer: {
    marginVertical: 30,
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6B4DE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballText: {
    fontSize: 50,
  },
  shake: {
    transform: [{ rotate: '10deg' }],
    animationName: 'shake',
    animationDuration: '0.5s',
    animationIterationCount: 'infinite',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6B4DE6',
    padding: 15,
    borderRadius: 10,
    width: '50%',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  fortuneResult: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fortuneMessage: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
}); 
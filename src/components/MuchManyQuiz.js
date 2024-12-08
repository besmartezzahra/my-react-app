import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const quizQuestions = [
  {
    id: 1,
    question: "We need _____ cement for this foundation.",
    options: ["much", "many"],
    correct: "much",
    explanation: "Use 'much' with uncountable nouns like cement."
  },
  {
    id: 2,
    question: "How _____ bricks do we need for the wall?",
    options: ["much", "many"],
    correct: "many",
    explanation: "Use 'many' with countable nouns like bricks."
  },
  {
    id: 3,
    question: "There is _____ sand in the mixer.",
    options: ["too much", "too many"],
    correct: "too much",
    explanation: "Use 'too much' with uncountable nouns like sand."
  },
  {
    id: 4,
    question: "We have _____ workers on site today.",
    options: ["too much", "too many"],
    correct: "too many",
    explanation: "Use 'too many' with countable nouns like workers."
  },
  {
    id: 5,
    question: "How _____ concrete do we need?",
    options: ["much", "many"],
    correct: "much",
    explanation: "Use 'much' with uncountable nouns like concrete."
  }
];

const MuchManyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (selectedAnswer) => {
    const correct = selectedAnswer === quizQuestions[currentQuestion].correct;
    
    if (correct) {
      setIsAnswerCorrect(true);
      setShowExplanation(true);
      if (attempts === 0) setScore(score + 1);
      
      // Wait for 2 seconds before moving to next question
      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setShowExplanation(false);
          setIsAnswerCorrect(false);
          setAttempts(0);
        } else {
          setQuizCompleted(true);
        }
      }, 2000);
    } else {
      setIsAnswerCorrect(false);
      setShowExplanation(true);
      setAttempts(attempts + 1);
      
      // If second attempt, move to next question after showing explanation
      if (attempts === 1) {
        setTimeout(() => {
          if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowExplanation(false);
            setAttempts(0);
          } else {
            setQuizCompleted(true);
          }
        }, 2000);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setIsAnswerCorrect(false);
    setAttempts(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <Card className="text-center">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="mb-4">Your score: {score} out of {quizQuestions.length}</p>
          <Button onClick={restartQuiz}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        Question {currentQuestion + 1} of {quizQuestions.length}
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">{currentQ.question}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showExplanation}
                variant={
                  showExplanation
                    ? option === currentQ.correct
                      ? "default"
                      : "secondary"
                    : "outline"
                }
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {showExplanation && (
        <Alert variant={isAnswerCorrect ? "default" : "destructive"}>
          <AlertDescription>
            {isAnswerCorrect ? "Correct! " : "Incorrect. "}
            {currentQ.explanation}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default MuchManyQuiz;

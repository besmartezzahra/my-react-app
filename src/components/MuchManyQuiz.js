import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

const MuchManyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const questions = [
    {
      question: "There are _____ workers on the construction site today.",
      options: ["too much", "too many", "not enough", "enough"],
      correct: 1,
      hint: "Workers are countable, so use 'many'.",
      explanation: "When discussing a countable noun (like workers), use 'too many' for excess and 'not enough' for insufficient amounts."
    },
    {
      question: "We have _____ concrete to finish the foundation.",
      options: ["too many", "not enough", "too much", "many"],
      correct: 1, 
      hint: "Concrete is an uncountable noun.",
      explanation: "Concrete is an uncountable noun, so we use 'not enough' to indicate an insufficient quantity."
    },
    {
      question: "The project manager said there is _____ time to complete the building by June.",
      options: ["not enough", "too much", "too many", "enough"],
      correct: 0,
      hint: "Time is uncountable.",
      explanation: "Time is an uncountable noun, so we use 'not enough' to express an insufficient amount of time."
    },
    {
      question: "We ordered _____ tiles for the bathroom floors.",
      options:  ["much", "too much", "not enough", "too many"],
      correct: 3,
      hint: "Tiles are countable.",
      explanation: "When there is an excess of a countable noun (like tiles), use 'too many'."
    },
    {
      question: "I think we're using _____ lumber for this stage of the house construction.",
      options: ["too many", "not enough", "enough", "too much"],  
      correct: 3,
      hint: "Lumber refers to the material, not individual pieces.",
      explanation: "Lumber is an uncountable noun referring to wood as a material. Use 'too much' for an excessive amount."
    },
    {
      question: "The foreman says there are _____ safety violations on the worksite this month.",
      options: ["too much", "not enough", "many", "too many"],
      correct: 3, 
      hint: "Violations can be counted individually.",
      explanation: "Violations are countable, so use 'too many' to indicate an excessive number of safety issues."
    },
    {
      question: "We don't have _____ scaffolding to reach the top of the building safely.",
      options: ["many", "too many", "enough", "too much"],
      correct: 2,
      hint: "Scaffolding is uncountable.",
      explanation: "Scaffolding is an uncountable noun. Use 'enough' after a negative statement to express an insufficient amount."
    }, 
    {
      question: "There are _____ construction delays this month due to the bad weather.",
      options: ["too much", "not enough", "too many", "much"],
      correct: 2,
      hint: "Delays are countable incidents.",
      explanation: "Delays are countable, so use 'too many' to indicate an excessive number."
    },
    {
      question: "The engineer said there is _____ load-bearing capacity in this wall design.",
      options: ["not enough", "too many", "many", "too much"],
      correct: 0,
      hint: "Capacity is a measure, not countable.",
      explanation: "Load-bearing capacity is an uncountable measure. Use 'not enough' to express an insufficiency."
    },
    {
      question: "We have _____ hard hats for everyone on the crew.",
      options: ["much", "too much", "too many", "not enough"],
      correct: 3,
      hint: "Hard hats are countable.",
      explanation: "Hard hats are countable, so use 'not enough' to indicate an insufficient number of them."
    }
  ];

  const handleAnswer = (index) => {
    setAttempts(attempts + 1);
    setSelectedAnswer(index);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowHint(false);
    setSelectedAnswer(null);
    setAttempts(0);
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="font-medium text-2xl tracking-tight">
              Too Much/Many vs Not Enough Quiz
            </span>
          </CardTitle>
          <CardDescription>
            Select the correct phrase to complete each sentence about construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showScore ? (
            <div className="text-center space-y-4">
              <p className="text-4xl font-medium">
                You scored {score} out of {questions.length}
              </p>
              <Button
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowScore(false);
                }}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Try Again
              </Button>
              <div className="mt-4 space-y-4">
                {questions.map((q, index) => (
                  <div key={index} className="flex justify-between">
                    <p>{q.question}</p>
                    <p>{q.options[q.correct]}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xl font-medium">{questions[currentQuestion].question}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`h-auto p-4 text-left transition-colors ${
                      selectedAnswer === index
                        ? selectedAnswer === questions[currentQuestion].correct
                          ? 'bg-green-100 hover:bg-green-200 text-green-800'
                          : 'bg-red-100 hover:bg-red-200 text-red-800'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {selectedAnswer !== null &&
                selectedAnswer !== questions[currentQuestion].correct && (
                  <div className="flex items-center justify-between">
                    <div>
                      <Button
                        onClick={() => setShowHint(true)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800"
                      >
                        Show Hint
                      </Button>
                      {showHint && (
                        <Alert className="mt-2 bg-blue-50 text-blue-600">
                          <AlertDescription>
                            {questions[currentQuestion].hint}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Attempt {attempts} of 2
                    </p>
                  </div>
                )}
              {(selectedAnswer === questions[currentQuestion].correct ||
                attempts === 2) && (
                <div>
                  <Alert
                    className={`${
                      selectedAnswer === questions[currentQuestion].correct
                        ? 'bg-green-50 text-green-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    <AlertDescription>
                      {questions[currentQuestion].explanation}
                    </AlertDescription>
                  </Alert>
                  <Button
                    onClick={handleNextQuestion}
                    className="mt-4 bg-blue-500 hover:bg-blue-600"
                  >
                    {currentQuestion === questions.length - 1
                      ? 'Finish'
                      : 'Next Question'}
                  </Button>
                </div>
              )}
              <div className="text-center text-sm">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MuchManyQuiz;

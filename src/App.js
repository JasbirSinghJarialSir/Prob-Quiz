import React, { useState, useEffect } from "react";

const allQuestions = [
  { q: "A coin is tossed twice. What is the probability of getting two heads?", options: ["1/4", "1/2", "1/3", "3/4"], answer: "1/4" },
  { q: "A die is thrown once. What is the probability of getting a number greater than 4?", options: ["1/6", "1/2", "1/3", "2/3"], answer: "1/3" },
  { q: "A bag contains 5 red and 3 white balls. One ball is drawn at random. Probability of getting red?", options: ["3/8", "5/8", "1/2", "2/3"], answer: "5/8" },
  { q: "If two dice are thrown, what is the probability of getting a sum of 7?", options: ["1/12", "1/6", "1/8", "1/9"], answer: "1/6" },
  { q: "A card is drawn from a deck of 52. Probability of drawing a heart?", options: ["1/13", "1/4", "1/2", "1/26"], answer: "1/4" },
  { q: "What is the probability of getting a tail when a coin is tossed?", options: ["1/4", "1/2", "3/4", "1"], answer: "1/2" },
  { q: "A die is rolled. Probability of getting an even number?", options: ["1/2", "1/3", "2/3", "5/6"], answer: "1/2" },
  { q: "Two coins are tossed. Probability of getting exactly one head?", options: ["1/4", "1/2", "3/4", "2/3"], answer: "1/2" },
  { q: "Probability of drawing an ace from a standard deck of 52 cards?", options: ["1/52", "1/26", "1/13", "1/4"], answer: "1/13" },
  { q: "A bag contains 4 black and 6 red balls. One ball is drawn. Probability of black?", options: ["2/5", "3/5", "1/2", "4/10"], answer: "2/5" },
  { q: "Two dice are thrown. Probability of getting double six?", options: ["1/36", "1/18", "1/12", "1/6"], answer: "1/36" },
  { q: "Probability of getting a prime number on a single die roll?", options: ["1/2", "1/3", "1/6", "2/3"], answer: "1/2" },
  { q: "A card is drawn. Probability of drawing a king?", options: ["1/26", "1/13", "1/52", "1/4"], answer: "1/13" },
  { q: "A coin is tossed 3 times. Probability of getting exactly 2 heads?", options: ["3/8", "1/2", "1/4", "5/8"], answer: "3/8" },
  { q: "A bag has 7 red and 3 white balls. One is drawn. Probability of white?", options: ["3/7", "3/10", "1/2", "7/10"], answer: "3/10" },
  { q: "Two cards are drawn from a deck without replacement. Probability both are aces?", options: ["1/221", "1/169", "1/52", "1/132"], answer: "1/221" },
  { q: "A die is rolled twice. Probability of getting a 4 at least once?", options: ["11/36", "1/6", "25/36", "5/36"], answer: "11/36" },
  { q: "Probability of getting a red card from a deck of 52?", options: ["1/2", "1/4", "1/3", "2/3"], answer: "1/2" },
  { q: "Two coins are tossed. Probability of getting no heads?", options: ["1/2", "1/4", "3/4", "1/3"], answer: "1/4" },
  { q: "A card is drawn. Probability of not drawing a face card (J, Q, K)?", options: ["9/13", "10/13", "11/13", "12/13"], answer: "10/13" },
];

function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

const questions = shuffleArray(allQuestions).map((q) => ({
  ...q,
  options: shuffleArray(q.options),
}));

export default function ProbabilityQuizGame() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes = 1800 seconds
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !finished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setFinished(true);
    }
  }, [timeLeft, finished]);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <h1 className="text-2xl font-bold">Quiz Finished 🎉</h1>
        <p className="mt-4 text-lg">Your Score: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-xl font-bold mb-4">Probability Quiz Game 🎲</h1>
      <p className="mb-2">Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <p className="text-lg mb-4">Q{current + 1}: {questions[current].q}</p>
        <div className="grid grid-cols-2 gap-4">
          {questions[current].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="bg-blue-500 text-white rounded-xl p-3 hover:bg-blue-700"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

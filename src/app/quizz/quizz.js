

// src/components/Quiz/Quiz.js
import React, { useState } from 'react';
import intrebariGeografie from './quizz/quizgeogra/questions';
import intrebariIstorie from './quizz/quizisto/questions';
import intrebarimatematica from './quizz/quizmath/questions';




const Quiz = () => {
    const [selectedCategory, setSelectedCategory] = useState('quizgeogra'); // Categorie selectată
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);    // Indexul întrebării curente
    const [score, setScore] = useState(0);                                   // Punctajul utilizatorului

    // Obiectul care leagă categoriile de întrebări
    const categories = {
        quizgeogra: intrebariGeografie,
        quizisto: intrebariIstorie,
        quizmath: intrebarimatematica,
    };

    const questions = categories[selectedCategory]; // Întrebările corespunzătoare categoriei selectate

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1); // Crește punctajul dacă răspunsul este corect
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Trecerea la următoarea întrebare
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0); // Resetează indexul întrebării
        setScore(0); // Resetează scorul
    };

    // Verifică dacă utilizatorul a terminat quizul
    if (currentQuestionIndex >= questions.length) {
        return (
            <div>
                <h2>Quiz terminat!</h2>
                <p>Punctaj final: {score} din {questions.length}</p>
                <button onClick={resetQuiz}>Reîncepe</button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex]; // Întrebarea curentă

    return (
        <div>
            <h1>{selectedCategory} Quiz</h1>
            <h2>{currentQuestion.question}</h2>
            <ul>
                {currentQuestion.answers.map((answer, index) => (
                    <li key={index}>
                        <button
                            onClick={() => handleAnswer(answer === currentQuestion.correctAnswer)} // Verifică dacă răspunsul selectat este corect
                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
            <p>Punctaj: {score}</p>
        </div>
    );
};

export default Quiz;

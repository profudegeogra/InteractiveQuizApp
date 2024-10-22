import React, { useState } from 'react';

const QuizApp = () => {
    // 1. Stare pentru întrebări
    const [questions, setQuestions] = useState([]); 

    // 2. Stare pentru punctaj
    const [score, setScore] = useState(0);

    // 3. Stare pentru întrebarea nouă adăugată de utilizator
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        answers: ['', '', '', ''],
        correctAnswer: ''
    });

    // Funcție pentru adăugarea unei întrebări noi
    const addQuestion = () => {
        setQuestions([...questions, newQuestion]); // Adaugă întrebarea nouă în lista de întrebări
        setNewQuestion({ question: '', answers: ['', '', '', ''], correctAnswer: '' }); // Resetează starea pentru a adăuga o altă întrebare
    };

    // Funcție pentru actualizarea punctajului pe baza răspunsului corect
    const updateScore = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1); // Adaugă punctajul dacă răspunsul este corect
        }
    };

    return (
        <div>
            <h1>Quiz App</h1>

            {/* Formular pentru adăugarea unei întrebări noi */}
            <form onSubmit={(e) => {
                e.preventDefault();
                addQuestion();
            }}>
                <input
                    type="text"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    placeholder="Întrebare"
                    required
                />
                {newQuestion.answers.map((answer, index) => (
                    <input
                        key={index}
                        type="text"
                        value={answer}
                        onChange={(e) => {
                            const updatedAnswers = [...newQuestion.answers];
                            updatedAnswers[index] = e.target.value;
                            setNewQuestion({ ...newQuestion, answers: updatedAnswers });
                        }}
                        placeholder={`Răspuns ${index + 1}`}
                        required
                    />
                ))}
                <input
                    type="text"
                    value={newQuestion.correctAnswer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                    placeholder="Răspuns corect"
                    required
                />
                <button type="submit">Adaugă Întrebarea</button>
            </form>

            {/* Afișarea punctajului */}
            <h2>Punctaj: {score}</h2>

            {/* Listarea întrebărilor */}
            <ul>
                {questions.map((q, index) => (
                    <li key={index}>{q.question}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuizApp;

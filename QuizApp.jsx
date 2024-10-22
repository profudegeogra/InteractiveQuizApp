import React, { useState, useEffect } from 'react';

const QuizApp = () => {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [newQuestion, setNewQuestion] = useState({ question: '', answers: ['', '', '', ''], correctAnswer: '' });

    // Încărcarea întrebărilor dintr-un fișier JSON sau API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('/api/questions');
                const data = await response.json();
                console.log('Fetched questions:', data); // Adaugă acest console.log
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    // Salvarea întrebărilor în localStorage
    useEffect(() => {
        localStorage.setItem('questions', JSON.stringify(questions));
    }, [questions]);

    // Încărcarea întrebărilor din localStorage
    useEffect(() => {
        const savedQuestions = localStorage.getItem('questions');
        if (savedQuestions) {
            setQuestions(JSON.parse(savedQuestions));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        addQuestion(newQuestion);
        setNewQuestion({ question: '', answers: ['', '', '', ''], correctAnswer: '' });
    };

    return (
        <div>
            <h1>Quiz App</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Adaugă Întrebare</button>
            </form>
            <h2>Punctaj: {score}</h2>
            {/* Aici este locul unde pui codul pentru a lista întrebările */}
            <ul>
                {Array.isArray(questions) && questions.length > 0 ? (
                    questions.map((q, index) => (
                        <li key={index}>{q.question}</li>
                    ))
                ) : (
                    <li>Nu există întrebări disponibile.</li>
                )}
            </ul>
        </div>
    );
};

export default QuizApp;

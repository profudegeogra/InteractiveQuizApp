"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import matematica from './matematica.module.css'; // Stiluri specifice pentru Matematica

// Definirea tipurilor
interface Question {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: string;
}

interface Category {
    name: string;
    quizzes: {
        questions: Question[];
    }[];
}

const MatematicaQuiz = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState<boolean>(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch('/questions.json'); 
            const data = await response.json();
            const mathQuestions: Question[] = data.categories.find((category: Category) => category.name === "Matematica").quizzes[0].questions;
            setQuestions(mathQuestions);
        };

        fetchQuestions();
    }, []);

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(score + 1);
            setFeedback('Corect!');
        } else {
            setFeedback('Fals!');
        }
        setShowFeedback(true);

        setTimeout(() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
            setShowFeedback(false);
        }, 2000);
    };

    // Dacă toate întrebările au fost completate
    if (currentQuestionIndex >= questions.length) {
        return (
            <div className={matematica.container}>
                <h2>Ai terminat quiz-ul!</h2>
                <p>Punctaj final: {score} din {questions.length}</p>
                <Link href="/categories" className={matematica.li} style={{ display: 'flex', alignItems: 'center', width: '140px' }}>
                    <span>&larr;</span>
                    <span style={{ marginLeft: '15px' }}>Înapoi la Categorii</span>
                </Link>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h2>{currentQuestion.question}</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {currentQuestion.answers.map((answer, index) => (
                    <li key={index}>
                        <button
                            onClick={() => setSelectedAnswer(answer)}
                            style={{
                                backgroundColor: selectedAnswer === answer ? '#0070f3' : '#ccc',
                                color: 'white',
                                padding: '10px 20px',
                                margin: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => handleAnswer(selectedAnswer === currentQuestion.correctAnswer)}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
                disabled={!selectedAnswer}
            >
                Verifică Răspunsul
            </button>

            {showFeedback && (
                <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{feedback}</p>
            )}

            <p>Punctaj: {score}</p>
            <Link href="/categories" className={matematica.li} style={{ display: 'flex', alignItems: 'center', width: '140px' }}>
                <span>&larr;</span>
                <span style={{ marginLeft: '15px' }}>Înapoi la Categorii</span>
            </Link>
        </div>
    );
};

export default MatematicaQuiz;

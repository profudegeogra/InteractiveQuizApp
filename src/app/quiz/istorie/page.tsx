"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import istorie from './istorie.module.css';

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

const IstorieQuiz = () => {
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
            const historyQuestions: Question[] = data.categories.find((category: Category) => category.name === "Istorie").quizzes[0].questions;
            setQuestions(historyQuestions);
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

    if (currentQuestionIndex >= questions.length) {
        return (
            <div className={istorie.container}>
                <h2>Ai terminat quiz-ul!</h2>
                <p>Punctaj final: {score} din {questions.length}</p>
                <Link href="/categories" className={istorie.li}>
                    <span>&larr;</span>
                    <span>Înapoi la Categorii</span>
                </Link>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h2>{currentQuestion.question}</h2>
            <ul>
                {currentQuestion.answers.map((answer, index) => (
                    <li key={index}>
                        <button
                            onClick={() => setSelectedAnswer(answer)}
                            style={{
                                backgroundColor: selectedAnswer === answer ? '#0070f3' : '#ccc',
                            }}
                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => handleAnswer(selectedAnswer === currentQuestion.correctAnswer)}
                disabled={!selectedAnswer}
            >
                Verifică Răspunsul
            </button>

            {showFeedback && <p>{feedback}</p>}

            <p>Punctaj: {score}</p>
            <Link href="/categories" className={istorie.li}>
                <span>&larr;</span>
                <span>Înapoi la Categorii</span>
            </Link>
        </div>
    );
};

export default IstorieQuiz;

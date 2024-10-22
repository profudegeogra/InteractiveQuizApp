"use client"; // Asigură-te că aceasta este prima linie a fișierului

import React, { useEffect, useState } from 'react';

const QuestionsComponent = ({ category }) => {
    const [questions, setQuestions] = useState([]); // Inițializare cu un array gol
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/questions?category=${category}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("Data primită:", data); // Afișează datele primite pentru debug

                // Verific dacă data.categories este definit și nu prezinta elemente care sa fie goale
                if (data.categories && data.categories.length > 0) {
                    const geoCategory = data.categories.find((cat) => cat.name === "Geografie");
                    if (geoCategory) {
                        const geoQuestions = geoCategory.quizzes[0].questions; // Accesăm întrebările pentru Geografie
                        setQuestions(geoQuestions);
                    } else {
                        console.error("Categoria 'Geografie' nu a fost găsită.");
                        setQuestions([]); // Resetăm întrebările dacă categoria nu a fost găsită
                    }
                } else {
                    console.error("Categorie indisponibilă sau structura de date invalidă.");
                    setQuestions([]); // Resetăm întrebările dacă datele sunt invalide
                }
            } catch (error) {
                console.error('Error:', error);
                setQuestions([]); // Resetăm întrebările în caz de eroare
            }
        };

        fetchData();
    }, [category]);

    return (
        <div>
            <h1>Întrebări pentru categoria: {category}</h1>
            <ul>
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        <li key={index}>{question.question}</li> // Presupunând că `question` are o proprietate `question`
                    ))
                ) : (
                    <li>Nu sunt întrebări disponibile.</li>
                )}
            </ul>
        </div>
    );
};

export default QuestionsComponent;

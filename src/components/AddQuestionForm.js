import React, { useState } from 'react';
import styles from './AddQuestionForm.module.css'; // Importă fișierul CSS

const AddQuestionForm = () => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']); 
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [category, setCategory] = useState('Matematica'); // Default category

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newQuestion = {
            question,
            answers,
            correctAnswer,
            category // Include category when sending data
        };

        try {
            const response = await fetch('/api/add-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newQuestion)
            });

            if (response.ok) {
                alert('Întrebarea a fost adăugată cu succes!');
                setQuestion('');
                setAnswers(['', '', '', '']);
                setCorrectAnswer('');
            } else {
                alert('A apărut o eroare la adăugarea întrebării.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('A apărut o eroare la adăugarea întrebării.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}> {/* Aplică stilul container */}
            <div>
                <label className={styles.label}>Întrebare:</label>
                <input 
                    type="text" 
                    className={styles.input} 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label className={styles.label}>Variante de răspuns:</label>
                {answers.map((answer, index) => (
                    <div key={index}>
                        <input 
                            type="text" 
                            className={styles.input} 
                            value={answer} 
                            onChange={(e) => handleAnswerChange(index, e.target.value)} 
                            required 
                        />
                    </div>
                ))}
            </div>
            <div>
                <label className={styles.label}>Răspuns corect:</label>
                <input 
                    type="text" 
                    className={styles.input} 
                    value={correctAnswer} 
                    onChange={(e) => setCorrectAnswer(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label className={styles.label}>Categorie:</label>
                <select 
                    className={styles.select} 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="Matematica">Matematica</option>
                    <option value="Geografie">Geografie</option>
                    <option value="Istorie">Istorie</option>
                </select>
            </div>
            <button type="submit" className={styles.button}>Adaugă Întrebarea</button>
        </form>
    );
};

export default AddQuestionForm;

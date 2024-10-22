import React from 'react';
import QuizApp from '../../src/components/QuizApps';


 // Importă componenta ta din components

const QuizPage = () => {
    return (
        <div>
            <h1>Pagina de Quiz</h1>
             {<QuizApp />}
        </div>
    );
};

export default QuizPage;

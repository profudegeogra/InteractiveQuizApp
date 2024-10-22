import Question from './Question';

class Quiz {
    constructor(title, questions = []) {
        this.title = title; // Titlul quiz-ului
        this.questions = questions; // O colecție de întrebări
    }

    addQuestion(question) {
        this.questions.push(question); // Adaugă o întrebare în quiz
    }
}

export default Quiz;

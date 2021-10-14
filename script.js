import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, query} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAcEpT8fyZ5hXYsqb_84eyuvIL0jZ8_tok",
    authDomain: "proyectopruerba.firebaseapp.com",
    projectId: "proyectopruerba",
    storageBucket: "proyectopruerba.appspot.com",
    messagingSenderId: "869722073066",
    appId: "1:869722073066:web:a8bb5eafb8ba686419b493"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const correctAnswersArray = [] 

const getQuestions = async () => {
    const respond = await fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple');
    const data = await respond.json();
    const questions = data.results.map(({question, correct_answer, incorrect_answers}) => {
        return {
            question: question,
            correctAnswer: correct_answer.toLowerCase(),
            Answers: shuffleArray([...incorrect_answers, correct_answer])
        }
    })
    const questionsTemplate = questions.map(({question, Answers, correctAnswer}, index) => {
        correctAnswersArray.push(correctAnswer)
        return `
        <article id='questionContainer'>
            <h2>${question}</h2>
            <div id='answerContainer'>
                <div>
                    <label for='question-${index+1}-1'>${Answers[0]}</label>
                    <input type='radio' id='question-${index+1}' name='question-${index+1}' value='${Answers[0].toLowerCase()}'>
                </div>
                <div>
                    <label for='question-${index+1}-2'>${Answers[1]}</label>
                    <input type='radio' id='question-${index+1}-2' name='question-${index+1}' value='${Answers[1].toLowerCase()}'>
                </div>
                <div>
                    <label for='question-${index+1}-3'>${Answers[2]}</label>
                    <input type='radio' id='question-${index+1}-3' name='question-${index+1}' value='${Answers[2].toLowerCase()}'>
                </div>
                <div>
                    <label for='question-${index+1}-4'>${Answers[3]}</label>
                    <input type='radio' id='question-${index+1}-4' name='question-${index+1}' value='${Answers[3].toLowerCase()}'>
                </div>
            </div>
        </article>`
    }).join(',')
    document.getElementById('quizGallery').innerHTML = questionsTemplate
}

getQuestions().then(data => data)
console.log(correctAnswersArray)

//Fisher-Yates algorith
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  }
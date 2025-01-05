const landingPage = document.querySelector(".landing-page");
const gameCategory = document.querySelector(".game-category");
const quizSection = document.querySelector(".quiz");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");

let currentQuestionIndex = 0;
let questions = [];

function showLandingPage() {
    landingPage.style.display = "";
    gameCategory.style.display = "none";
    quizSection.style.display = "none";
}

function showGameCategory() {
    landingPage.style.display = "none";
    gameCategory.style.display = "";
    quizSection.style.display = "none";
}

function showQuiz(category) {
    landingPage.style.display = "none";
    gameCategory.style.display = "none";
    quizSection.style.display = "";
    getQuestions(category);
}

async function getQuestions(category) {
    const API_URL = https://opentdb.com/api.php?amount=10&type=multiple&category=${category};
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            questions = data.results;
            currentQuestionIndex = 0; 
            displayQuestion();
        } else {
            console.error("No questions found:", data);
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    shuffleArray(options).forEach(option => addOption(option, option === currentQuestion.correct_answer));
}

function addOption(text, isCorrect) {
    const optionElement = document.createElement("button");
    optionElement.textContent = text;
    optionElement.classList.add("option");
    optionElement.dataset.correct = isCorrect;
    optionElement.addEventListener("click", selectOption);
    optionsContainer.appendChild(optionElement);
}

async function selectOption(event) {
    const selectedOption = event.target;
    const isCorrect = selectedOption.dataset.correct === "true";

    questionElement.textContent = isCorrect ? "Correct!" : "Incorrect!";
    optionsContainer.style.display = "none";

    currentQuestionIndex++;

    await new Promise(resolve => setTimeout(resolve, 500));

    if (currentQuestionIndex < questions.length) {
        optionsContainer.style.display = "";
        displayQuestion();
    } else {
        showLandingPage(); 
    }
}


function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

showLandingPage();
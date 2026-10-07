let defaultFlashcards = [
    {
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language."
    },
    {
        question: "What is CSS?",
        answer: "CSS is used to style and design web pages."
    },
    {
        question: "What is JavaScript?",
        answer: "JavaScript is used to add functionality and interactivity to web pages."
    }
];

// Load saved flashcards or use default ones
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || defaultFlashcards;

let currentIndex = 0;

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");

function saveFlashcards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function displayFlashcard() {
    questionElement.textContent = flashcards[currentIndex].question;
    answerElement.textContent = flashcards[currentIndex].answer;

    answerElement.classList.add("hidden");
}

// Show Answer
document.getElementById("showAnswer").addEventListener("click", function () {
    answerElement.classList.toggle("hidden");
});

// Next
document.getElementById("next").addEventListener("click", function () {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        displayFlashcard();
    } else {
        alert("This is the last flashcard.");
    }
});

// Previous
document.getElementById("previous").addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex--;
        displayFlashcard();
    } else {
        alert("This is the first flashcard.");
    }
});

// Add Flashcard
document.getElementById("add").addEventListener("click", function () {
    let question = prompt("Enter your question:");
    let answer = prompt("Enter the answer:");

    if (question && answer) {
        flashcards.push({
            question: question,
            answer: answer
        });

        saveFlashcards();

        currentIndex = flashcards.length - 1;
        displayFlashcard();
    }
});

// Edit Flashcard
document.getElementById("edit").addEventListener("click", function () {
    let question = prompt(
        "Edit question:",
        flashcards[currentIndex].question
    );

    let answer = prompt(
        "Edit answer:",
        flashcards[currentIndex].answer
    );

    if (question && answer) {
        flashcards[currentIndex].question = question;
        flashcards[currentIndex].answer = answer;

        saveFlashcards();
        displayFlashcard();
    }
});

// Delete Flashcard
document.getElementById("delete").addEventListener("click", function () {

    if (flashcards.length === 1) {
        alert("You cannot delete the last flashcard.");
        return;
    }

    let confirmation = confirm(
        "Are you sure you want to delete this flashcard?"
    );

    if (confirmation) {
        flashcards.splice(currentIndex, 1);

        if (currentIndex >= flashcards.length) {
            currentIndex = flashcards.length - 1;
        }

        saveFlashcards();
        displayFlashcard();
    }
});

// Display first flashcard
displayFlashcard();
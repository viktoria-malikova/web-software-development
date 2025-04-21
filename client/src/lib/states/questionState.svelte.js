import { browser } from "$app/environment";

const QUESTIONS_KEY = "questions";
let initialQuestions = [];

if (browser && localStorage.hasOwnProperty(QUESTIONS_KEY)) {
  initialQuestions = JSON.parse(localStorage.getItem(QUESTIONS_KEY));
}

let questionState = $state(initialQuestions);

const saveQuestions = () => {
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionState));
};

const useQuestionState = () => {
  return {
    get questions() {
      return questionState;
    },
    add: (question) => {
      questionState.push(question);
      saveQuestions();
    },
    remove: (id) => {
      questionState = questionState.filter((q) => q.id !== id);
      saveQuestions();
    },
    upvote: (id) => {
      const question = questionState.find((q) => q.id === id);
      question.upvotes++;
      saveQuestions();
    },
  };
};

export { useQuestionState };

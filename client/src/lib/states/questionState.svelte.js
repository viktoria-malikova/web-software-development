import { browser } from "$app/environment";
import * as questionApi from "$lib/apis/questions-api.js";

let questionState = $state([]);

if (browser) {
  questionState = await questionApi.readQuestions();
}

const useQuestionState = () => {
  return {
    get questions() {
      return questionState;
    },
    add: async (question) => {
      const newQuestion = await questionApi.createQuestion(question.title, question.text);
      questionState.push(newQuestion);
    },
    remove: async (id) => {
      const removed = await questionApi.deleteQuestion(id);
      questionState = questionState.filter((q) => q.id !== removed.id);
    },
    upvote: async (id) => {
      const updated = await questionApi.upvoteQuestion(id);
      const index = questionState.findIndex((q) => q.id === id);
      if (index !== -1) {
        questionState[index] = updated;
      }
    },
  };
};

export { useQuestionState };

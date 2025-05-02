<script>
  import { useQuestionState } from "$lib/states/questionState.svelte.js";
  let questionState = useQuestionState();

  const addQuestion = async (e) => {
    const question = Object.fromEntries(new FormData(e.target));
    await questionState.add(question);
    e.target.reset();
    e.preventDefault();
  };
</script>

<form onsubmit={addQuestion}>
  <label for="title">Title</label>
  <input id="title" name="title" type="text" required placeholder="Enter title" />

  <label for="text">Text</label>
  <textarea id="text" name="text" required placeholder="Enter your question"></textarea>

  <input type="submit" value="Add Question" />
</form>

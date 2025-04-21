<script>
  import { useQuestionState } from "$lib/states/questionState.svelte.js";
  let questionState = useQuestionState();

  const addQuestion = (e) => {
    const data = Object.fromEntries(new FormData(e.target));
    data.id = crypto.randomUUID();
    data.upvotes = 0;
    questionState.add(data);
    e.target.reset();
    e.preventDefault();
  };
</script>

<form onsubmit={addQuestion}>
  <label for="title">Title</label>
  <input id="title" name="title" type="text" placeholder="Enter title" required />

  <label for="text">Text</label>
  <textarea id="text" name="text" placeholder="Enter your question" required></textarea>

  <input type="submit" value="Add Question" />
</form>

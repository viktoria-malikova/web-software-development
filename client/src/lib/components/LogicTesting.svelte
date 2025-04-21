<script>
  let text = $state("");

  const submitForm = (e) => {
    console.log(text);
    e.preventDefault();
  };
</script>

<form onsubmit={submitForm}>
  <label for="textfield">Text field</label>
  <input
    id="textfield"
    name="textfield"
    type="text"
    bind:value={text}
    placeholder="Enter text"
  />
  <input type="submit" value="Submit form" />
</form>
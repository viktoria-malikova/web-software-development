<script>
  import { PUBLIC_API_URL } from "$env/static/public";

  let courses = $state([]);
  let name = "";

  const loadCourses = async () => {
    const res = await fetch(`${PUBLIC_API_URL}/api/courses`);
    courses = await res.json();
  };

  const addCourse = async () => {
    await fetch(`${PUBLIC_API_URL}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    name = "";
    await loadCourses();
  };

  const deleteCourse = async (id) => {
    await fetch(`${PUBLIC_API_URL}/api/courses/${id}`, {
      method: "DELETE",
    });
    await loadCourses(); // обновить список
  };

  $effect(() => {
    loadCourses();
  });
</script>

<h1 class="text-3xl font-bold mb-4">Courses</h1>

<form on:submit|preventDefault={addCourse} class="space-y-4 mb-6">
  <label class="label">
    <span class="label-text">Course name</span>
    <input
      class="input input-bordered w-full"
      type="text"
      bind:value={name}
      name="name"
      placeholder="Enter course name"
      required
    />
  </label>
  <button class="btn preset-filled-primary-500 w-full" type="submit">Add course</button>
</form>

<ul class="space-y-4">
  {#each courses as course}
    <li class="p-4 border border-gray-300 rounded flex justify-between items-center">
      <a class="text-lg font-medium underline" href={`/courses/${course.id}`}>
        {course.name}
      </a>
      <button
        class="btn preset-filled-error-500"
        on:click={() => deleteCourse(course.id)}
      >
        Delete
      </button>
    </li>
  {/each}
</ul>

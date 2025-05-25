<script>
	import { PUBLIC_API_URL } from "$env/static/public";

	let { data } = $props();
	let course = $state({});
	let questions = $state([]);
	let title = "";
	let text = "";

	const getCourseAndQuestions = async () => {
		const courseRes = await fetch(`${PUBLIC_API_URL}/api/courses/${data.id}`);
		course = await courseRes.json();

		const questionRes = await fetch(`${PUBLIC_API_URL}/api/courses/${data.id}/questions`);
		questions = await questionRes.json();
	};

	const addQuestion = async () => {
		if (title.trim().length < 3 || text.trim().length < 3) return;
		await fetch(`${PUBLIC_API_URL}/api/courses/${data.id}/questions`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, text }),
		});
		title = "";
		text = "";
		await getCourseAndQuestions();
	};

	const upvote = async (id) => {
		await fetch(`${PUBLIC_API_URL}/api/courses/${data.id}/questions/${id}/upvote`, {
			method: "POST",
		});
		await getCourseAndQuestions();
	};

	const remove = async (id) => {
		await fetch(`${PUBLIC_API_URL}/api/courses/${data.id}/questions/${id}`, {
			method: "DELETE",
		});
		await getCourseAndQuestions();
	};

	$effect(() => {
		getCourseAndQuestions();
	});
</script>

<h1 class="text-3xl font-bold mb-6">{course.name}</h1>

<ul class="space-y-4 mb-6">
	{#each questions as question}
		<li class="card border-[1px] p-4 space-y-2">
			<h3 class="text-xl font-semibold">{question.title}</h3>
			<p class="text-gray-700">{question.text}</p>
			<p class="text-sm text-gray-500">Upvotes: {question.upvotes}</p>
			<div class="flex gap-4 mt-2">
				<button class="btn btn-sm preset-filled-primary-500" on:click={() => upvote(question.id)}>Upvote</button>
				<button class="btn btn-sm preset-filled-error-500" on:click={() => remove(question.id)}>Delete</button>
			</div>
		</li>
	{/each}
</ul>

<form on:submit|preventDefault={addQuestion} class="space-y-4 max-w-md">
	<label class="label">
		<span class="label-text">Title</span>
		<input
			bind:value={title}
			name="title"
			type="text"
			class="input w-full"
			required
			minlength="3"
			placeholder="Enter question title"
		/>
	</label>

	<label class="label">
		<span class="label-text">Text</span>
		<textarea
			bind:value={text}
			name="text"
			class="textarea w-full"
			required
			minlength="3"
			placeholder="Enter question text"
		></textarea>
	</label>

	<button class="btn preset-filled-primary-500 w-full" type="submit">Add question</button>
</form>

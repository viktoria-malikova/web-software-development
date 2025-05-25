<script>
    import "../app.css"
	let { children } = $props();
</script>

<header class="w-full bg-primary-500 text-white p-4">
	<nav class="container mx-auto flex justify-between items-center">
		<h1 class="text-2xl font-bold">My App</h1>
		<ul class="flex gap-6">
			<li><a href="/" class="hover:underline">Home</a></li>
			<li><a href="/courses" class="hover:underline">Courses</a></li>
		</ul>
	</nav>
</header>

<main class="container mx-auto p-6">
	{@render children()}
</main>

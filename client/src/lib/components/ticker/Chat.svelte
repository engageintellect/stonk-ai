<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { onMount } from 'svelte';

	const { input, handleSubmit, messages } = useChat();

	onMount(() => {
		input.set('what is the capital of thailand?');
		const syntheticEvent = {
			preventDefault() {}, // Shorthand notation for defining a function
			stopPropagation() {}, // Shorthand notation for defining a function
			target: {
				value: $input // Access the value of the writable store directly using the $ prefix
			}
		} as Event & { target: { value: string } }; // Type assertion

		handleSubmit(syntheticEvent); // Pass the synthetic event object to handleSubmit
	});
</script>

<section>
	<h1>useChat</h1>
	<ul>
		{#each $messages as message}
			{#if message.role === 'assistant'}
				<li>{message.role}: {message.content}</li>
			{/if}
		{/each}
	</ul>
	<!-- No need for a form and a button, as we're triggering handleSubmit automatically -->
</section>

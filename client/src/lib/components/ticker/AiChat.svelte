<script lang="ts">
	let query: string;
	let data: any;
	let loading = false;

	let aiResponse = {
		message: ''
	};

	async function sendRequest() {
		loading = true;
		const response = await fetch('/api/chatAi', {
			method: 'POST',
			body: JSON.stringify({ query }),
			headers: {
				'content-type': 'application/json'
			}
		});

		data = await response.json();
		loading = false;
		aiResponse = data.message;
	}
</script>

<div>
	<div class="text-3xl font-semibold">AI Insights</div>

	<div class="py-5">
		{#if loading}
			<div>Loading...</div>
		{/if}

		{#if aiResponse.message !== ''}
			{aiResponse}
		{/if}

		<div class="flex w-full gap-2">
			<input type="string" class="input input-primary w-full" bind:value={query} />

			<button class="btn btn-primary" on:click={sendRequest}>submit</button>
		</div>
	</div>
</div>

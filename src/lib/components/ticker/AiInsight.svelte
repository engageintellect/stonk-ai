<script lang="ts">
	let query: string;
	let data: any;

	let loading = false;

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
	}
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	{JSON.stringify(data)}
{/if}

<input type="string" class="input input-primary" bind:value={query} />

<button class="btn btn-primary" on:click={sendRequest}>submit</button>

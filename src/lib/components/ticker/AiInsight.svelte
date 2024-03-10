<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	let data: any;

	onMount(async () => {
		const res = await fetch('/api/chatAi');
		data = await res.json();
		console.log(data);
	});
</script>

<div>
	<div transition:fade={{ delay: 1000, duration: 1000 }}>
		{JSON.stringify(data)}
	</div>
</div>

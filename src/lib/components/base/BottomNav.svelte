<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Icon from '@iconify/svelte';

	// Store to keep track of the last clicked index
	const activeIndex = writable<number>(-1);

	// Function to handle the click event
	function handleClick(index: number) {
		activeIndex.set(index);
	}

	// Reset activeIndex on component mount
	onMount(() => {
		activeIndex.set(-1);
	});
</script>

<div class="btm-nav border-primary z-50 border-t-[0.5px]">
	<a href="/" on:click={() => handleClick(0)} class:active={$activeIndex === 0}>
		<Icon icon="material-symbols:search" class="h-16 w-16 rounded px-4 py-2" />
	</a>
	<a
		href="https://github.com/engageintellect"
		on:click={() => handleClick(1)}
		class:active={$activeIndex === 1}
	>
		<Icon icon="bi:github" class="h-16 w-16 rounded px-4 py-2" />
	</a>
	<a
		href="mailto:engage.intellect@protonmail.com"
		on:click={() => handleClick(2)}
		class:active={$activeIndex === 2}
	>
		<Icon icon="material-symbols:mail" class="h-16 w-16 rounded px-4 py-2" />
	</a>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Home from 'virtual:icons/material-symbols/home-rounded';
	import GitHub from 'virtual:icons/bi/github';
	import Mail from 'virtual:icons/material-symbols/mail';

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

<div class="btm-nav z-20 mt-20">
	<a href="/" on:click={() => handleClick(0)} class:active={$activeIndex === 0}>
		<Home class="h-16 w-16 rounded px-4 py-2" />
	</a>
	<a
		href="https://github.com/engageintellect"
		on:click={() => handleClick(1)}
		class:active={$activeIndex === 1}
	>
		<GitHub class="h-16 w-16 rounded px-4 py-2" />
	</a>
	<a
		href="mailto:engage.intellect@protonmail.com"
		on:click={() => handleClick(2)}
		class:active={$activeIndex === 2}
	>
		<Mail class="h-16 w-16 rounded px-4 py-2" />
	</a>
</div>

<style>
	.selected {
		/* Your active styles here */
		/* For example: */
		background-color: blue;
	}
</style>

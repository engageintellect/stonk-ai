<script lang="ts">
	import { onMount } from 'svelte';

	import LayoutIcon from 'virtual:icons/lucide/layout-dashboard';

	let menuOptions = [
		{ name: 'Analyst Data', link: '#analyst-data' },
		{ name: 'Ai Sentiment', link: '#ai-sentiment' },
		{ name: 'Company Data', link: '#company-data' },
		{ name: 'Ai Forecase', link: '#ai-forecast' },
		{ name: 'Company Description', link: '#company-description' },
		{ name: 'Company Officers', link: '#company-officers' },
		{ name: 'News', link: '#news' },
		{ name: 'Videos', link: '#videos' },
		{ name: 'Options', link: '#options' }
	];

	let filteredMenuOptions: { name: string; link: string }[] = [];

	let navbarHeight = 125;

	function scrollToAnchor(anchorId: string) {
		const anchor = document.getElementById(anchorId.substring(1));
		if (anchor) {
			const scrollTop = anchor.getBoundingClientRect().top + window.scrollY;
			const offset = navbarHeight ? navbarHeight : 0;
			window.scroll({
				top: scrollTop - offset,
				behavior: 'smooth'
			});
		}
	}

	onMount(() => {
		// Filter menu options based on existing anchor IDs
		filteredMenuOptions = menuOptions.filter((option) =>
			document.getElementById(option.link.substring(1))
		);
	});
</script>

<div class="bg-base-200 sticky top-[66px] z-40">
	<div class="flex items-center gap-2">
		<div>
			<LayoutIcon class="h-7 w-7" />
		</div>
		<div class="overflow-auto">
			<div class="flex items-center gap-2 py-2">
				{#each filteredMenuOptions as option}
					<a
						href="#"
						on:click={(event) => {
							event.preventDefault();
							scrollToAnchor(option.link);
						}}
						class="btn btn-sm btn-primary shadow"
					>
						<div>
							{option.name}
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

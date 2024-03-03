<script lang="ts">
	import daisyuiColors from 'daisyui/src/theming/themes';
	import StockMarket from 'virtual:icons/icon-park-solid/stock-market';
	import ThemeIcon from 'virtual:icons/gridicons/themes';
	import { selectedTheme } from '$lib/store';
	import { onMount } from 'svelte';

	let themes = Object.keys(daisyuiColors);

	// Read the selected theme from local storage or cookies when the component mounts
	onMount(() => {
		const storedTheme = localStorage.getItem('selectedTheme');
		if (storedTheme && themes.includes(storedTheme)) {
			selectedTheme.set(storedTheme);
			document.documentElement.setAttribute('data-theme', storedTheme);
		}
	});

	// Function to handle theme selection
	function handleThemeChange(event: any) {
		const theme = event.target.value;
		selectedTheme.set(theme);
		// Save the selected theme to local storage or cookies
		localStorage.setItem('selectedTheme', theme);
	}
</script>

<div class="navbar sticky top-0 z-10">
	<div class="mx-auto w-full max-w-3xl">
		<div class="flex-1">
			<a href="/" class="btn btn-primary text-xl"> <StockMarket class="h-7 w-7" /></a>
		</div>

		<div class="flex items-center gap-2">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="mx-2">
					<!-- Add dropdown icon here -->
					<div class="btn btn-ghost flex items-center gap-2">
						<div>Themes</div>
						<ThemeIcon class="h-7 w-7" />
					</div>
				</div>
				<ul
					tabindex="0"
					class="dropdown-content bg-base-200 rounded-box dropdown-end z-[1] h-96 w-52 overflow-auto p-2 shadow"
				>
					{#each themes as theme}
						<li>
							<input
								type="radio"
								name="theme-dropdown"
								class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
								aria-label={theme}
								value={theme}
								on:change={handleThemeChange}
							/>
						</li>
					{/each}
				</ul>
			</div>

			<div class="flex-none gap-2">
				<!-- <div class="form-control">
			<input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
		</div> -->

				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img
								alt="Tailwind CSS Navbar component"
								src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
							/>
						</div>
					</div>
					<ul
						tabindex="0"
						class="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow"
					>
						<li>
							<a class="justify-between">
								Profile
								<span class="badge">New</span>
							</a>
						</li>
						<li><a>Settings</a></li>
						<li><a>Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

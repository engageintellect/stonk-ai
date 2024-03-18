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

<div class="navbar bg-base-100 z-20">
	<div class="mx-auto w-full max-w-3xl">
		<div class="flex-1">
			<a href="/" class="btn btn-primary text-xl"> <StockMarket class="h-7 w-7" /></a>
		</div>

		<div class="flex items-center">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="">
					<!-- Add dropdown icon here -->
					<div class="btn btn-ghost flex items-center gap-2">
						<div class="text-lg font-thin">Theme</div>
						<ThemeIcon class="h-7 w-7" />
					</div>
				</div>
				<ul
					tabindex="-1"
					class="dropdown-content bg-base-100 border-primary rounded-box dropdown-end -z-[-1] h-96 w-52 overflow-auto border p-2 shadow"
				>
					{#each themes as theme}
						<li>
							<input
								type="radio"
								name="theme-dropdown"
								class="theme-controller btn btn-sm btn-block btn-ghost justify-start text-lg font-thin"
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
						<div class="border-primary w-10 rounded-full border-2">
							<img
								alt="Tailwind CSS Navbar component"
								src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
							/>
						</div>
					</div>
					<ul
						tabindex="-1"
						class="menu menu-sm dropdown-content bg-base-100 border-primary rounded-box z-[1] w-52 border text-lg shadow"
					>
						<li>
							<a href="/" class="justify-between text-lg">
								Profile
								<span class="badge">New</span>
							</a>
						</li>
						<li><a href="/" class="text-lg">Settings</a></li>
						<li><a href="/" class="text-lg">Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

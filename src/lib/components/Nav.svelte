<script lang="ts">
	import StockMarket from 'virtual:icons/icon-park-solid/stock-market';

	import { selectedTheme } from '$lib/store';

	let themes = ['forest', 'retro', 'cyberpunk', 'dark', 'lofi', 'dim', 'aqua'];

	// Function to handle theme selection
	function handleThemeChange(event: any) {
		selectedTheme.set(event.target.value);
	}
</script>

<div class="navbar bg-base-100 sticky top-0 z-10">
	<div class="mx-auto w-full max-w-3xl">
		<div class="flex-1">
			<a href="/" class="btn btn-primary rounded-full text-xl"> <StockMarket class="h-7 w-7" /></a>
		</div>

		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn m-1">
				Theme
				<!-- Add dropdown icon here -->
			</div>
			<ul tabindex="0" class="dropdown-content bg-base-300 rounded-box dropdown-end z-[1] w-52 p-2">
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
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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

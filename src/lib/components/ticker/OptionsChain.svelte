<script lang="ts">
	export let data: any;
	import BrainIcon from 'virtual:icons/lucide/brain';
</script>

{#if data.options.length > 0}
	<div>
		<div class="flex items-center gap-2">
			<div class="flex items-center gap-2">
				<div class="text-3xl font-semibold">Options Chain</div>
				<div class="badge badge-warning">Expiry Dates</div>
			</div>
			<!-- <BrainIcon class="text-primary h-10 w-10" /> -->
		</div>
		<div class="grid grid-cols-2 gap-2 py-5 sm:grid-cols-3 lg:grid-cols-4">
			{#each data.options as strike_date}
				<div class="btn btn-primary">
					<div class="">{strike_date}</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="flex items-center gap-2">
		<div class=" animate-pulse text-lg font-semibold">Generating AI Response</div>
		<span class="loading loading-spinner text-primary"></span>
	</div>
{/if}

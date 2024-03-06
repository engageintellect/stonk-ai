<script lang="ts">
	export let ticker: any;
</script>

<div class="">
	<div class="flex gap-2 overflow-auto">
		{#each Object.entries(ticker) as [key, value]}
			{#if key !== 'info' && key !== 'analysis'}
				{#if value && Object.values(value).some((x) => x)}
					<div class="flex flex-col gap-2 rounded pb-5">
						<div class="pb-3 text-lg font-semibold capitalize">{key}</div>
						{#each Object.entries(value) as [prop, propValue]}
							{#if propValue}
								<div class=" bg-secondary text-secondary-content rounded p-2 text-sm">
									<div class="flex gap-2">
										<div class="font-semibold capitalize">{prop}:</div>
										<div class="">{propValue}</div>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				{/if}
			{/if}
		{/each}
	</div>
</div>

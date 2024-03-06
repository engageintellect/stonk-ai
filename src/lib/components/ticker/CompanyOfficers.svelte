<script lang="ts">
	import CompanyOfficerCard from '$lib/components/ticker/CompanyOfficerCard.svelte';
	export let data: any;
	export let companyOfficers: any;
</script>

{#if data.ticker_info.companyOfficers}
	<div>
		<div class="text-lg font-semibold">Company Officers</div>
		<div class="flex w-full gap-2 overflow-auto py-5">
			{#each companyOfficers as officer}
				<CompanyOfficerCard companyOfficers={officer} />
			{/each}
		</div>
	</div>
{/if}

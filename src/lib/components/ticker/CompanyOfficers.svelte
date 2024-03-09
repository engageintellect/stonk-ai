<script lang="ts">
	import CompanyOfficerCard from '$lib/components/ticker/CompanyOfficerCard.svelte';
	export let data: any;
	export let companyOfficers: any;
	import OfficersIcon from 'virtual:icons/akar-icons/people-group';
</script>

{#if data.ticker_info.companyOfficers}
	<div>
		<div class="flex items-center gap-2">
			<div class="text-2xl font-semibold">Company Officers</div>
			<OfficersIcon class="text-primary h-10 w-10" />
		</div>
		<div class="flex w-full snap-x snap-mandatory gap-2 overflow-auto py-5">
			{#each companyOfficers as officer}
				<CompanyOfficerCard companyOfficers={officer} />
			{/each}
		</div>
	</div>
{/if}

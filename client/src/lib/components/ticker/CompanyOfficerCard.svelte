<script lang="ts">
	import Icon from '@iconify/svelte';
	import { formatPrice } from '$lib/tickerModel';
	export let companyOfficers = {
		name: '',
		title: '',
		age: '',
		fiscalYear: '',
		totalPay: '',
		exercisedValue: '',
		unexercisedValue: ''
	};
</script>

<a
	href={`https://www.google.com/search?q=${companyOfficers.name}`}
	target={`_blank`}
	class="bg-primary text-primary-content w-full snap-center rounded p-6"
>
	<div class="flex w-full flex-col items-center justify-start gap-2">
		<div class="w-full text-nowrap text-lg font-thin capitalize">{companyOfficers.name}</div>

		<div class=" w-full font-semibold uppercase">{companyOfficers.title}</div>

		<div class="w-full">
			{#if companyOfficers.totalPay}
				<div class="flex items-center gap-2 text-sm">
					<div><Icon icon="teenyicons:money-outline" class="h-5 w-5" /></div>
					<div>
						<div class="flex items-center">
							{formatPrice(Number(companyOfficers.totalPay))}
							<div class="">/yr</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</a>

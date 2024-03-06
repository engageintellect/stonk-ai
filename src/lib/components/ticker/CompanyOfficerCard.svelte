<script lang="ts">
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
	class="bg-primary text-primary-content w-full min-w-72 rounded p-6"
>
	<div class="flex w-full flex-col items-center justify-start gap-2">
		<div class="w-full text-nowrap font-thin capitalize">{companyOfficers.name}</div>
		<div class=" w-full font-semibold uppercase">{companyOfficers.title}</div>
		<div class="w-full">
			{#if companyOfficers.totalPay}
				<div class="flex gap-2">
					<div class="font-semibold">Pay:</div>
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

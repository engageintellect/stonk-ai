<script lang="ts">
	export let alertMsg: string;
	export let alertType: string;

	import ErrorIcon from 'virtual:icons/material-symbols/error';
	import InfoIcon from 'virtual:icons/material-symbols/info';
	import WarningIcon from 'virtual:icons/material-symbols/warning';
	import SuccessIcon from 'virtual:icons/clarity/success-standard-solid';
	import AlertIcon from 'virtual:icons/material-symbols/circle-notifications';
</script>

<div>
	{#if alertType == 'error'}
		<div role="alert" class="alert alert-error">
			<ErrorIcon class="h-7 w-7" />
			<span class="font-semibold">{alertMsg}</span>
		</div>
	{:else if alertType == 'warning'}
		<div role="alert" class="alert alert-warning">
			<WarningIcon class="h-7 w-7" />
			<span class="font-semibold">{alertMsg}</span>
		</div>
	{:else if alertType == 'success'}
		<div role="alert" class="alert alert-success">
			<SuccessIcon class="h-7 w-7" />
			<span class="font-semibold">{alertMsg}</span>
		</div>
	{:else if alertType == 'info'}
		<div role="alert" class="alert alert-info">
			<InfoIcon class="h-7 w-7" />
			<span class="font-semibold">{alertMsg}</span>
		</div>
	{:else if alertType == 'alert'}
		<div role="alert" class="alert">
			<AlertIcon class="h-7 w-7" />
			<span class="font-semibold">{alertMsg}</span>
		</div>
	{/if}
</div>

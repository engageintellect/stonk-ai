<script lang="ts">
	export let alertMsg: string;
	export let alertType: string;

	import ErrorIcon from 'virtual:icons/material-symbols/error';
	import InfoIcon from 'virtual:icons/material-symbols/info';
	import WarningIcon from 'virtual:icons/material-symbols/warning';
	import SuccessIcon from 'virtual:icons/clarity/success-standard-solid';
	import AlertIcon from 'virtual:icons/material-symbols/circle-notifications';
</script>

<div role="alert" class="alert {alertType === 'alert' ? '' : 'alert-' + alertType}">
	{#if alertType === 'error'}
		<ErrorIcon class="h-7 w-7" />
	{:else if alertType === 'warning'}
		<WarningIcon class="h-7 w-7" />
	{:else if alertType === 'success'}
		<SuccessIcon class="h-7 w-7" />
	{:else if alertType === 'info'}
		<InfoIcon class="h-7 w-7" />
	{:else if alertType === 'alert'}
		<AlertIcon class="h-7 w-7" />
	{/if}
	<span class="font-semibold">{alertMsg}</span>
</div>

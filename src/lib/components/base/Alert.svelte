<script lang="ts">
	export let alertMsg: string;
	export let alertType: string;

	import Icon from '@iconify/svelte';
</script>

<div role="alert" class="alert {alertType === 'alert' ? '' : 'alert-' + alertType}">
	{#if alertType === 'error'}
		<Icon icon="material-symbols:error" class="h-7 w-7" />
	{:else if alertType === 'warning'}
		<Icon icon="material-symbols:info" class="h-7 w-7" />
	{:else if alertType === 'success'}
		<Icon icon="material-symbols:warning" class="h-7 w-7" />
	{:else if alertType === 'info'}
		<Icon icon="clarity:success-standard-solid" class="h-7 w-7" />
	{:else if alertType === 'alert'}
		<Icon icon="material-symbols:circle-notifications" class="h-7 w-7" />
	{/if}
	<span class="font-semibold">{alertMsg}</span>
</div>

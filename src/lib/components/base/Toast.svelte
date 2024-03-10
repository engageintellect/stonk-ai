<script lang="ts">
	import daisyuiColors from 'daisyui/src/theming/themes';
	import { toast } from '@zerodevx/svelte-toast';

	let col = daisyuiColors.acid.primary;
</script>

<button
	on:click={() =>
		toast.push('Hello world!', {
			theme: {
				'--toastBackground': col,
				'--toastColor': '#fff',
				'--toastProgressBackground': 'rgba(255, 255, 255, 0.3)',
				'--toastProgressColor': '#000',
				'--toastSuccessBackground': 'rgba(0, 0, 0, 0.9)',
				'--toastSuccessColor': '#fff',
				'--toastWarningBackground': 'rgba(0, 0, 0, 0.9)',
				'--toastWarningColor': '#fff',
				'--toastErrorBackground': 'rgba(0, 0, 0, 0.9)',
				'--toastErrorColor': '#fff',
				'--toastInfoBackground': 'rgba(0, 0, 0, 0.9)',
				'--toastInfoColor': '#fff'
			}
		})}>SHOW TOAST</button
>

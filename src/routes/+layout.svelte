<script>
	import '../app.pcss';
	import Nav from '$lib/components/base/Nav.svelte';
	import Footer from '$lib/components/base/Footer.svelte';
	import BottomNav from '$lib/components/base/BottomNav.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { fade } from 'svelte/transition';
</script>

<div class="flex min-h-screen flex-col">
	<!-- <div class="mx-auto max-w-3xl"></div> -->
	<div class="sticky top-0 z-50 w-full shadow">
		<Nav />
	</div>

	<div class=" bg-base-200 flex w-full flex-1 items-start px-2 py-6 lg:items-center lg:px-6">
		<div class="mx-auto w-full max-w-3xl">
			<SvelteToast />
			<slot />
		</div>
	</div>

	<div class="">
		<Footer />
	</div>

	<div class="fixed bottom-0 z-50 w-full bg-red-500 sm:hidden">
		<BottomNav />
	</div>
</div>

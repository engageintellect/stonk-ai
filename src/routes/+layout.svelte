<script>
	import '../app.pcss';
	import Nav from '$lib/components/base/Nav.svelte';
	import Footer from '$lib/components/base/Footer.svelte';
	import BottomNav from '$lib/components/base/BottomNav.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<div class="">
	<!-- <div class="mx-auto max-w-3xl"></div> -->
	<div class="sticky top-0 z-50 w-full shadow">
		<Nav />
	</div>

	<div class="p-2 sm:p-6">
		<div class="mx-auto max-w-3xl">
			<SvelteToast />
			<slot />
		</div>
	</div>

	<div class="mb-12 sm:mb-0">
		<Footer />
	</div>

	<div class="sm:hidden">
		<BottomNav />
	</div>
</div>

<script>
	import '../app.pcss';
	import Nav from '$lib/components/base/Nav.svelte';
	import Footer from '$lib/components/base/Footer.svelte';
	import BottomNav from '$lib/components/base/BottomNav.svelte';
</script>

<div class="">
	<Nav />
	<div class="p-2 sm:p-6">
		<div class="mx-auto max-w-3xl">
			<slot />
		</div>
	</div>

	<div class="sm:hidden">
		<BottomNav />
	</div>
	<!-- <Footer /> -->
</div>

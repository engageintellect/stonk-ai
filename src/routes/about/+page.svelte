<script lang="ts">
	import BuiltWith from '$lib/components/base/BuiltWith.svelte';
	import { fade, slide } from 'svelte/transition';
	import robotImage from '$lib/assets/robot14-nobg.png';
</script>

<div class="flex flex-col gap-5">
	<div>
		<div class="ml-6 text-5xl font-thin lowercase md:ml-0 md:text-7xl">Stonk Ai</div>
		<div class="card md:card-side bg-base-100 h-full shadow-xl sm:min-h-80">
			<figure class="w-full">
				<img
					in:fade={{ delay: 200, duration: 1500 }}
					src={robotImage}
					class="h-64 w-full object-contain drop-shadow md:h-full"
					alt="AboutCard"
				/>
			</figure>
			<div class="card-body w-full">
				<div in:fade={{ delay: 500, duration: 1500 }}>
					<strong>Stonk AI was developed to help analyze complex financial data</strong> to help you
					formulate comprehensive stock market predictions. It harnesses the power of machine
					learning to sift through vast amounts of data, including historical stock prices, company
					financial reports, news articles, videos, and options in order to provide you with
					actionable insights into potential price movements.

					<div class="mt-5 font-thin">
						Stonk AI is a project by
						<a href="https://github.com/engageintellect" target="_blank" class="link text-primary">
							@engageintellect
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<BuiltWith />
</div>

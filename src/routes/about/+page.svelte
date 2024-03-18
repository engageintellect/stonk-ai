<script lang="ts">
	import BuiltWith from '$lib/components/base/BuiltWith.svelte';
	import { fade } from 'svelte/transition';
	import robotImage from '$lib/assets/robot14-nobg.png';
</script>

<div class="flex flex-col gap-5">
	<div>
		<div class="font-sans text-5xl font-thin lowercase sm:text-7xl">Stonk Ai</div>
		<div class="card lg:card-side bg-base-100 h-full shadow-xl sm:min-h-80">
			<figure class="w-full">
				<img src={robotImage} class="h-full w-full drop-shadow" alt="AboutCard" />
			</figure>
			<div class="card-body w-full">
				<div>
					<strong>Stonk AI was developed to help analyze complex financial data</strong> in order to
					form comprehensive stock market and predictions. It harnesses the power of machine
					learning to sift through vast amounts of data, including historical stock prices, company
					financial reports, news articles, videos, and options in order to provide you with
					actionable insights into potential price movements.

					<div class="mt-5 font-thin">
						Stonk AI is a project by
						<a href="https://github.com/engageintellect" target="_blank" class="link">
							@engageintellect
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<BuiltWith />

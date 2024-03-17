<script lang="ts">
	import BuiltWith from '$lib/components/base/BuiltWith.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-col gap-5">
	<div>
		<div class="font-sans text-5xl font-thin lowercase sm:text-7xl">Stonk Ai</div>
		<div class="">
			<!-- <div class="bg-primary float-left h-48 w-48">
			<img
				alt="Tailwind CSS chat bubble component"
				src="/images/robotAvatar.png"
				class="h-full w-full scale-x-[-1] object-cover"
				in:fade={{ delay: 0, duration: 500 }}
			/>
		</div> -->

			<div class="card lg:card-side bg-base-100 h-full shadow-xl sm:min-h-80">
				<figure class="">
					<img src="/images/robot14-nobg.png" class="h-full w-full shadow-lg" alt="AboutCard" />
				</figure>
				<div class="card-body">
					<!-- <h2 class="card-title"></h2> -->

					<div>
						Stonk AI is here to help you form comprehensive stock market analysis and predictions.
						It harnesses the power of machine learning to sift through vast amounts of data,
						including historical stock prices, company financial reports, news articles, and videos,
						to provide you with actionable insights into potential price movements.

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
</div>

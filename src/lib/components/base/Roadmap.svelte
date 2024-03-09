<script lang="ts">
	import StockMarket from 'virtual:icons/icon-park-solid/stock-market';
	import RobotIcon from 'virtual:icons/mdi/robot';
	import NewsIcon from 'virtual:icons/fluent/news-24-filled';
	import YouTubeIcon from 'virtual:icons/tabler/brand-youtube-filled';
	import BrainIcon from 'virtual:icons/lucide/brain';
	import { fade } from 'svelte/transition';
</script>

<ul
	transition:fade={{ delay: 0, duration: 200 }}
	class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical my-10"
>
	<li>
		<div class="timeline-middle px-5">
			<StockMarket class="text-primary h-10 w-10" />
		</div>
		<div class="timeline-start md:text-end">
			<!-- <time class="font-mono italic">Detailed stock market insights</time> -->
			<div class="text-primary text-xl font-black">Detailed stock market insights</div>
			Stonk AI provides detailed stock market insights for any company. We provide the latest stock information
			for any company
		</div>
		<hr />
	</li>
	<li>
		<hr />
		<div class="timeline-middle text-primary px-5">
			<BrainIcon class="h-10 w-10" />
		</div>
		<div class="timeline-end">
			<!-- <time class="font-mono italic">AI generated predictions and input</time> -->
			<div class="text-primary text-xl font-black">AI generated predictions and input</div>
			Stonk AI uses AI to generate predictions and input for the stock market. We provide the latest
			stock information for any company
		</div>
		<hr />
	</li>
	<li>
		<hr />
		<div class="timeline-middle text-primary px-5">
			<NewsIcon class="h-10 w-10" />
		</div>
		<div class="timeline-start md:text-end">
			<!-- <time class="font-mono italic">The latest stock news</time> -->
			<div class="text-primary text-xl font-black">The latest stock news</div>
			Stonk AI provides the latest stock news for any company. We provide the latest stock information
			for any company
		</div>
		<hr />
	</li>
	<li>
		<hr />
		<div class="timeline-middle text-primary px-5">
			<YouTubeIcon class="h-10 w-10" />
		</div>
		<div class="timeline-end">
			<!-- <time class="font-mono italic">Recent videos</time> -->
			<div class="text-primary text-xl font-black">Recent videos</div>
			Stonk AI provides recent videos for any company. We provide the latest stock information for any
			company
		</div>
		<hr />
	</li>
</ul>

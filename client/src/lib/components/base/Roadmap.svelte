<script lang="ts">
  import Icon from "@iconify/svelte";
  import { fade } from "svelte/transition";
</script>

<div class="mx-auto w-full max-w-lg md:max-w-full">
  <div class="text-center text-2xl font-semibold sm:text-3xl">
    Everything you need, in one place.
  </div>
  <ul
    transition:fade={{ delay: 0, duration: 200 }}
    class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical py-5"
  >
    <li>
      <div class="timeline-middle px-5">
        <Icon
          icon="icon-park-solid:stock-market"
          class="text-primary h-10 w-10"
        />
      </div>
      <div class="timeline-start md:text-end">
        <!-- <time class="font-mono italic">Detailed stock market insights</time> -->
        <div class="text-primary text-xl font-black">
          Detailed stock market insights
        </div>
        Stonk AI provides detailed stock market insights for any company.
      </div>
      <hr />
    </li>
    <li>
      <hr />
      <div class="timeline-middle text-primary px-5">
        <Icon icon="lucide:brain" class="text-primary h-10 w-10" />
      </div>
      <div class="timeline-end">
        <!-- <time class="font-mono italic">AI generated predictions and input</time> -->
        <div class="text-primary text-xl font-black">
          AI generated predictions and input
        </div>
        We use AI to generate predictions and input for the stock market. We provide
        the latest stock information for any company
      </div>
      <hr />
    </li>
    <li>
      <hr />
      <div class="timeline-middle text-primary px-5">
        <Icon icon="fluent:news-24-filled" class="text-primary h-10 w-10" />
      </div>
      <div class="timeline-start md:text-end">
        <!-- <time class="font-mono italic">The latest stock news</time> -->
        <div class="text-primary text-xl font-black">The latest stock news</div>
        Stonk AI provides the latest stock news for any company. for any company
      </div>
      <hr />
    </li>
    <li>
      <hr />
      <div class="timeline-middle text-primary px-5">
        <Icon
          icon="tabler:brand-youtube-filled"
          class="text-primary h-10 w-10"
        />
      </div>
      <div class="timeline-end">
        <!-- <time class="font-mono italic">Recent videos</time> -->
        <div class="text-primary text-xl font-black">Recent videos</div>
        Stonk AI provides recent videos for any company.
      </div>
      <hr />
    </li>
  </ul>
</div>

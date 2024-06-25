<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let menuOptions = [
    { name: "Analyst Data", link: "#analyst-data" },
    { name: "News", link: "#news" },
    { name: "Ai Sentiment", link: "#ai-sentiment" },
    { name: "Company Data", link: "#company-data" },
    { name: "Company Description", link: "#company-description" },
    { name: "Company Officers", link: "#company-officers" },
    { name: "Ai Forecase", link: "#ai-forecast" },
    { name: "Videos", link: "#videos" },
    { name: "Options", link: "#options" },
  ];

  let filteredMenuOptions: { name: string; link: string }[] = [];

  let navbarHeight = 125;

  function scrollToAnchor(anchorId: string) {
    const anchor = document.getElementById(anchorId.substring(1));
    if (anchor) {
      const scrollTop = anchor.getBoundingClientRect().top + window.scrollY;
      const offset = navbarHeight ? navbarHeight : 0;
      window.scroll({
        top: scrollTop - offset,
        behavior: "smooth",
      });
    }
  }

  onMount(() => {
    // Filter menu options based on existing anchor IDs
    filteredMenuOptions = menuOptions.filter((option) =>
      document.getElementById(option.link.substring(1))
    );
  });
</script>

<div class="bg-base-100 sticky top-[60px] z-40">
  <div class="flex items-center gap-2">
    <div>
      <Icon icon="lucide:layout-dashboard" class="h-7 w-7" />
    </div>
    <div class="overflow-auto">
      <div class="flex items-center gap-1 py-2">
        {#each filteredMenuOptions as option}
          <a
            href="#"
            on:click={(event) => {
              event.preventDefault();
              scrollToAnchor(option.link);
            }}
            class="btn btn-sm btn-outline shadow"
          >
            <div>
              {option.name}
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>

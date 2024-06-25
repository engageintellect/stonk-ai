<h1 align="center">🔬 Add PicoCSS to Svelte</h1>

[![GitHub issues by-label](https://img.shields.io/github/issues/svelte-add/svelte-add/confirmed%20bug?color=%23DC2626)](https://github.com/svelte-add/svelte-add/issues?q=is%3Aopen+is%3Aissue+label%3A%22confirmed+bug%22)
[![GitHub issues by-label](https://img.shields.io/github/issues/svelte-add/svelte-add/support%20question?color=%23FACC15)](https://github.com/svelte-add/svelte-add/issues?q=is%3Aopen+is%3Aissue+label%3A%22support+question%22)

This is an adder for `svelte-add`; you should [read its `README`](https://github.com/svelte-add/svelte-add#readme) before continuing here.

## ➕ Adding PicoCSS

This adder's codename is `picocss`, and can be used like so:

```sh
npx svelte-add@latest picocss
```

### 🏞 Supported environments

This adder supports SvelteKit and Vite-powered Svelte apps (all the environments `svelte-add` currently supports).

### ⚙️ Options

This adder doesn't take any options of its own.

## 🛠 Using PicoCSS

After the adder runs,

- You can use Pico CSS classes like `container` or `grid` in the markup (components, routes, `app.html`).

- You can [customize your Pico CSS theme with variables](https://picocss.com/docs/customization.html) like `$primary` in `src/variables.scss`.

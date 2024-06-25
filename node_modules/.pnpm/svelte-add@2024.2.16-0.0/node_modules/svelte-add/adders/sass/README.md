<h1 align="center">🕶 Add SASS to Svelte</h1>

[![GitHub issues by-label](https://img.shields.io/github/issues/svelte-add/svelte-add/confirmed%20bug?color=%23DC2626)](https://github.com/svelte-add/svelte-add/issues?q=is%3Aopen+is%3Aissue+label%3A%22confirmed+bug%22)
[![GitHub issues by-label](https://img.shields.io/github/issues/svelte-add/svelte-add/support%20question?color=%23FACC15)](https://github.com/svelte-add/svelte-add/issues?q=is%3Aopen+is%3Aissue+label%3A%22support+question%22)

This is an adder for `svelte-add`; you should [read its `README`](https://github.com/svelte-add/svelte-add#readme) before continuing here.

## ➕ Adding SASS

This adder's codename is `sass`, and can be used like so:

```sh
npx svelte-add@latest sass
```

### 🏞 Supported environments

This adder supports SvelteKit and Vite-powered Svelte apps (all the environments `svelte-add` currently supports).

### ⚙️ Options

This adder doesn't take any options of its own.

## 🛠 Using SASS

After the adder runs,

- You can write SASS syntax in the `style lang="sass"` blocks in Svelte files.

- You can write SASS syntax in the `src/variables.sass` file.

  Variables and mixins written here are automatically available to all other SASS files and `style lang="sass"` blocks in Svelte files without needing to import this file.

- You can write SASS syntax in the `src/app.sass` file.

  This is your global stylesheet because it will be active on every page of your site.

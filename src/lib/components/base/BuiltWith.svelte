<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import Icon from '@iconify/svelte';
</script>

<div class="sm:card sm:bg-base-100 sm:shadow-xl">
	<div class="sm:card-body py-10">
		<div
			class="text-primary text-center text-xl font-thin drop-shadow transition-all duration-300 sm:text-2xl lg:text-3xl"
		>
			Built using the best technologies available.
		</div>

		<div
			in:slide={{ delay: 0, duration: 500, axis: 'x' }}
			class="flex w-full items-center gap-5 overflow-auto py-5"
		>
			<a
				href="https://svelte.dev"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<Icon icon="teenyicons:svelte-outline" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Svelte</div>
			</a>
			<a
				href="https://typescriptlang.org"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<Icon icon="teenyicons:typescript-outline" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">TypeScript</div>
			</a>

			<a
				href="https://tailwindcss.com"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<Icon icon="teenyicons:tailwind-outline" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">TailwindCSS</div>
			</a>

			<a
				href="https://openai.com"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<Icon icon="simple-icons:openai" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">OpenAI</div>
			</a>
			<a
				href="https://tensorflow.org"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<Icon icon="cib:tensorflow" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">TensorFlow</div>
			</a>
			<a
				href="https://python.org"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<Icon icon="teenyicons:python-outline" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Python</div>
			</a>

			<a href="https://numpy.com" target="_blank" class="flex flex-col items-center justify-center">
				<Icon icon="simple-icons:numpy" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Numpy</div>
			</a>

			<a
				href="https://fastapi.tiangolo.com"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<Icon icon="simple-icons:fastapi" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">FastAPI</div>
			</a>

			<a
				href="https://youtube.com"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<Icon icon="teenyicons:youtube-outline" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">YouTube</div>
			</a>

			<a href="https://nginx.com" target="_blank" class="flex flex-col items-center justify-center">
				<Icon icon="simple-icons:nginx" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Nginx</div>
			</a>
			<a
				href="https://vercel.com"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<Icon icon="simple-icons:vercel" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Vercel</div>
			</a>

			<a
				href="https://ubuntu.org"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<Icon icon="simple-icons:ubuntu" class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Ubuntu</div>
			</a>
		</div>
	</div>
</div>

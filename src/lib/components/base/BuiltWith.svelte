<script lang="ts">
	import SvelteIcon from 'virtual:icons/teenyicons/svelte-outline';
	import OpenAiIcon from 'virtual:icons/simple-icons/openai';
	import TensorFlowIcon from 'virtual:icons/cib/tensorflow';
	import VercelIcon from 'virtual:icons/simple-icons/vercel';
	import FastApiIcon from 'virtual:icons/simple-icons/fastapi';
	import NginxIcon from 'virtual:icons/simple-icons/nginx';
	import PythonIcon from 'virtual:icons/teenyicons/python-outline';
	import NumpyIcon from 'virtual:icons/simple-icons/numpy';
	import TailwindIcon from 'virtual:icons/teenyicons/tailwind-outline';
	import UbuntuIcon from 'virtual:icons/simple-icons/ubuntu';
	import TypeScriptIcon from 'virtual:icons/teenyicons/typescript-outline';
	import YouTubeIcon from 'virtual:icons/teenyicons/youtube-outline';
</script>

<div class="sm:card sm:bg-base-100 sm:shadow-xl">
	<div class="sm:card-body py-10">
		<div class="text-primary text-center text-2xl font-thin sm:text-3xl">
			Built using the best technologies available.
		</div>

		<div class="flex w-full items-center gap-5 overflow-auto py-5">
			<a
				href="https://svelte.dev"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<SvelteIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Svelte</div>
			</a>
			<a
				href="https://typescriptlang.org"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<TypeScriptIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">TypeScript</div>
			</a>

			<a
				href="https://tailwindcss.com"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<TailwindIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">TailwindCSS</div>
			</a>

			<a
				href="https://openai.com"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<OpenAiIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">OpenAI</div>
			</a>
			<a
				href="https://tensorflow.org"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<TensorFlowIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">TensorFlow</div>
			</a>
			<a
				href="https://python.org"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<PythonIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Python</div>
			</a>

			<a href="https://numpy.com" target="_blank" class="flex flex-col items-center justify-center">
				<NumpyIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Numpy</div>
			</a>

			<a
				href="https://fastapi.tiangolo.com"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<FastApiIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">FastAPI</div>
			</a>

			<a
				href="https://youtube.com"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<YouTubeIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">YouTube</div>
			</a>

			<a href="https://nginx.com" target="_blank" class="flex flex-col items-center justify-center">
				<NginxIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Nginx</div>
			</a>
			<a
				href="https://vercel.com"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<VercelIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Vercel</div>
			</a>

			<a
				href="https://ubuntu.org"
				target="_blank"
				class="flex flex-col items-center justify-center"
			>
				<UbuntuIcon class="text-primary h-20 w-20 p-2" />
				<div class="text-xl font-thin">Ubuntu</div>
			</a>
		</div>
	</div>
</div>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { Settings } from 'lucide-svelte';
	import Dumbbell from 'lucide-svelte/icons/dumbbell';
	import Repeat from 'lucide-svelte/icons/repeat';
	import Menu from 'lucide-svelte/icons/menu';
	import { navigating, page } from '$app/state';
	import Logo from './Logo.svelte';
	import logoHorizontalWEBP from '$lib/assets/logo-horizontal.webp';
	import { training_session_templates_path } from '$lib/domain/training_session_templates/routes';

	let open = $state(false);
	function onGoto() {
		open = false;
	}
</script>

<div
	class="flex min-h-fit flex-shrink flex-row justify-between border-b border-gray-100 bg-white dark:border-gray-900 dark:bg-gray-800"
>
	<div class="ms-2 flex flex-shrink flex-row items-center justify-center">
		<a class="flex flex-row items-center justify-center" href={`${base}/`}>
			<span class="inline-block h-8">
				<Logo />
			</span>
			<img
				class="my-1 ms-2 inline-block h-6 max-sm:hidden"
				src={logoHorizontalWEBP}
				alt="DuckDuckFit"
			/>
		</a>
		{#await navigating.complete}
			<div class="mr-2 flex flex-row justify-center">
				<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
			</div>
		{/await}
	</div>
	<div class="me-2 flex flex-shrink flex-row">
		<div class="m-1 flex flex-col content-center justify-center">
			<Dropdown bind:open>
				{#snippet button()}
					<button class="btn primary icon flex">
						<Menu />
					</button>
				{/snippet}

				<a
					href={`${base}/workouts`}
					class={{
						'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
						'bg-black/10': page.route.id === '/(initted)/workouts'
					}}
					onclick={onGoto}
				>
					<Dumbbell /><span class="ms-4">{m.workouts_title()}</span>
				</a>

				<a
					href={training_session_templates_path()}
					class={{
						'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
						'bg-black/10': page.route.id === training_session_templates_path()
					}}
					onclick={onGoto}
				>
					<Repeat /><span class="ms-4">{m.training_session_templates_title()}</span>
				</a>

				<a
					href={`${base}/settings/profile`}
					class={{
						'default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600': true,
						'bg-black/10': page.route.id?.startsWith('/(initted)/settings')
					}}
					onclick={onGoto}
				>
					<Settings /><span class="ms-4">{m.settings_title()}</span>
				</a>
			</Dropdown>
		</div>
	</div>
</div>

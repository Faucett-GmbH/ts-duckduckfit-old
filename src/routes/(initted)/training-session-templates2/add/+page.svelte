<script lang="ts" module>
	export interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import type { PageData } from './$types';
	import { base } from '$app/paths';
	import EditWorkoutTemplate from '$lib/components/workout/edit/EditWorkoutTemplate.svelte';
	import { training_session_templates_path } from '$lib/domain/training_session_templates/routes';

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>{m.training_session_templates_add_title()}</title>
</svelte:head>

<div class="container mx-auto p-4">
	<div class="card flex flex-col">
		<div class="flex flex-row justify-between">
			<div class="flex flex-row items-center">
				<a class="btn icon sm" href={training_session_templates_path()}>
					<ArrowLeft />
				</a>
				<h3 class="m-0 ms-2">{m.training_session_templates_add_title()}</h3>
			</div>
		</div>
		<div class="flex flex-col">
			<EditWorkoutTemplate />
		</div>
	</div>
</div>

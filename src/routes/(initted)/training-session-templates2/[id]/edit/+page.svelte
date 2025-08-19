<script lang="ts" module>
	interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import EditWorkoutTemplate from '$lib/components/workout/edit/EditWorkoutTemplate.svelte';
	import { base } from '$app/paths';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import type { PageData } from './$types';
	import { m } from '$lib/paraglide/messages';
	import { findTranslation } from '$lib/util';
	import { training_session_templates_path } from '$lib/domain/training_session_templates/routes';

	let { data }: Props = $props();

	let translation = $derived(findTranslation(data.workoutTemplate.translations));
</script>

<svelte:head>
	<title>{translation?.name}</title>
</svelte:head>

<div class="flex flex-grow flex-col overflow-x-hidden overflow-y-auto">
	<div class="flex w-full flex-grow flex-col sm:container sm:mx-auto">
		<div class="mt-4 mb-16">
			<div class="flex flex-shrink flex-row">
				<a class="flex flex-shrink flex-row" href={training_session_templates_path()}>
					<ChevronLeft />
					{m.workouts_back()}
				</a>
			</div>
			<div class="flex flex-grow flex-col">
				<div class="card flex flex-shrink flex-col">
					<EditWorkoutTemplate
						bind:exerciseByGuid={data.exerciseByGuid}
						workoutTemplateId={data.workoutTemplateId}
						workoutTemplate={data.workoutTemplate}
					/>
				</div>
			</div>
		</div>
	</div>
</div>

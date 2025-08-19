<script lang="ts" module>
	export interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Plus from 'lucide-svelte/icons/plus';
	import type { PageData } from './$types';
	import { base } from '$app/paths';
	import { getWorkoutTemplates, type WorkoutTemplate } from '$lib/state/workoutTemplates.svelte';
	import WorkoutTemplateComponent from '$lib/components/workout/WorkoutTemplate.svelte';
	import type { AutomergeDocumentId } from '$lib/repo';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { getExerciseByGuid } from '$lib/state/exercises.svelte';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import {
		add_training_session_templates_path,
		start_training_session_from_training_session_template_path
	} from '$lib/domain/training_session_templates/routes';

	let offset = $state(0);
	let limit = $state(10);
	let workoutTemplates = $state<
		[key: AutomergeDocumentId<WorkoutTemplate>, value: WorkoutTemplate][]
	>([]);
	let exerciseByGuid = $state<{ [exerciseGuid: string]: Exercise }>({});

	$effect(() => {
		getWorkoutTemplates(offset, limit).then(async (newWorkoutTemplates) => {
			workoutTemplates.push(...newWorkoutTemplates);
			const exercisGuids = newWorkoutTemplates.flatMap(([_, workoutTemplate]) =>
				workoutTemplate.setGroupTemplates.flatMap((setGroupTemplate) =>
					setGroupTemplate.setTemplates.map((setTemplate) => setTemplate.exerciseGuid)
				)
			);
			const uniqueExercisGuids = [...new Set(exercisGuids)];
			for (const exercise of await Promise.all(uniqueExercisGuids.map(getExerciseByGuid))) {
				if (exercise) {
					exerciseByGuid[exercise.guid] = exercise;
				}
			}
		});
	});

	function createOnDelete(
		workoutTemplateId: AutomergeDocumentId<WorkoutTemplate>,
		workoutTemplate: WorkoutTemplate
	) {
		return async () => {
			const index = workoutTemplates.findIndex(([id]) => id === workoutTemplateId);
			if (index !== -1) {
				workoutTemplates.splice(index, 1);
			}
		};
	}
</script>

<svelte:head>
	<title>{m.training_session_templates_title()}</title>
</svelte:head>

<div class="flex flex-grow flex-col overflow-x-hidden overflow-y-auto">
	<div class="container mx-auto p-4">
		<div class="card flex flex-col">
			<div class="flex flex-row justify-between">
				<h3 class="m-0">{m.training_session_templates_title()}</h3>
				<div class="flex items-center justify-center">
					<a class="btn success icon sm" href={add_training_session_templates_path()}>
						<Plus />
					</a>
				</div>
			</div>
			<hr />
			<div class="flex flex-col">
				{#each workoutTemplates as [workoutTemplateId, workoutTemplate] (workoutTemplateId)}
					<div class="mb-4 flex flex-grow flex-col">
						<div class="flex flex-shrink flex-col">
							<WorkoutTemplateComponent
								{workoutTemplateId}
								{workoutTemplate}
								bind:exerciseByGuid
								onDelete={createOnDelete(workoutTemplateId, workoutTemplate)}
							/>
							<div class="mt-2 flex flex-row justify-center">
								<a
									class="btn primary flex flex-row justify-center max-sm:w-full"
									href={start_training_session_from_training_session_template_path(
										workoutTemplateId
									)}
								>
									{m.workouts_start_title()}
									<ChevronRight />
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

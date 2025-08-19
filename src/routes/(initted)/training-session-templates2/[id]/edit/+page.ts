import { getWorkoutTemplateById, type WorkoutTemplate } from '$lib/state/workoutTemplates.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { AutomergeDocumentId } from '$lib/repo';
import type { Exercise } from '$lib/state/exerciseTypes';
import { getExerciseByGuid } from '$lib/state/exercises.svelte';

export const prerender = false;

export const load: PageLoad = async (event) => {
	await event.parent();
	const workoutTemplateId = event.params.id as unknown as AutomergeDocumentId<WorkoutTemplate>;
	const workoutTemplate = await getWorkoutTemplateById(workoutTemplateId);
	if (!workoutTemplate) {
		error(404);
	}
	const exerciseGuids = new Set<string>();
	for (const sgt of workoutTemplate.setGroupTemplates) {
		for (const st of sgt.setTemplates) {
			exerciseGuids.add(st.exerciseGuid);
		}
	}
	const exerciseByGuid = (await Promise.all([...exerciseGuids].map(getExerciseByGuid))).reduce(
		(exercises, exercise) => {
			if (exercise) {
				exercises[exercise.guid] = exercise;
			}
			return exercises;
		},
		{} as { [id: string]: Exercise }
	);
	return {
		referrer: event.url.searchParams.get('referrer'),
		exerciseByGuid,
		workoutTemplateId,
		workoutTemplate
	};
};

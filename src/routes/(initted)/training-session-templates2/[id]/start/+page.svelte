<script lang="ts" module>
	function getFirstIncompleteSet(workout: Workout) {
		for (let setGroupIndex = 0; setGroupIndex < workout.setGroups.length; setGroupIndex++) {
			const setGroup = workout.setGroups[setGroupIndex];
			for (let setIndex = 0; setIndex < setGroup.sets.length; setIndex++) {
				const set = setGroup.sets[setIndex];
				if (!set.status) {
					return [setGroupIndex, setGroup, setIndex, set] as const;
				}
			}
		}
		let setGroup = workout.setGroups[0];
		let set = setGroup.sets[0];
		return [0, setGroup, 0, set] as const;
	}

	interface Props {
		data: PageData;
	}
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import type { PageData } from './$types';
	import WorkoutTemplate from '$lib/components/workout/WorkoutTemplate.svelte';
	import { goto } from '$app/navigation';
	import { handleError } from '$lib/error';
	import { m } from '$lib/paraglide/messages';
	import { findTranslation } from '$lib/util';
	import { upsertWorkout, type Workout } from '$lib/state/workouts.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import {
		start_training_session_from_training_session_template_path,
		training_session_templates_path
	} from '$lib/domain/training_session_templates/routes';

	let { data }: Props = $props();

	async function onDelete() {
		await goto(training_session_templates_path());
	}

	let firstSet = $derived(data.workoutTemplate.setGroupTemplates[0]?.setTemplates[0]);
	let firstSetTranslation = $derived.by(() => {
		const exercise = data.exerciseByGuid[firstSet.exerciseGuid];
		if (!exercise) {
			return null;
		}
		return findTranslation(exercise.translations);
	});

	let beginning = $state(false);
	async function onBegin() {
		try {
			beginning = true;
			const workoutId = await upsertWorkout({
				...data.workoutTemplate,
				workoutTemplateId: data.workoutTemplateId,
				notes: [],
				durationInSeconds: null,
				startedAt: new Date(),
				completedAt: null,
				setGroups: data.workoutTemplate.setGroupTemplates.map((sgt) => ({
					id: sgt.id,
					setGroupType: sgt.setGroupType,
					sets: sgt.setTemplates.map((st) => ({
						...st,
						attemptedDistanceInMeters: st.distanceInMeters ?? null,
						attemptedRateOfPerceivedExertion: st.rateOfPerceivedExertion ?? null,
						attemptedReps: st.reps ?? st.repRangeLow ?? st.repRangeHigh ?? null,
						attemptedRepsInReserve: st.repsInReserve ?? null,
						attemptedTimeInSeconds: st.timeInSeconds ?? null,
						attemptedWeightInKilograms: st.weightInKilograms ?? null,
						durationInSeconds: null,
						status: null,
						notes: [],
						startedAt: new Date(),
						completedAt: null
					}))
				})),
				updatedAt: new Date(),
				createdAt: new Date()
			});
			await goto(`${base}/workouts/${workoutId}/workout`);
		} catch (error) {
			await handleError(error);
		} finally {
			beginning = false;
		}
	}
</script>

<svelte:head>
	<title
		>{m.workouts_start_title()}: {findTranslation(data.workoutTemplate.translations).name}</title
	>
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
					<WorkoutTemplate
						workoutTemplateId={data.workoutTemplateId}
						workoutTemplate={data.workoutTemplate}
						bind:exerciseByGuid={data.exerciseByGuid}
						editReferrer={start_training_session_from_training_session_template_path(
							data.workoutTemplateId
						)}
						{onDelete}
					/>
					<div class="mt-2 flex flex-row justify-center">
						{#if data.workout}
							{@const duration = data.workout.durationInSeconds || 0}
							{@const [setGroupIndex, setGroup, setIndex, set] = getFirstIncompleteSet(
								data.workout
							)}
							{@const exercise = data.exerciseByGuid[set.exerciseGuid]}
							{@const translation = exercise ? findTranslation(exercise.translations) : undefined}
							<a
								class="btn primary flex flex-row justify-center max-sm:w-full"
								href={`${base}/workouts/${data.workoutId}/workout?d=${duration}&sg=${setGroupIndex}&s=${setIndex}`}
							>
								{m.workouts_workout_continue()}
								{#if translation}
									<div class="badge dark ms-2">
										{translation.name}
									</div>
								{/if}
								<ChevronRight />
							</a>
						{:else}
							<button
								class="btn primary flex flex-row justify-center max-sm:w-full"
								onclick={onBegin}
								disabled={beginning}
							>
								{#if beginning}<div class="mr-2 flex flex-row justify-center">
										<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
									</div>{/if}
								{m.workouts_workout_begin()}
								{#if firstSetTranslation}
									<div class="badge dark ms-2">
										{firstSetTranslation.name}
									</div>
								{/if}
								<ChevronRight />
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

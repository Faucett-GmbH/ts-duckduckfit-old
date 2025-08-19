<script lang="ts" module>
	export interface WorkoutTemplateProps {
		workoutTemplateId: AutomergeDocumentId<WorkoutTemplate>;
		workoutTemplate: WorkoutTemplate;
		exerciseByGuid: { [exerciseGuid: string]: Exercise };
		editReferrer?: string;
		onDelete?(): Promise<void>;
	}
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import Trash from 'lucide-svelte/icons/trash';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Modal from '../Modal.svelte';
	import { handleError } from '$lib/error';
	import SetAmounts from './SetAmounts.svelte';
	import SetTypeComponent from './SetType.svelte';
	import { getRealSetPosition } from './util';
	import { deleteWorkoutTemplate, type WorkoutTemplate } from '$lib/state/workoutTemplates.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { AutomergeDocumentId } from '$lib/repo';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { findTranslation } from '$lib/util';
	import { edit_training_session_templates_path } from '$lib/domain/training_session_templates/routes';

	let {
		workoutTemplateId,
		workoutTemplate,
		exerciseByGuid = $bindable(),
		editReferrer,
		onDelete
	}: WorkoutTemplateProps = $props();

	async function onDeleteInternal() {
		try {
			await deleteWorkoutTemplate(workoutTemplateId);
			deleteOpen = false;
			if (onDelete) {
				await onDelete();
			}
		} catch (error) {
			await handleError(error);
		}
	}
	let deleteOpen = $state(false);
	function onOpenDelete() {
		deleteOpen = true;
	}
</script>

<div data-component="WorkoutTemplate">
	<div class="flex flex-row flex-wrap items-center justify-between">
		<h3 class="m-0">{findTranslation(workoutTemplate.translations)?.name}</h3>
		<div class="flex flex-row">
			<button class="btn danger icon me-2" onclick={onOpenDelete}><Trash /></button>
			<a class="btn primary icon" href={edit_training_session_templates_path(workoutTemplateId)}
				><Pencil /></a
			>
		</div>
	</div>

	<div class="flex flex-col">
		{#each workoutTemplate.setGroupTemplates as setGroupTemplate}
			<div class="mb-4 flex flex-col">
				<div class="mb-2 flex flex-row">
					<div
						class="badge"
						class:primary={setGroupTemplate.setGroupType === 'straight'}
						class:swamp-green={setGroupTemplate.setGroupType === 'circuit'}
						class:winter-hazel={setGroupTemplate.setGroupType === 'superset'}
					>
						{setGroupTemplate.setGroupType}
					</div>
				</div>
				<div class="flex flex-row">
					<div
						class="me-2 flex w-2 flex-shrink flex-col rounded-lg border"
						class:bg-pear-300={setGroupTemplate.setGroupType === 'straight'}
						class:bg-swamp-green-300={setGroupTemplate.setGroupType === 'circuit'}
						class:bg-winter-hazel-300={setGroupTemplate.setGroupType === 'superset'}
						class:border-pear-500={setGroupTemplate.setGroupType === 'straight'}
						class:border-swamp-green-500={setGroupTemplate.setGroupType === 'circuit'}
						class:border-winter-hazel-500={setGroupTemplate.setGroupType === 'superset'}
					></div>
					<div class="flex flex-grow flex-col rounded-lg">
						{#each setGroupTemplate.setTemplates as setTemplate, index}
							{@const position = getRealSetPosition(
								setGroupTemplate.setTemplates,
								setTemplate,
								index
							)}
							{@const exercise = exerciseByGuid[setTemplate.exerciseGuid]}
							{@const exerciseTranslation = findTranslation(exercise?.translations ?? [])}
							<div
								class={{
									'flex flex-row justify-between bg-black p-1': true,
									'bg-black/0': index % 2 === 0,
									'bg-black/5': index % 2 === 1
								}}
							>
								<div class="me-2 flex flex-shrink flex-row">
									<div class="me-2 flex flex-col justify-center">
										<SetTypeComponent setType={setTemplate.setType} {position} />
									</div>
									<div class="h-8 min-h-8 w-8 min-w-8 rounded-full bg-gray-600 max-sm:hidden"></div>
									<p class="ms-2 mb-0">
										{exerciseTranslation?.name ?? ''}
									</p>
								</div>
								<div class="flex flex-shrink flex-col justify-center">
									{#if exercise}<SetAmounts execution={exercise.execution} set={setTemplate} />{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<Modal bind:open={deleteOpen}>
	{#snippet title()}
		<h5>
			{m.workouts_template_delete_title({
				name: findTranslation(workoutTemplate.translations).name
			})}
		</h5>
	{/snippet}
	<p>{m.workouts_template_delete_body()}</p>
	<div class="flex flex-row justify-end">
		<button class="btn danger" onclick={onDeleteInternal}>
			{m.workouts_template_delete_submit()}
		</button>
	</div>
</Modal>

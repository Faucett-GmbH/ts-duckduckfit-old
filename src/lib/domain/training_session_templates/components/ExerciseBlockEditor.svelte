<script lang="ts" module>
	export interface ExerciseBlockEditorProps {
		block: ExerciseBlockTemplate;
		errors?: Record<string, string>;
		onAddSet?: (blockId: string) => void;
		onRemoveSet?: (blockId: string, setId: string) => void;
	}
</script>

<script lang="ts">
	import SetTemplateRow from './SetTemplateRow.svelte';
	import type {
		ExerciseBlockTemplate,
		SetTemplate,
		ExerciseRef
	} from '$lib/domain/training_session_templates/types';

	let {
		block = $bindable(),
		errors = {},
		onAddSet,
		onRemoveSet
	}: ExerciseBlockEditorProps = $props();

	function addSet() {
		onAddSet?.(block.id);
	}
	function removeSet(id: string) {
		onRemoveSet?.(block.id, id);
	}

	function onExercisesInput(e: Event) {
		// Simple comma-separated editor for exercise names (replace with real selector)
		const raw = (e.target as HTMLInputElement).value;
		const names = raw
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);
		// keep existing ids when possible, otherwise new
		block.exercises = names.map((name, i) =>
			block.exercises[i]?.name === name ? block.exercises[i] : { guid: crypto.randomUUID(), name }
		);
		block.blockType =
			block.exercises.length === 1
				? 'standard'
				: block.exercises.length === 2
					? 'superset'
					: 'circuit';
	}
</script>

<div class="rounded-2xl border p-3">
	<div class="mb-2 flex gap-2">
		<input
			class="flex-1 rounded-xl border px-2 py-1"
			placeholder="Exercise names (comma separated)"
			value={block.exercises.map((e) => e.name).join(', ')}
			oninput={onExercisesInput}
		/>
		<span class="inline-flex items-center rounded-xl border px-2 text-xs text-zinc-600"
			>{block.blockType}</span
		>
	</div>

	<table class="w-full text-sm">
		<thead>
			<tr class="text-left text-zinc-500">
				<th class="px-2 py-1">#</th>
				<th class="px-2 py-1">Reps</th>
				<th class="px-2 py-1">Kg</th>
				<th class="px-2 py-1">RPE</th>
				<th class="px-2 py-1">Type</th>
				<th class="px-2 py-1">Notes</th>
				<th class="px-2 py-1"></th>
			</tr>
		</thead>
		<tbody>
			{#each block.setTemplates as set, i}
				<SetTemplateRow index={i} bind:model={block.sets[i]} {errors} onRemove={removeSet} />
			{/each}
		</tbody>
	</table>
	<div class="mt-2">
		<button
			class="rounded-xl border px-3 py-1 hover:bg-zinc-100"
			onclick={addSet}
			onkeydown={(e) => {
				if (e.key === 'Enter') {
					addSet();
				}
			}}>+ Add set (Enter)</button
		>
	</div>
</div>

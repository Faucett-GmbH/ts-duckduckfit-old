<script lang="ts" module>
	export interface SetTemplateProps {
		exercises: Exercise[];
		value: SetTemplate;
		position: number;
		onSave?: (v: SetTemplate) => void;
	}
</script>

<script lang="ts">
	import NumericField from '$lib/domain/core/Components/NumericField.svelte';
	import { Settings2 } from 'lucide-svelte';

	import type { SetType, SetTemplate, Exercise } from '../types';
	import Modal from '$lib/components/Modal.svelte';
	import { setTemplateSchema } from '../schemas';

	let { exercises, value = $bindable(), position, onSave }: SetTemplateProps = $props();

	let editNoteOpen = $state(false);

	function onCloseNoteEdit() {
		editNoteOpen = false;
	}

	function onEditNotes() {
		editNoteOpen = true;
	}
</script>

<tr data-component="SetTemplateRow" class="bg-white">
	<!-- Set Position -->
	<td class="position px-2 py-1 text-sm">
		<span>{position}</span>
	</td>

	<!-- Set Type -->
	<td class="setType px-2 py-1">
		<select class="mt-1 w-full rounded border-gray-300" value={value.setType}>
			<option value="warm_up">Warm Up</option>
			<option value="working_set">Working Set</option>
		</select>
	</td>

	<!-- Target Weight -->
	<td class="targetWeight px-2 py-1">
		<NumericField bind:value={value.targetWeight} min={0} step={0.125} />
	</td>

	<!-- Target Reps -->
	<td class="targetReps px-2 py-1">
		<NumericField bind:value={value.targetReps} min={0} step={1} />
	</td>

	<!-- Details -->
	<td class="notes px-2 py-1">
		<button onclick={onEditNotes} class="cursor">
			<span>
				<Settings2 />
			</span>
		</button>
	</td>
</tr>

<Modal bind:open={editNoteOpen} onClose={onCloseNoteEdit}>
	{#snippet title()}
		<div class="text-center">
			<h5>
				<span>Attributes</span>
			</h5>
		</div>
	{/snippet}
	<div class="flex flex-grow flex-col">
		<div class="mb-4 flex flex-row">
			<div class="w-16">
				<label for="rpe">RPE</label>
			</div>
			<div class="w-full">
				<NumericField id="rpe" bind:value={value.targetRPE} min={1} max={10} step={1} />
			</div>
		</div>
		<div class="flex flex-row">
			<div class=" w-16">
				<label for="notes">Notes</label>
			</div>
			<div class="w-full">
				<textarea id="notes" class="w-full" bind:value={value.notes}></textarea>
			</div>
		</div>
	</div>
</Modal>

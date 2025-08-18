<script lang="ts">
	import NumericField from '$lib/domain/core/Components/NumericField.svelte';
	import SetTemplateRow from '$lib/domain/TrainingSessionTemplates/Components/SetTemplateRow.svelte';
	import type { SetTemplate, Exercise } from '$lib/domain/TrainingSessionTemplates/types';

	let exerciseGuids = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];

	let exercises: Exercise[] = [
		{ guid: exerciseGuids[0], name: 'back squat' },
		{ guid: exerciseGuids[1], name: 'snatch' },
		{ guid: exerciseGuids[2], name: 'power clean' }
	];

	let st: SetTemplate = $state({
		id: crypto.randomUUID(),
		exerciseGuid: exerciseGuids[0],
		setType: 'warm_up',
		position: 1,
		targetReps: 0,
		targetRPE: 1,
		targetWeight: 0,
		notes: ''
	});

	$effect(() => {
		console.log(st);
	});

	let x = 100;
</script>

<NumericField bind:value={x} min={0} max={500} step={0.25} />
<table>
	<thead>
		<tr>
			<th>
				<span>#</span>
			</th>
			<th>
				<span>Set Type</span>
			</th>
			<th>
				<span>Weight</span>
			</th>
			<th>
				<span>Reps</span>
			</th>
			<th>
				<span>Details</span>
			</th>
		</tr>
	</thead>
	<tbody>
		<SetTemplateRow bind:value={st} {exercises} position={1} />
	</tbody>
</table>

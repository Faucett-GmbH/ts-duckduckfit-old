<script lang="ts">
	import { addTrainingSessionTemplate } from '$lib/domain/training_session_templates/use_cases/AddTrainingSessionTemplate';
	import { AutomergeTrainingSessionTemplateRepository } from '$lib/infrastructure/automerge/AutomergeTrainingSessionTemplateRepository';
	import ExerciseBlockEditor from '$lib/domain/training_session_templates/components/ExerciseBlockEditor.svelte';
	import FieldError from '$lib/ui/validation/FieldError.svelte';
	import type {
		ExerciseBlockTemplate,
		SetTemplate,
		TrainingSessionTemplate
	} from '$lib/domain/training_session_templates/types';
	import { ulid } from 'ulid';

	const repo = new AutomergeTrainingSessionTemplateRepository(); // swap for app singleton

	type Errors = Record<string, string>;

	let title = $state('');
	let description = $state('');
	let errors: Errors = $state({});

	let blocks: ExerciseBlockTemplate[] = $state([newBlock()]);

	function newBlock(): ExerciseBlockTemplate {
		return {
			id: ulid(),
			blockType: 'standard',
			exercises: [{ guid: '', name: '' }],
			setTemplates: [newSet()]
		};
	}
	function newSet(): SetTemplate {
		return {
			id: ulid(),
			exerciseGuid: '',
			position: 0,
			targetReps: null,
			targetWeight: null,
			targetRPE: null,
			setType: 'working_set',
			notes: ''
		};
	}

	function addBlock() {
		blocks = [...blocks, newBlock()];
	}

	function removeSet(blockId: string, setId: string) {
		const b = blocks.find((b) => b.id === blockId);
		if (!b) {
			return;
		}
		b.setTemplates = b.setTemplates.filter((s) => s.id !== setId);
	}

	function addSet(blockId: string) {
		const b = blocks.find((b) => b.id === blockId);
		if (!b) {
			return;
		}
		b.setTemplates = [...b.setTemplates, newSet()];
	}

	function nowISO() {
		return new Date().toISOString();
	}

	async function save(event: SubmitEvent) {
		event.preventDefault();
		errors = {};

		for (const b of blocks) {
			const n = b.exercises.filter((e) => e.name.trim().length > 0).length;

			b.exercises = b.exercises.filter((e) => e.name.trim().length > 0);
			b.blockType = n <= 1 ? 'standard' : n === 2 ? 'superset' : 'circuit';

			if (b.setTemplates.length === 0) {
				b.setTemplates = [newSet()];
			}
		}

		const input = {
			id: ulid(),
			name: title.trim(),
			description: description?.trim() || undefined,
			blockTemplates: blocks,
			createdAt: nowISO(),
			updatedAt: nowISO()
		} satisfies Partial<TrainingSessionTemplate> as unknown;

		const result = await addTrainingSessionTemplate({ repo, now: nowISO, id: ulid }, input);
		if (!result.ok) {
			// flatten errors map
			const e: Errors = {};
			for (const iss of result.errors) {
				e[iss.path] = iss.message;
			}
			errors = e;
			return;
		}
		// TODO: navigate to detail page or list
		// e.g., goto(`/templates/${result.value.id}`)
		successFlash = `Saved “${result.value.name}”.`;
	}

	let successFlash = $state('');

	$effect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				save(e);
			}
		};
		addEventListener('keydown', onKey);
		return () => removeEventListener('keydown', onKey);
	});
</script>

<div class="mx-auto max-w-4xl p-4">
	<h1 class="mb-3 text-2xl font-semibold">Add Training Session Template</h1>
	{#if successFlash}
		<div class="mb-3 rounded-2xl border px-3 py-2 text-green-700">{successFlash}</div>
	{/if}
	<form class="space-y-4" onsubmit={save}>
		<div>
			<label class="mb-1 block text-sm font-medium" for="title">Title</label>
			<input
				id="title"
				class="w-full rounded-xl border px-3 py-2"
				bind:value={title}
				placeholder="e.g., Week A — Day 1: Squat & Bench"
			/>
			<FieldError forId="title" message={errors['title']} />
		</div>

		<div class="grid gap-3 md:grid-cols-2">
			<div>
				<label class="mb-1 block text-sm font-medium" for="desc">Description</label>
				<input
					id="desc"
					class="w-full rounded-xl border px-3 py-2"
					bind:value={description}
					placeholder="Optional description"
				/>
				<FieldError forId="desc" message={errors['description']} />
			</div>
		</div>

		<section class="space-y-3">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold">Exercise Blocks</h2>
				<button
					type="button"
					class="rounded-xl border px-3 py-1 hover:bg-zinc-100"
					onclick={addBlock}>+ Add block</button
				>
			</div>

			{#each blocks as block, i}
				<div class="rounded-2xl border p-3">
					<div class="mb-1 text-sm text-zinc-600">Block {i + 1}</div>
					<ExerciseBlockEditor
						bind:block={blocks[i]}
						{errors}
						onAddSet={addSet}
						onRemoveSet={removeSet}
					/>
					<FieldError forId={`block-${block.id}`} message={errors[`blocks.${i}`]} />
				</div>
			{/each}
			<FieldError forId="blocks" message={errors['blocks']} />
		</section>

		<div class="flex gap-2">
			<button class="rounded-2xl bg-zinc-900 px-4 py-2 text-white hover:bg-black" type="submit"
				>Save (Ctrl/Cmd+Enter)</button
			>
			<button
				class="rounded-2xl border px-4 py-2 hover:bg-zinc-100"
				type="button"
				onclick={() => {
					/* reset */ title = '';
					description = '';
					blocks = [newBlock()];
					errors = {};
					successFlash = '';
				}}>Reset</button
			>
		</div>
	</form>
</div>

<script lang="ts" module>
	import { create, test, enforce, only } from 'vest';

	export type WorkoutTemplateProps = {
		workoutTemplateId?: AutomergeDocumentId<WorkoutTemplate>;
		workoutTemplate?: WorkoutTemplate;
		exerciseByGuid?: { [guid: string]: Exercise };
	};

	const createSuite = () =>
		create((data: WorkoutTemplate, fields: string[]) => {
			only(fields);

			test('translations', m.errors_message_required(), () => {
				enforce(data.translations[0].name).isNotBlank();
			});
			test('setGroupTemplates', m.errors_message_required(), () => {
				enforce(data.setGroupTemplates?.length).greaterThan(0);
			});
		});
</script>

<script lang="ts">
	import classnames from 'vest/classnames';
	import { debounce } from '@aicacia/debounce';
	import { handleError } from '$lib/error';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import InputResults from '$lib/components/InputResults.svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import EditSetGroupTemplate from './EditSetGroupTemplate.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getId, unsafeId } from '$lib/util';
	import Sortable from '$lib/components/Sortable.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { AutomergeDocumentId } from '$lib/repo';
	import {
		upsertWorkoutTemplate,
		type SetGroupTemplate,
		type WorkoutTemplate,
		type WorkoutTemplateTranslation
	} from '$lib/state/workoutTemplates.svelte';
	import type { Exercise } from '$lib/state/exerciseTypes';
	import { getLocale } from '$lib/state/settings.svelte';
	import { training_session_templates_path } from '$lib/domain/training_session_templates/routes';

	let {
		workoutTemplateId,
		workoutTemplate = $bindable({
			translations: [
				{
					locale: getLocale(),
					name: '',
					description: null
				}
			],
			setGroupTemplates: [],
			updatedAt: new Date(),
			createdAt: new Date()
		}),
		exerciseByGuid = $bindable({})
	}: WorkoutTemplateProps = $props();
	let setGroupTemplatesValid: Array<boolean | undefined> = [];

	let valid: boolean | undefined = $state();
	let suite = $state(createSuite());
	let result = $state(suite.get());
	let loading = $state(false);
	let disabled = $derived(loading);
	let cn = $derived(
		classnames(result, {
			untested: 'untested',
			tested: 'tested',
			invalid: 'invalid',
			valid: 'valid',
			warning: 'warning'
		})
	);

	const fields = new Set<string>();
	const validate = debounce(
		() =>
			new Promise<boolean>((resolve) => {
				suite(workoutTemplate, Array.from(fields)).done((r) => {
					result = r;
					const newValid = result.isValid() && isSetGroupTemplatesValid();
					if (valid !== newValid) {
						valid = newValid;
					}
					resolve(valid);
				});
				fields.clear();
			}),
		300
	);
	function validateAll() {
		for (const field of Object.keys(workoutTemplate)) {
			fields.add(field as keyof WorkoutTemplate);
		}
		validate();
		return validate.flush();
	}
	function onTranslationChange(
		e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }
	) {
		const field = e.currentTarget.name as keyof WorkoutTemplateTranslation;
		workoutTemplate.translations[0][field] = e.currentTarget.value as never;
		fields.add(field);
		validate();
	}
	function createOnSetGroupTemplateChange(index: number) {
		return (params: SetGroupTemplate) => {
			const setGroupTemplates = workoutTemplate.setGroupTemplates.slice();
			setGroupTemplates[index] = params;
			workoutTemplate = {
				...workoutTemplate,
				setGroupTemplates
			};
			fields.add('setGroupTemplates');
			validate();
		};
	}
	function createOnSetGroupTemplateDelete(index: number) {
		return (_params: SetGroupTemplate) => {
			const setGroupTemplates = workoutTemplate.setGroupTemplates.slice();
			setGroupTemplates.splice(index, 1);
			workoutTemplate = {
				...workoutTemplate,
				setGroupTemplates
			};
			fields.add('setGroupTemplates');
			validate();
		};
	}
	function createOnSetGroupTemplateValid(index: number) {
		return (setGroupTemplateValid: boolean) => {
			const newSetGroupTemplatesValid = setGroupTemplatesValid.slice(
				0,
				workoutTemplate.setGroupTemplates.length
			);
			newSetGroupTemplatesValid[index] = setGroupTemplateValid;
			setGroupTemplatesValid = newSetGroupTemplatesValid;
			const newValid = result.isValid() && isSetGroupTemplatesValid();
			if (valid !== newValid) {
				valid = newValid;
			}
		};
	}

	async function onSubmit() {
		try {
			loading = true;
			if (await validateAll()) {
				await upsertWorkoutTemplate(
					{
						...workoutTemplate,
						setGroupTemplates: workoutTemplate.setGroupTemplates.map((setGroupTemplate) => ({
							...setGroupTemplate,
							setTemplates: setGroupTemplate.setTemplates.map((setTemplate) => {
								const newSetTemplate = { ...setTemplate };
								// @ts-expect-error
								delete newSetTemplate.exercise;
								return newSetTemplate;
							})
						}))
					},
					workoutTemplateId
				);
				await goto(training_session_templates_path());
			}
		} catch (error) {
			await handleError(error);
		} finally {
			loading = false;
		}
	}
	function isSetGroupTemplatesValid() {
		return setGroupTemplatesValid.every((valid) => valid === true);
	}

	function onAddSetGroup(e: Event) {
		e.stopPropagation();
		workoutTemplate = {
			...workoutTemplate,
			setGroupTemplates: [
				...workoutTemplate.setGroupTemplates,
				{
					id: unsafeId(),
					setGroupType: 'straight',
					setTemplates: []
				}
			]
		};
		fields.add('setGroupTemplates');
		validate();
	}

	function onMoveSetGroups(fromIndex: number, toIndex: number) {
		const setGroupTemplate = workoutTemplate.setGroupTemplates[fromIndex];
		const newSetGroupTemplates = workoutTemplate.setGroupTemplates.slice();
		newSetGroupTemplates.splice(fromIndex, 1);
		newSetGroupTemplates.splice(toIndex, 0, setGroupTemplate);
		workoutTemplate = { ...workoutTemplate, setGroupTemplates: newSetGroupTemplates };
	}

	onMount(() => {
		if (workoutTemplateId) {
			validateAll();
		}
	});
</script>

<div class="mb-2">
	<label for="name">{m.workouts_name_label()}</label>
	<input
		class="w-full {cn('name')}"
		type="text"
		name="name"
		placeholder={m.workouts_name_placeholder()}
		value={workoutTemplate.translations[0].name}
		oninput={onTranslationChange}
	/>
	<InputResults name="name" {result} />
</div>
<div class="mb-2">
	<label for="description">{m.workouts_description_label()}</label>
	<textarea
		class="w-full {cn('description')}"
		name="description"
		placeholder={m.workouts_description_placeholder()}
		value={workoutTemplate.translations[0].description || ''}
		oninput={onTranslationChange}
	></textarea>
	<InputResults name="description" {result} />
</div>
<div role="list">
	<Sortable
		id={`set-group-templates`}
		items={workoutTemplate.setGroupTemplates}
		getKey={getId}
		onMove={onMoveSetGroups}
	>
		{#snippet children({ item, index, ...props })}
			<EditSetGroupTemplate
				bind:exerciseByGuid
				setGroupTemplate={item}
				{index}
				{...props}
				oninput={createOnSetGroupTemplateChange(index)}
				ondelete={createOnSetGroupTemplateDelete(index)}
				onvalid={createOnSetGroupTemplateValid(index)}
			/>
		{/snippet}
	</Sortable>
</div>
<div class="flex flex-row items-center justify-center">
	<InputResults name="setGroupTemplates" {result} />
</div>
<div class="flex flex-row justify-between">
	<button class="btn success flex flex-row" onclick={onAddSetGroup}>
		<Plus />
		{m.workouts_set_group_add()}
	</button>
	<button class="btn primary flex flex-shrink" {disabled} onclick={onSubmit}>
		{#if loading}<div class="mr-2 flex flex-row justify-center">
				<div class="inline-block h-6 w-6 animate-spin"><LoaderCircle /></div>
			</div>{/if}
		{#if workoutTemplateId}{m.workouts_edit_submit()}{:else}{m.workouts_new_submit()}{/if}
	</button>
</div>

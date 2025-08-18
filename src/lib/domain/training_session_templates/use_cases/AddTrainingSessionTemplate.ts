import { trainingSessionTemplateSchema } from '$lib/domain/training_session_templates/schemas';
import type { TrainingSessionTemplate } from '$lib/domain/training_session_templates/types';
import type { ITrainingSessionTemplateRepository } from '$lib/domain/training_session_templates/ports/TrainingSessionTemplateRepository';

export interface AddTrainingSessionTemplateDeps {
  repo: ITrainingSessionTemplateRepository;
  now: () => string; // inject for testing
  id: () => string;  // uuid/uid generator (ulid instance)
}

export type AddTrainingSessionTemplateResult =
  | { ok: true; value: TrainingSessionTemplate }
  | { ok: false; errors: { path: string; message: string }[] };

export async function addTrainingSessionTemplate(
  deps: AddTrainingSessionTemplateDeps,
  input: unknown
): Promise<AddTrainingSessionTemplateResult> {

  const parsed = trainingSessionTemplateSchema.safeParse(input);

  if (!parsed.success) {

    const errors = parsed.error.issues.map((iss) => ({
      path: iss.path.join('.') || 'root',
      message: iss.message,
    }));

    return { ok: false, errors };
  }

  const now = deps.now();

  const newTrainingSessionTemplate = { ...parsed.data, createdAt: now, updatedAt: now };

  await deps.repo.save(newTrainingSessionTemplate);

  return {
    ok: true,
    value: newTrainingSessionTemplate
  };
}
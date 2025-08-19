import type { ITrainingSessionTemplateRepository } from '$lib/domain/training_session_templates/ports/TrainingSessionTemplateRepository';
import type { TrainingSessionTemplate } from '$lib/domain/training_session_templates/types';
import * as Automerge from '@automerge/automerge';

interface TrainingSessionTemplateDoc {
  trainingSessionTemplates: Record<string, TrainingSessionTemplate>
  [key: string]: unknown;
}


const initial: TrainingSessionTemplateDoc = {
  trainingSessionTemplates: {}
};


export class AutomergeTrainingSessionTemplateRepository implements ITrainingSessionTemplateRepository {
  #doc: Automerge.Doc<TrainingSessionTemplateDoc>;


  constructor(doc?: Automerge.Doc<TrainingSessionTemplateDoc>) {
    this.#doc = doc ?? Automerge.from<TrainingSessionTemplateDoc>(initial);
  }


  get doc() {
    return this.#doc;
  }

  async save(template: TrainingSessionTemplate): Promise<void> {
    this.#doc = Automerge.change(this.#doc, 'save template', (d) => {
      d.trainingSessionTemplates[template.id] = template;
    });
  }

  async find(id: string): Promise<TrainingSessionTemplate> {
    const template = this.#doc.trainingSessionTemplates[id];
    if (!template) {
      throw new Error(`TrainingSessionTemplate with id=${id} not found.`)
    }
    return template;
  }

  async findById(id: string): Promise<TrainingSessionTemplate | null> {
    return this.#doc.trainingSessionTemplates[id] ?? null;
  }


  async list(): Promise<TrainingSessionTemplate[]> {
    return Object.values(this.#doc.trainingSessionTemplates);
  }
}
import { z } from 'zod';
import { ZodIssueCode } from 'zod/v3';

export const uuid = z.string().min(1);

export const exerciseRefSchema = z.object({
  guid: uuid,
  name: z.string().min(1),
});

export const setTemplateSchema = z.object({
  id: uuid,
  exerciseGuid: uuid,
  position: z.number().int().nonnegative(),
  targetReps: z.number().int().positive().max(2000).nullable(),
  targetWeight: z.number().positive().max(2000).nullable(),
  targetRPE: z.number().min(1).max(10).nullable(),
  setType: z.enum(['warm_up', 'working_set']),
  notes: z.string().max(1000).optional(),
});



export const exerciseBlockTemplateSchema = z.object({
  id: uuid,
  blockType: z.enum(['standard', 'superset', 'circuit']),
  exercises: z.array(exerciseRefSchema).min(1),
  setTemplates: z.array(setTemplateSchema).min(1),
  notes: z.string().max(2000).optional(),
}).superRefine((val, ctx) => {
  if (val.blockType === 'standard' && val.exercises.length !== 1) {
    ctx.issues.push({
      code: ZodIssueCode.custom,
      message: 'Standard block must have exactly 1 exercise.',
      input: val
    });
  }
  if (val.blockType === 'superset' && val.exercises.length !== 2) {
    ctx.issues.push({
      code: ZodIssueCode.custom,
      message: 'Superset must have exactly 2 exercises.',
      input: val
    });
  }
  if (val.blockType === 'circuit' && val.exercises.length < 3) {
    ctx.issues.push({
      code: ZodIssueCode.custom,
      message: 'Circuit must have 3 or more exercises.',
      input: val
    });
  }
});

export const trainingSessionTemplateSchema = z.object({
  id: uuid,
  name: z.string().min(3).max(120),
  description: z.string().max(2000).optional(),
  blockTemplates: z.array(exerciseBlockTemplateSchema).min(1),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
});


export type SetTemplateInput = z.input<typeof setTemplateSchema>;
export type ExerciseBlockTemplateInput = z.input<typeof exerciseBlockTemplateSchema>;
export type TrainingSessionTemplateInput = z.input<typeof trainingSessionTemplateSchema>;
export type TrainingSessionTemplateDTO = z.output<typeof trainingSessionTemplateSchema>;

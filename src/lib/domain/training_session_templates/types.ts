// all this module cares about is the reference.
export type ExerciseRef = {
  guid: string
  name: string
}

export type SetType = "warm_up" | "working_set"

export type ExerciseBlockType = "standard" | "superset" | "circuit"

export type TrainingSessionTemplate = {
  id: string
  name: string
  description?: string
  blockTemplates: ExerciseBlockTemplate[]
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export type ExerciseBlockTemplate = {
  id: string
  blockType: ExerciseBlockType
  setTemplates: SetTemplate[]
  exercises: ExerciseRef[]
  notes?: string
}


export type SetTemplate = {
  id: string
  exerciseGuid: string
  position: number
  setType: SetType
  targetReps: number | null
  targetWeight: number | null
  targetRPE: number | null

  notes?: string
}
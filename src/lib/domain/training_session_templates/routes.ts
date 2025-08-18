

export const training_session_templates_path = () => "/training-session-templates"
export const add_training_session_templates_path = () => "/training-session-templates/add"
export const edit_training_session_templates_path = (id: string) => `/training-session-templates/${id}/edit`
export const start_training_session_from_training_session_template_path = (trainingSessionTemplateId: string) => `/training-session-templates/${trainingSessionTemplateId}/start`
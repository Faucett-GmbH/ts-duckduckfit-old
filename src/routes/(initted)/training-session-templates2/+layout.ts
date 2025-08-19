import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	const { currentUserDocument } = await event.parent();
	return {
		workoutTemplates: await currentUserDocument.workoutTemplates()
	};
};

const arrayToJSON = ({ modelList = [] }: { modelList: any[] }) => {
	const result: any[] = [];
	modelList.forEach(model => result.push(model.toJSON()));

	return result;
};

export const modelUtils = {
	arrayToJSON
};

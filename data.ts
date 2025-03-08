const getDataByPage = ({
	data = [],
	page = 1,
	itemsPerPage = 8
}: {
	data: any[];
	page: number;
	itemsPerPage: number;
}) => {
	const startId = (page - 1) * itemsPerPage;
	const endId = startId + itemsPerPage;
	const result = data.slice(startId, endId);

	return result;
};

const formDataToObject = ({ formData }: { formData: object }) => {
	const result = {};

	Object.keys(formData).map(key => {
		let value = (formData as any)[key];

		if (value === 'true') value = true;
		if (value === 'false') value = false;
		if (value === 'null') value = null;

		(result as any)[key] = value;
	});

	return result;
};

export const dataUtils = {
	getDataByPage,
	formDataToObject
};

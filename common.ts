import dayjs from 'dayjs';
import { configs } from '@/itm-constants';

export type TSortParam = string | number | Date | boolean | undefined | null;

const sortString = ({ a, b }: { a: string; b: string }) => {
	return a.toLowerCase().localeCompare(b.toLowerCase());
};

const sortNumber = ({ a, b }: { a: number; b: number }) => {
	return a - b;
};

const sortDateString = ({ a, b }: { a: string; b: string }) => {
	const dateA = dayjs(a, configs.dateFormats.vnDate);
	const dateB = dayjs(b, configs.dateFormats.vnDate);

	return dateA.isAfter(dateB) ? 1 : dateA.isBefore(dateB) ? -1 : 0;
};

const sortBoolean = ({ a, b }: { a: boolean; b: boolean }) => {
	return sortString({ a: a.toString(), b: b.toString() });
};

const sort = ({
	a = null,
	b = null,
	type = 'string'
}: {
	a: TSortParam;
	b: TSortParam;
	type?: 'string' | 'number' | 'dateString' | 'boolean';
}) => {
	if (a === null && b === null) return 0;
	if (a === null) return 1;
	if (b === null) return -1;

	switch (type) {
		case 'string':
			return sortString({ a: a as string, b: b as string });

		case 'number':
			return sortNumber({ a: a as number, b: b as number });
		case 'dateString':
			return sortDateString({ a: a as string, b: b as string });
		case 'boolean':
			return sortBoolean({ a: a as boolean, b: b as boolean });
		default:
			return sortString({ a: a as string, b: b as string });
	}
};

export const commonUtils = {
	sort
};

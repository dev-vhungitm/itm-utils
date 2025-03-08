import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { configs } from '@/itm-constants';
import { stringUtils } from './string';

import 'dayjs/locale/vi';
dayjs.extend(relativeTime);
dayjs.locale('vi');

function getTimeAgo({ date }: { date: string }) {
	try {
		const now = dayjs();
		const start = dayjs(date);
		let result = start.from(now);
		result = stringUtils.capitalizeFirstLetter({ string: result });

		return result;
	} catch {
		return '';
	}
}

const toVNDateTime = ({ dateString }: { dateString: string }) => {
	const result = dayjs(dateString).format(configs.dateFormats.vnDate);
	return result;
};

export const dateTimeUtils = {
	getTimeAgo,
	toVNDateTime
};

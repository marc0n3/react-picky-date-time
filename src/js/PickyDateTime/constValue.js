// GENERAL

const SIZE_RANGE = ['l', 'm', 's', 'xs'];

const LOCALE_RANGE = ['en-us', 'zh-cn','it-it'];

const DEFAULT_LACALE = 'en-us';

const DEFAULT_SIZE = 'm';

const LANG = {
	'en-us': {
		today: 'Today',
		reset: 'Reset',
		'reset-date': 'Reset Date',
		clear: 'Clear',
		now: 'Now'
	},
	'zh-cn': {
		today: '今天',
		reset: '重置',
		'reset-date': '重置日期',
		clear: '清零',
		now: '现在'
	},
	'it-it': {
		today: 'Oggi',
		reset: 'Reset',
		'reset-date': 'Resetta la data',
		clear: 'Pulisci',
		now: 'Ora'
	},
};

// CALENDAR

const PREV_TRANSITION = 'prev';
const NEXT_TRANSITION = 'next';

const SELECTOR_YEAR_SET_NUMBER = 5;

const WEEK_NAME = {
	'en-us': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	'zh-cn': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	'it-it': [ 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab','Dom']
};

const MONTH_NAME = {
	'en-us': [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	],
	'zh-cn': [
		'一月',
		'二月',
		'三月',
		'四月',
		'五月',
		'六月',
		'七月',
		'八月',
		'九月',
		'十月',
		'十一月',
		'十二月'
	],
	'it-it': [
		'Gennaio',
		'Febbraio',
		'Marzo',
		'Aprile',
		'Maggio',
		'Giugno',
		'Luglio',
		'Agosto',
		'Settembre',
		'Ottobre',
		'Novembre',
		'Dicembre'
	],
};

const POINTER_ROTATE = 0;

const WEEK_NUMBER = 7;

const getDaysArray = (year, month, locale = 'zh-cn') => {

	let prevMonth;
	let nextMonth;
	let prevYear;
	let nextYear;
	if (month == 12) {
		prevMonth = 11;
		nextMonth = 1;
		prevYear = year - 1;
		nextYear = year + 1;
	} else if (month == 1) {
		prevMonth = 12;
		nextMonth = 2;
		prevYear = year - 1;
		nextYear = year + 1;
	} else {
		prevMonth = month - 1;
		nextMonth = month + 1;
		prevYear = year;
		nextYear = year;
	}
	const date = new Date(year, month - 1, 1);
	const names = WEEK_NAME[locale];
	let prevMonthDate = null;
	let thisMonthDate = null;
	let nextMonthDate = null;

	let res = [];

	let startOffset = date.getDay();
	if (locale=="it-it") {
		// week begins monday
		startOffset= (startOffset+6)%7;
	}
	if (startOffset != 0) {
		prevMonthDate = getDaysListByMonth(prevYear, prevMonth, names, locale);
		for (
				let i = prevMonthDate.length - startOffset;
				i <= prevMonthDate.length - 1;
				i++
		) {
			res.push(prevMonthDate[i]);
		}
	}

	thisMonthDate = getDaysListByMonth(year, month, names, locale);
	res = [...res, ...thisMonthDate];

	let lastDay = thisMonthDate[thisMonthDate.length - 1].day;
	if (locale=="it-it") {
		// week begins monday
		lastDay= (lastDay+6)%7;
	}
	let endOffset = WEEK_NUMBER - lastDay - 1;
	if (endOffset != 0) {
		nextMonthDate = getDaysListByMonth(nextYear, nextMonth, names, locale);
		for (let i = 0; i <= endOffset - 1; i++) {
			res.push(nextMonthDate[i]);
		}
	}
	return res;
};

const getDaysListByMonth = (year, month) => {
	const date = new Date(year, month - 1, 1);
	let res = [];
	year = String(year);
	const monthName = formatDateString(month);
	while (date.getMonth() == month - 1) {
		const dayName = formatDateString(date.getDate());
		let item = {
			name: dayName,
			day: date.getDay(),
			month: monthName,
			year: year,
			value: `${year}-${monthName}-${dayName}`
		};
		res.push(item);
		date.setDate(date.getDate() + 1);
	}
	return res;
};

const formatDateString = (val) => {
	if (Number(val) < 10){
		return String('0' + Number(val));
	}
	return String(val);
}

const getYearSet = year => {
	let res = [];
	let itemNumber;
	let startOffset;
	let endOffset;
	if (SELECTOR_YEAR_SET_NUMBER % 2 == 1) {
		itemNumber = (SELECTOR_YEAR_SET_NUMBER - 1) / 2 + 1;
		startOffset = SELECTOR_YEAR_SET_NUMBER - itemNumber;
	} else {
		itemNumber = SELECTOR_YEAR_SET_NUMBER / 2 - 1;
		startOffset = itemNumber - 1;
	}

	endOffset = SELECTOR_YEAR_SET_NUMBER - itemNumber;

	for (let i = year - startOffset; i <= year - 1; i++) {
		res.push(i);
	}
	res.push(year);
	for (let i = 0; i <= endOffset - 1; i++) {
		year = year + 1;
		res.push(year);
	}
	return res;
};

// CLOCK

const R2D = 180 / Math.PI;

const SECOND_DEGREE_NUMBER = 6;
const MINUTE_DEGREE_NUMBER = 6;
const HOUR_DEGREE_NUMBER = 30;

const QUARTER = [0, 15, 30, 45];

const TIME_SELECTION_FIRST_CHAR_POS_LIST = [0, 3, 6];
const TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST = [1, 4, 7];
const TIME_SELECTION_SECOND_CHAR_POS_LIST = [1, 4, 7];
const TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST = [2, 5, 8];
const TIME_JUMP_CHAR_POS_LIST = [1, 4, 7];
const TIME_CURSOR_POSITION_OBJECT = {
	0: 'clockHandHour',
	1: 'clockHandHour',
	2: 'clockHandHour',
	3: 'clockHandMinute',
	4: 'clockHandMinute',
	5: 'clockHandMinute',
	6: 'clockHandSecond',
	7: 'clockHandSecond',
	8: 'clockHandSecond',
	9: 'meridiem',
	10: 'meridiem',
	11: 'meridiem'
};
const TIME_TYPE = [
	'clockHandHour',
	'clockHandMinute',
	'clockHandSecond',
	'meridiem'
];

let KEY_CODE = {
	'8': 'Backspace',
	'46': 'Delete',
	'38': 'ArrowUp',
	'37': 'ArrowLeft',
	'39': 'ArrowRight',
	'40': 'ArrowDown',
	'48': '0',
	'49': '1',
	'50': '2',
	'51': '3',
	'52': '4',
	'53': '5',
	'54': '6',
	'55': '7',
	'56': '8',
	'57': '9'
};

export {
	// GENERAL
	LANG,
	SIZE_RANGE,
	LOCALE_RANGE,
	DEFAULT_LACALE,
	DEFAULT_SIZE,
	// CALENDAR
	PREV_TRANSITION,
	NEXT_TRANSITION,
	SELECTOR_YEAR_SET_NUMBER,
	WEEK_NAME,
	MONTH_NAME,
	WEEK_NUMBER,
	POINTER_ROTATE,
	getDaysArray,
	getDaysListByMonth,
	getYearSet,
	formatDateString,
	// CLOCK
	R2D,
	SECOND_DEGREE_NUMBER,
	MINUTE_DEGREE_NUMBER,
	HOUR_DEGREE_NUMBER,
	QUARTER,
	TIME_SELECTION_FIRST_CHAR_POS_LIST,
	TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST,
	TIME_SELECTION_SECOND_CHAR_POS_LIST,
	TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST,
	TIME_JUMP_CHAR_POS_LIST,
	TIME_CURSOR_POSITION_OBJECT,
	TIME_TYPE,
	KEY_CODE
};

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// GENERAL

var SIZE_RANGE = ['l', 'm', 's', 'xs'];

var LOCALE_RANGE = ['en-us', 'zh-cn', 'it-it'];

var DEFAULT_LACALE = 'en-us';

var DEFAULT_SIZE = 'm';

var LANG = {
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
	}
};

// CALENDAR

var PREV_TRANSITION = 'prev';
var NEXT_TRANSITION = 'next';

var SELECTOR_YEAR_SET_NUMBER = 5;

var WEEK_NAME = {
	'en-us': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	'zh-cn': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	'it-it': ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
};

var MONTH_NAME = {
	'en-us': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	'zh-cn': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	'it-it': ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
};

var POINTER_ROTATE = 0;

var WEEK_NUMBER = 7;

var getDaysArray = function getDaysArray(year, month) {
	var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'zh-cn';


	var prevMonth = void 0;
	var nextMonth = void 0;
	var prevYear = void 0;
	var nextYear = void 0;
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
	var date = new Date(year, month - 1, 1);
	var names = WEEK_NAME[locale];
	var prevMonthDate = null;
	var thisMonthDate = null;
	var nextMonthDate = null;

	var res = [];

	var startOffset = date.getDay();
	if (locale == "it-it") {
		// week begins monday
		startOffset = (startOffset + 6) % 7;
	}
	if (startOffset != 0) {
		prevMonthDate = getDaysListByMonth(prevYear, prevMonth, names, locale);
		for (var i = prevMonthDate.length - startOffset; i <= prevMonthDate.length - 1; i++) {
			res.push(prevMonthDate[i]);
		}
	}

	thisMonthDate = getDaysListByMonth(year, month, names, locale);
	res = [].concat(_toConsumableArray(res), _toConsumableArray(thisMonthDate));

	var lastDay = thisMonthDate[thisMonthDate.length - 1].day;
	if (locale == "it-it") {
		// week begins monday
		lastDay = (lastDay + 6) % 7;
	}
	var endOffset = WEEK_NUMBER - lastDay - 1;
	if (endOffset != 0) {
		nextMonthDate = getDaysListByMonth(nextYear, nextMonth, names, locale);
		for (var _i = 0; _i <= endOffset - 1; _i++) {
			res.push(nextMonthDate[_i]);
		}
	}
	return res;
};

var getDaysListByMonth = function getDaysListByMonth(year, month) {
	var date = new Date(year, month - 1, 1);
	var res = [];
	year = String(year);
	var monthName = formatDateString(month);
	while (date.getMonth() == month - 1) {
		var dayName = formatDateString(date.getDate());
		var item = {
			name: dayName,
			day: date.getDay(),
			month: monthName,
			year: year,
			value: year + '-' + monthName + '-' + dayName
		};
		res.push(item);
		date.setDate(date.getDate() + 1);
	}
	return res;
};

var formatDateString = function formatDateString(val) {
	if (Number(val) < 10) {
		return String('0' + Number(val));
	}
	return String(val);
};

var getYearSet = function getYearSet(year) {
	var res = [];
	var itemNumber = void 0;
	var startOffset = void 0;
	var endOffset = void 0;
	if (SELECTOR_YEAR_SET_NUMBER % 2 == 1) {
		itemNumber = (SELECTOR_YEAR_SET_NUMBER - 1) / 2 + 1;
		startOffset = SELECTOR_YEAR_SET_NUMBER - itemNumber;
	} else {
		itemNumber = SELECTOR_YEAR_SET_NUMBER / 2 - 1;
		startOffset = itemNumber - 1;
	}

	endOffset = SELECTOR_YEAR_SET_NUMBER - itemNumber;

	for (var i = year - startOffset; i <= year - 1; i++) {
		res.push(i);
	}
	res.push(year);
	for (var _i2 = 0; _i2 <= endOffset - 1; _i2++) {
		year = year + 1;
		res.push(year);
	}
	return res;
};

// CLOCK

var R2D = 180 / Math.PI;

var SECOND_DEGREE_NUMBER = 6;
var MINUTE_DEGREE_NUMBER = 6;
var HOUR_DEGREE_NUMBER = 30;

var QUARTER = [0, 15, 30, 45];

var TIME_SELECTION_FIRST_CHAR_POS_LIST = [0, 3, 6];
var TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST = [1, 4, 7];
var TIME_SELECTION_SECOND_CHAR_POS_LIST = [1, 4, 7];
var TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST = [2, 5, 8];
var TIME_JUMP_CHAR_POS_LIST = [1, 4, 7];
var TIME_CURSOR_POSITION_OBJECT = {
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
var TIME_TYPE = ['clockHandHour', 'clockHandMinute', 'clockHandSecond', 'meridiem'];

var KEY_CODE = {
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

exports.LANG = LANG;
exports.SIZE_RANGE = SIZE_RANGE;
exports.LOCALE_RANGE = LOCALE_RANGE;
exports.DEFAULT_LACALE = DEFAULT_LACALE;
exports.DEFAULT_SIZE = DEFAULT_SIZE;
exports.PREV_TRANSITION = PREV_TRANSITION;
exports.NEXT_TRANSITION = NEXT_TRANSITION;
exports.SELECTOR_YEAR_SET_NUMBER = SELECTOR_YEAR_SET_NUMBER;
exports.WEEK_NAME = WEEK_NAME;
exports.MONTH_NAME = MONTH_NAME;
exports.WEEK_NUMBER = WEEK_NUMBER;
exports.POINTER_ROTATE = POINTER_ROTATE;
exports.getDaysArray = getDaysArray;
exports.getDaysListByMonth = getDaysListByMonth;
exports.getYearSet = getYearSet;
exports.formatDateString = formatDateString;
exports.R2D = R2D;
exports.SECOND_DEGREE_NUMBER = SECOND_DEGREE_NUMBER;
exports.MINUTE_DEGREE_NUMBER = MINUTE_DEGREE_NUMBER;
exports.HOUR_DEGREE_NUMBER = HOUR_DEGREE_NUMBER;
exports.QUARTER = QUARTER;
exports.TIME_SELECTION_FIRST_CHAR_POS_LIST = TIME_SELECTION_FIRST_CHAR_POS_LIST;
exports.TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST = TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST;
exports.TIME_SELECTION_SECOND_CHAR_POS_LIST = TIME_SELECTION_SECOND_CHAR_POS_LIST;
exports.TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST = TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST;
exports.TIME_JUMP_CHAR_POS_LIST = TIME_JUMP_CHAR_POS_LIST;
exports.TIME_CURSOR_POSITION_OBJECT = TIME_CURSOR_POSITION_OBJECT;
exports.TIME_TYPE = TIME_TYPE;
exports.KEY_CODE = KEY_CODE;
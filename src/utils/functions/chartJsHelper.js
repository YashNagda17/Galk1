export const months = [
	{ key: 1, value: "Jan", valueFull: "January" },
	{ key: 2, value: "Feb", valueFull: "February" },
	{ key: 3, value: "Mar", valueFull: "March" },
	{ key: 4, value: "Apr", valueFull: "April" },
	{ key: 5, value: "May", valueFull: "May" },
	{ key: 6, value: "Jun", valueFull: "June" },
	{ key: 7, value: "Jul", valueFull: "July" },
	{ key: 8, value: "Aug", valueFull: "August" },
	{ key: 9, value: "Sep", valueFull: "September" },
	{ key: 10, value: "Oct", valueFull: "October" },
	{ key: 11, value: "Nov", valueFull: "November" },
	{ key: 12, value: "Dec", valueFull: "December" },
];

export const getLast4Months = (months) => {
	var today = new Date();
	var currentMonth = today.getMonth();
	var sliceEnd = 0;
	var sliceStart = 0;
	if (currentMonth > 3) {
		sliceEnd = currentMonth;
		sliceStart = currentMonth - 4;
		return months.slice(sliceStart, sliceEnd);
	} else {
		if (currentMonth === 3) {
			return [months[11], months[0], months[1], months[2]];
		}
		if (currentMonth === 2) {
			return [months[10], months[11], months[0], months[1]];
		}
		if (currentMonth === 1) {
			return [months[9], months[10], months[11], months[0]];
		}
	}
	return [];
};

export const getGraphPoints = (dataList) => {
	if (dataList.length < 1) {
		return [0, 0, 0, 0];
	} else {
		return [0, 0, 0, 0];
	}
};

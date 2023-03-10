import moment from "moment";

export const sortByOption = (ObjectArray, sortByField) => {
	if (sortByField) {
		ObjectArray.sort((leftElement, rightElement) => {
			if (
				leftElement[sortByField].toUpperCase() >
				rightElement[sortByField].toUpperCase()
			)
				return 1;
			if (
				leftElement[sortByField].toUpperCase() <
				rightElement[sortByField].toUpperCase()
			)
				return -1;
			return 0;
		});
	}
	return ObjectArray;
};

export const searchByOption = (
	ObjectArray,
	searchText = "",
	searchByOption = "name"
) => {
	if (searchText) {
		if (searchByOption === "skills") {
			return ObjectArray.filter((candidate) => {
				return candidate[searchByOption].some((item) =>
					item.toUpperCase().indexOf(searchText.toUpperCase()) >= 0
						? true
						: false
				);
			});
		} else {
			return ObjectArray.filter((candidate) => {
				return candidate[searchByOption]
					.toUpperCase()
					.indexOf(searchText.toUpperCase()) >= 0
					? true
					: false;
			});
		}
	}

	return ObjectArray;
};

export const searchSuggestionBySearchType = (
	ObjectArray,
	searchByOption = "name"
) => {
	if (searchByOption === "skills") {
		let _arrAllSkills = [];
		ObjectArray.forEach((object) => {
			object[searchByOption].forEach((skill) =>
				_arrAllSkills.push(skill || "n/a")
			);
		});
		return Array.from(new Set(_arrAllSkills)).sort();
	}
	return Array.from(
		new Set(ObjectArray.map((student) => student[searchByOption] || "n/a"))
	).sort();
};

export const cloneAndPluck = (sourceObject, keys) => {
	const newObject = {};
	keys.forEach((key) => {
		newObject[key] = sourceObject[key];
	});
	return newObject;
};

export const filterStudentBasedOnSkillArr = (_studentArr, _searchSkillArr) => {
	const skillArr = [..._searchSkillArr];
	const studentArr = [..._studentArr];

	return studentArr.filter((stu) => {
		const studentSkillset = stu.skills || [];
		const textOnlySkills = studentSkillset.map((x) => {
			if (typeof x === "object") {
				return x.label;
			}
			return x;
		});

		const foundTrueFalseArr = textOnlySkills.map((sk) => {
			if (skillArr.find((x) => x === sk)) {
				return true;
			}
			return false;
		});

		return foundTrueFalseArr.find((x) => x === true) || false;
	});
};

//Returns array of splitted array
export const splitArrayByNoOfElement = (initialArr, noOfElement) => {
	const _initialArr = [...initialArr];
	let tempArr = [];
	let finalArr = [];
	let i = 0;

	_initialArr.forEach((x) => {
		i = i + 1;
		if (i <= noOfElement) {
			tempArr.push(x);
		} else {
			i = 1;
			finalArr.push(tempArr);
			tempArr = [];
			tempArr.push(x);
		}
	});
	if (tempArr.length > 0) {
		finalArr.push(tempArr);
	}

	return [...finalArr];
};

export const filterStudentBasedOnSkillArr_2 = (
	_studentArr,
	_searchSkillArr
) => {
	const skillArr_lowercase = [..._searchSkillArr].map((x) => x.toLowerCase());
	const studentArr = [..._studentArr];
	let filteredStudentArr = [];
	filteredStudentArr = studentArr.filter((stu) => {
		const studentSkillset = stu.skills || [];
		const textOnlySkills_lowercase = studentSkillset.map((x) => {
			if (typeof x === "object") {
				return x.label.toLowerCase();
			}
			return x.toLowerCase();
		});
		let foundTrueFalseArr = [];

		textOnlySkills_lowercase.forEach((sk) => {
			if (skillArr_lowercase.includes(sk)) {
				foundTrueFalseArr.push(true);
			} else {
				foundTrueFalseArr.push(false);
			}
		});

		return foundTrueFalseArr.find((x) => x === true) || false;
	});

	return filteredStudentArr;
};

export const filterStudentBasedOnSkillArr_3 = (
	_studentArr,
	_searchSkillArr
) => {
	const requiredSkillsArr_lowercase = [..._searchSkillArr].map((x) => x.toLowerCase());
	const studentArr = [..._studentArr];
	let filteredStudentArr = [];
	filteredStudentArr = studentArr.filter((stu) => {
		const studentSkillset = stu.skills || [];
		const textOnlyStudentsSkills_lowercase = studentSkillset.map((x) => {
			if (typeof x === "object") {
				return x.label.toLowerCase();
			}
			return x.toLowerCase();
		});
		let isStudentEligible = true;
		
		requiredSkillsArr_lowercase.forEach((sk) => {
			if (!textOnlyStudentsSkills_lowercase.includes(sk)) {
				isStudentEligible = false
			}
		});

		return isStudentEligible;
	});

	return filteredStudentArr;
};

//  Sort function will take below inputs

//  initialArray: Initial array to be sorted
//  propertyName: Object property to look during sorting
//  sourceDataType: Data type of above property name
//  matchingDataType: Data type to convert during calculation

export const getSortedArray = (
	initialArray,
	propertyName,
	sourceDataType = "string",
	matchingDataType
) => {
	var _arrayToSort = [...initialArray];
	if (initialArray && initialArray.length > 1) {
		if (matchingDataType === "date") {
			_arrayToSort = [
				..._arrayToSort.sort((a, b) => {
					let compare = 0;
					if (moment(a[propertyName]) > moment(b[propertyName])) {
						compare = -1;
					} else if (moment(a[propertyName]) < moment(b[propertyName])) {
						compare = 1;
					}
					return compare;
				}),
			];
		}
		if (matchingDataType === "string") {
			_arrayToSort = [
				..._arrayToSort.sort((a, b) => {
					let compare = 0;
					if (a[propertyName].toUpperCase() > b[propertyName].toUpperCase()) {
						compare = 1;
					} else if (
						a[propertyName].toUpperCase() < b[propertyName].toUpperCase()
					) {
						compare = -1;
					}
					return compare;
				}),
			];
		}
		if (matchingDataType === "number") {
			_arrayToSort = [
				..._arrayToSort.sort((a, b) => {
					let compare = 0;
					if (parseInt(a[propertyName]) > parseInt(b[propertyName])) {
						compare = -1;
					} else if (parseInt(a[propertyName]) < parseInt(b[propertyName])) {
						compare = 1;
					}
					return compare;
				}),
			];
		}
	}

	return _arrayToSort;
};

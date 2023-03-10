import moment from "moment";

export const getNameWithTimeStamp = (name) => {
	let currentMoment = new Date();
	return (
		name +
		"_" +
		currentMoment.getDate() +
		currentMoment.getMonth() +
		currentMoment.getFullYear() +
		currentMoment.getTime()
	);
};

export const isItemPresent = (item, sourceArray) => {
	return sourceArray.includes(item);
};

export const sortStudentByCriteriaMatch = (initialStudentList, skillList) => {
	if (!skillList.length > 0) return initialStudentList;
	//make the skill list unique
	var uniqueSkillSetRequired = [...new Set(skillList)];

	var studentListWithCalculatedRank = initialStudentList.map((student) => {
		//Example : mappedSkillsObject:{
		// rank: 80%,
		// sortedSkill: [<matched skills>,...rest]
		// }
		let mappedSkillsObject = calculateMatchingRank(
			student.skills,
			uniqueSkillSetRequired
		);
		return {
			...student,
			skills: mappedSkillsObject.bubbledUpSkills,
			rank: mappedSkillsObject.rank,
		};
	});

	return studentListWithCalculatedRank
		.sort((a, b) => {
			if (parseInt(a.rank) < parseInt(b.rank)) return 1;
			if (parseInt(a.rank) > parseInt(b.rank)) return -1;
			return 0;
		})
		.map((student) => {
			delete student.rank;
			return student;
		});
};

const calculateMatchingRank = (studentSkills, skillsetRequiredByCompany) => {
	let noOfRequiredSkills = skillsetRequiredByCompany.length;
	let studentSkillsWhichAreMatched = skillsetRequiredByCompany.filter(
		(skill) => {
			var found = studentSkills.find((studentSkill) => {
				return studentSkill === skill;
			});
			return found ? true : false;
		}
	);
	let _conatenatedTempArr = studentSkillsWhichAreMatched.concat(studentSkills);
	let _bubbledUpSkills = _conatenatedTempArr.filter(
		(item, index) => _conatenatedTempArr.indexOf(item) === index
	);
	return {
		rank: (
			(studentSkillsWhichAreMatched.length * 100) /
			noOfRequiredSkills
		).toFixed(2),
		bubbledUpSkills: _bubbledUpSkills,
	};
};

export const getLiveProjectStatusFullText = (statusText) => {
	if (statusText === "PendingAdminApproval") return "Pending Approval";
	if (statusText === "OpenForStudents") return "Open To Apply";
	if (statusText === "SelectionInProgress") return "Selection In Progress";
	if (statusText === "StudentFinalized") return "StudentFinalized";
	if (statusText === "ProjectEnd") return "Project Archived";
	return "";
};

export const getLiveProjectStatusInNumeric = (statusText) => {
	if (statusText === "OpenForStudents") return 0;
	if (statusText === "SelectionInProgress") return 1;
	if (statusText === "StudentFinalized") return 2;
	if (statusText === "ProjectEnd") return 3;
	return 0;
};

export const getShortenName = (student) => {
	// var _splittedName = student.name
	//   ? student.name.split(" ")
	//   : student.studentName.split(" ");

	// var _college = student.collegeName
	//   ? collegeNames.find((college) => college.name === student.collegeName)
	//   : collegeNames.find((college) => college.name === student.studentCollege);
	// var _collegeCode = _college ? _college.code : "000";
	// var _nameArrToString = _splittedName
	//   .map((name, index) => {
	//     if (index !== _splittedName.length - 1) {
	//       if (name) return name.split("")[0].toUpperCase();
	//     } else {
	//       if (name) return name;
	//     }
	//   })
	//   .toString();
	// var _yearOfRegistration = student.yearOfRegistration
	//   ? student.yearOfRegistration.substring(2, 4)
	//   : "";
	// return (
	//   _nameArrToString.replace(/,/g, ".") +
	//   "(" +
	//   _yearOfRegistration +
	//   _collegeCode +
	//   ")"
	// );

	return student.name;
};

export const checkIfSecondYearStudent = (yearOfAdmission) => {
	// let _generalAdmissionDate = yearOfAdmission.split("/")[0] + "/07";
	// let _studentAdmissionDate = moment(_generalAdmissionDate);
	// let currentYear = new Date().getFullYear();
	// var currentDate = moment(currentYear + "/07");

	// if (currentDate.diff(_studentAdmissionDate, "days") <= 731) return true;
	// return false;

	var currentDate = moment();
	var admissionYearToCalculate = 0;
	var currentMonth = currentDate.format("M");
	var currentYear = currentDate.format("YYYY");

	if (currentMonth < 8) {
		admissionYearToCalculate = parseInt(currentYear) - 2;
	} else {
		admissionYearToCalculate = parseInt(currentYear) - 1;
	}

	if (yearOfAdmission.split("/")[0] === admissionYearToCalculate.toString()) {
		return true;
	} else {
		return false;
	}
};

export const validateEmailWithRegEx = (emailText) => {
	const emailRegEx = RegExp(
		/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
	);

	return emailRegEx.test(emailText);
};

export const validatePasswordWithRegEx = (passwordText) => {
	const passwordRegEx = RegExp(
		//Minimum eight characters, at least one letter and one number. It may contain special character
		/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/

		//Minimum eight characters, at least one letter, one number and one special character
		// /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

		// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
		// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

		// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
		// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

		// Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character
		// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
	);

	return passwordRegEx.test(passwordText);
};

export const getAdmissionYearForThirdYearStudents = () => {
	const d = new Date();
	const currentYear = d.getFullYear();
	//0-Jan to 11-Dec
	const currentMonth = d.getMonth();

	if (currentMonth <= 6) {
		return currentYear - 3;
	} else {
		return currentYear - 2;
	}
};

export const getAdmissionYearForSecondYearStudents = () => {
	const d = new Date();
	const currentYear = d.getFullYear();
	//0-Jan to 11-Dec
	const currentMonth = d.getMonth();

	if (currentMonth <= 6) {
		return currentYear - 2;
	} else {
		return currentYear - 1;
	}
};

export const getAdmissionYearForFourthYearStudents = () => {
	const d = new Date();
	const currentYear = d.getFullYear();
	//0-Jan to 11-Dec
	const currentMonth = d.getMonth();

	if (currentMonth <= 6) {
		return currentYear - 4;
	} else {
		return currentYear - 3;
	}
};

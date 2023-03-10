import { combineReducers } from "redux";
import companyReducer from "./companyReducer";
import companyUserReducer from "./companyUserReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import studentReducer from "./studentReducer";
import surveyReducer from "./surveyReducer";
import superAdminReducer from "./superAdminReducer";
import chatRoomReducer from "./chatRoomReducer";
import languageReducer from "./languageReducer";
import dashboardReducer from "./dashboardReducer";
import thirdYearStudentsReducer from "./thirdYearStudentReducer";
import GALKLabStudentReducer from "./studentReducerGALKLab";

import fourthYearStudentsReducer from "./fourthYearStudentReducer";
import interviewPanelReducer from "./interviewPanelReducer";
import internshipJobReducer from "./internshipJobReducer";
import galkLabJobReducer from "./galkLabJobReducer";
import appReducer from './appReducer'
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import notificationReducer from "./notificationReducter";
import chatRoomGalkLabReducer from "./chatRoomGalkLabReducer";

export default combineReducers({
	app: appReducer,
	company: companyReducer,
	user: companyUserReducer,
	superAdmin: superAdminReducer,
	auth: authReducer,
	error: errorReducer,
	students: studentReducer,
	survey: surveyReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
	chatRoom: chatRoomReducer,
	chatRoomGalkLab: chatRoomGalkLabReducer,
	language: languageReducer,
	dashboard: dashboardReducer,
	thirdYearStudents: thirdYearStudentsReducer,
	fourthYearStudents: fourthYearStudentsReducer,
	interviewPanel: interviewPanelReducer,
	internshipJobs: internshipJobReducer,
	galkLabJobs: galkLabJobReducer,
	GALKLabStudents: GALKLabStudentReducer,
	notifications: notificationReducer,
});

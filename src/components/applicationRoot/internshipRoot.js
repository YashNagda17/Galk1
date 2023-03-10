import React from "react";
import { connect } from "react-redux";
import DashboardContainer from "../dashboard";
import ThirdYearStudents from "../GALKRecruit/student/thirdYear";
import AllThirdYearStudents from "../GALKRecruit/student/allThirdYear";
import AllStudentsStatistics from "../GALKRecruit/statistics";
import InterviewPanel from "../GALKRecruit/interviewPanel";
import JobPostings from "../GALKRecruit/jobPosting";
import ChatRoom from "../GALKRecruit/chatRoom";
import { Redirect, withRouter } from "react-router-dom";
import RestrictedRoute from "../../utils/components/RestrictedRoute";
import App_Form_Galk_Recruit from "../common/forms/galkrecruit_form.js";

const _intershipRoot = ({ match }) => {
	return (
		<>
			{/* <Redirect
				// from={`${match.path}`}
				to={`${match.path}/Dashboard`}
			/> */}
			{/* <RestrictedRoute path={`${match.path}/Dashboard`}>
				<DashboardContainer />
			</RestrictedRoute> */}
			<RestrictedRoute path={`${match.path}/AllStudents`}>
				<AllThirdYearStudents />
			</RestrictedRoute>
            <RestrictedRoute path={`${match.path}/AllStudentsStatistics`}>
                <AllStudentsStatistics />
            </RestrictedRoute>
			<RestrictedRoute path={`${match.path}/Students`}>
				<ThirdYearStudents />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/InterviewPanel`}>
				<InterviewPanel />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/Jobs`}>
				<JobPostings />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/ChatRoom`}>
				<ChatRoom />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/Forms`}>
                <App_Form_Galk_Recruit />
            </RestrictedRoute>
		</>
	);
};

export default connect(null, {})(withRouter(_intershipRoot));

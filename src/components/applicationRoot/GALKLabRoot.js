import React from "react";
import { connect } from "react-redux";
import DashboardContainer from "../dashboard";
import ThirdYearStudents from "../GALKRecruit/student/thirdYear";
import StudentList from "../GALKLab/student";
import Teams from "../GALKLab/teams";
import AllStudentsList from "../GALKLab/allStudents";
import AllStudentsStatistics from "../GALKLab/statistics";
import InterviewPanel from "../GALKRecruit/interviewPanel";
import ChatRoom from "../GALKLab/chatRoom";
import App_Form_Galk_Lab from "../common/forms/galklab_form";
import JobPostings from "../GALKLab/jobPosting";
import { Redirect, withRouter } from "react-router-dom";
import RestrictedRoute from "../../utils/components/RestrictedRoute";


const GALKLabRoot = ({ match }) => {
    return (
        <>
            <RestrictedRoute path={`${match.path}/AllStudents`}>
                <AllStudentsList />
            </RestrictedRoute>
            <RestrictedRoute path={`${match.path}/AllStudentsStatistics`}>
                <AllStudentsStatistics />
            </RestrictedRoute>
            <RestrictedRoute path={`${match.path}/Students`}>
                <StudentList />
            </RestrictedRoute>
            <RestrictedRoute path={`${match.path}/Teams`}>
                <Teams />
            </RestrictedRoute>
            {/* <RestrictedRoute path={`${match.path}/InterviewPanel`}>
                <InterviewPanel />
            </RestrictedRoute>*/}
            <RestrictedRoute path={`${match.path}/Jobs`}>
                <JobPostings />
            </RestrictedRoute>
            <RestrictedRoute path={`${match.path}/ChatRoom`}>
                <ChatRoom />
            </RestrictedRoute>
            <RestrictedRoute path={`${match.path}/Forms`}>
                <App_Form_Galk_Lab />
            </RestrictedRoute>

        </>
    );
};

export default connect(null, {})(withRouter(GALKLabRoot));

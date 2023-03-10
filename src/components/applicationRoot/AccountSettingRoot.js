import React from "react";
import CompanyProfile from "../AccountSettings/companyProfile";
import MyAccount from "../AccountSettings/myAccount";
import TeamMember from "../AccountSettings/teamMember";
import { Redirect, withRouter } from "react-router-dom";
import RestrictedRoute from "../../utils/components/RestrictedRoute";

const AccountSettingRoot = ({ match }) => {
	return (
		<>
			<Redirect
				exact
				// from={`${props.match.path}`}
				to={`${match.path}/Companyprofile`}
			/>
			<RestrictedRoute exact path={`${match.path}/Companyprofile`}>
				<CompanyProfile />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/Myprofile`}>
				<MyAccount />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/TeamMembers`}>
				<TeamMember />
			</RestrictedRoute>
		</>
	);
};

export default withRouter(AccountSettingRoot);

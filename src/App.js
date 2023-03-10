import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { isLoaded, isEmpty } from "react-redux-firebase";

import LandingPage from "./components/landing";
import SignUpForm from "./components/auth/SignUpForm";
import SignInForm from "./components/auth/SignInForm";
import PasswordResetForm from "./components/auth/PasswordResetForm";
// import ProtectedHeader from "./components/header/protectedHeader";
import PublicHeader from "./components/header/publicHeader";
import RestrictedRoute from "./utils/components/RestrictedRoute";
import Layout from "./components/common/layout/applicationLayout";
import { getCompanyDetails, getCompanyUserProfilePicture } from "./actions/companyActions";

import ApplicationRoot from "./components/applicationRoot";
import InternshipRoot from "./components/applicationRoot/internshipRoot";
import AccountSettingRoot from "./components/applicationRoot/AccountSettingRoot";
import GALKLabRoot from "./components/applicationRoot/GALKLabRoot";
import "./App.less";

const App = ({
	auth,
	selectedCompanyIdBySuperAdmin,
	loadedCompanyId,
	userProfile,
	getCompanyDetails,
	getCompanyUserProfilePicture
}) => {
	const { companyId } = userProfile;

	useEffect(() => {
		if (auth.isLoaded && auth.uid && companyId) {
			getCompanyDetails(companyId, auth.uid);
			getCompanyUserProfilePicture(auth.uid);
		}
	}, [auth.uid, companyId, auth.isLoaded]);

	if (auth.isLoaded) {
		return (
			
			<BrowserRouter>
				{!(isLoaded(auth) && !isEmpty(auth)) && <PublicHeader />}
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/SignUp" component={SignUpForm} />
					<Route path="/SignIn" component={SignInForm} />
					<Route path="/PasswordReset" component={PasswordResetForm} />
					<RestrictedRoute path="/Home">
						<ApplicationRoot />
					</RestrictedRoute>
					<Layout>
						<RestrictedRoute path="/Internship">
							<InternshipRoot />
						</RestrictedRoute>
						<RestrictedRoute path="/GALKLab"  >
							<GALKLabRoot />
						</RestrictedRoute>
						<RestrictedRoute path="/AccountSetting">
							<AccountSettingRoot />
						</RestrictedRoute>
					</Layout>
				</Switch>
			</BrowserRouter>
		);
	}
	return null;
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	userProfile: state.firebase.profile,
	selectedCompanyIdBySuperAdmin: state.superAdmin.selectedCompanyId,
	loadedCompanyId: state.company.company.id,
});

export default compose(
	firebaseConnect(),
	connect(mapStateToProps, { getCompanyDetails, getCompanyUserProfilePicture })
)(App);

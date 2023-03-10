import React from "react";
import HomeRoot from "./HomeRoot";
import RestrictedRoute from "../../utils/components/RestrictedRoute";
import { withRouter } from "react-router-dom";
// import { MyAccountContainer } from "../myaccount/MyAccountContainer";

const ApplicationRoot = ({ match }) => {
	return (
		<>
			<RestrictedRoute exact path={`${match.path}`}>
				<HomeRoot />
			</RestrictedRoute>
		</>
	);
};

export default withRouter(ApplicationRoot);

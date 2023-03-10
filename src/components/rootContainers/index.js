import React from "react";
import HomeRoot from "./HomeRoot";
import { Redirect, Switch } from "react-router-dom";
// import { MyAccountContainer } from "../myaccount/MyAccountContainer";
import Layout from "../common/layout/applicationLayout";

const ApplicationRoot = (props) => {
	return (
		<Layout>
			<Switch>
				{/* <Redirect
          exact
          from={`${props.match.path}`}
          to={`${props.match.path}/dashboard`}
        /> */}
				{/* <RestrictedRoute
							exact
							path={`${props.match.path}`}
							component={HomeRoot}
						/> */}
				<HomeRoot />
				{/* <RestrictedRoute
          path={`${props.match.path}/MyAccount`}
          component={MyAccountContainer}
        /> */}
			</Switch>
		</Layout>
	);
};

export default ApplicationRoot;

import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Route, Redirect } from "react-router-dom";

const RestrictedRoute = (props) => {
	const { children, ...rest } = props;
	const auth = useSelector((state) => state.firebase.auth);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isLoaded(auth) && !isEmpty(auth) ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default RestrictedRoute;

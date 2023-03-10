import React, { useEffect } from "react";
// import { addFieldsToAllCompanyCollection } from "../../Actions/companyActions";
// import { setNotification, closeNotification } from "../../Actions/errorActions";
import { connect } from "react-redux";
import { getCompanyDetails } from "../../actions/companyActions";

import "./style.css";

const HomeRoot = ({ getCompanyDetails, userId, companyId }) => {
	useEffect(() => {
		if (userId && companyId) {
			getCompanyDetails(companyId, userId);
		}
	}, [userId, companyId]);
	return <span>Home container</span>;
};

const mapStateToProps = (state) => ({
	userId: state.firebase.auth.uid,
	companyId: state.firebase.profile.companyId,
});

export default connect(mapStateToProps, { getCompanyDetails })(HomeRoot);

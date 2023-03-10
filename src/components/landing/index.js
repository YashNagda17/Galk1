import React from "react";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { useTranslation } from "react-i18next";

import "./style.css";

const LandingPage = ({ auth }) => {
	const { t } = useTranslation();

	if (auth.uid) {
		return <Redirect to="/Home" />;
	}
	return (
		<React.Fragment>
			<footer className="footerSection iq-ptb-30">
				<div className="row-footer footerBottom">
					<p>{t("landing_copyright")}</p>
					<ul>
						<li>
							<a
								href="http://willings.co.jp/"
								target="_blank"
								rel="noopener noreferrer"
							>
								{t("landing_mothercompany")}
							</a>
						</li>
						<li>
							<a
								href="https://willings.co.jp/contact"
								target="_blank"
								rel="noopener noreferrer"
							>
								{t("landing_contactus")}
							</a>
						</li>
					</ul>
				</div>
			</footer>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
});

export default compose(
	firebaseConnect(),
	connect(mapStateToProps)
)(LandingPage);

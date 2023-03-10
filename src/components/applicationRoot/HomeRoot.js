import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { setApplicationModule } from "../../actions/appActions";
import { ApplicationModule } from "../../utils/models/applicationModules";
import internshipIcon from "../../assets/images/internshipLogo.png";
import freelanceIcon from "../../assets/images/galkLabLogo.png";
import developmentIcon from "../../assets/images/GALKCompanyLogo.png";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { defaultCompanyLogoURL, defaultCompanyCoverPhoto } from "../../utils/constants";
import { message, Tooltip } from "antd";

import "antd/dist/antd.css";
import "./style.css";

const HomeRoot = ({ setApplicationModule, company }) => {
	const { t } = useTranslation();

	useEffect(() => {
		setApplicationModule(ApplicationModule.Default);
	}, []);

	if (Object.keys(company).length){
		if (company.website == ""){
			message.info(t("complete_company_profile_home_page"))
			return <Redirect to="/AccountSetting" />;
		}
	}
	return (
		<section className="appRoot_homePageBG">
			<div className="appRoot_indexContainer">
				<div className="appRoot_title-heading">
					<h3>{t("homeRoot_pageHeader")}</h3>
					<p>{t("homeRoot_choiceHeader")}</p>
					<ul className="appRoot_grpBtns">
						<li key={ApplicationModule.Internship}>
							<Link to="/Internship/AllStudents">
								<Tooltip title={t("homeRoot_appModuleOption_internship_tip")}>
									<button
										onClick={() =>
											setApplicationModule(ApplicationModule.Internship)
										}
									>
										<p>
											<img src={internshipIcon} alt="internshipIcon" />
										</p>
										{t("homeRoot_appModuleOption_internship")}
									</button>
								</Tooltip>
							</Link>
						</li>
						<li key={ApplicationModule.GALKLab}>
							<Link to="/GALKLab/AllStudentsStatistics">
								<Tooltip title={t("homeRoot_appModuleOption_GALKLab_tip")}>
									<button
										onClick={() =>
											setApplicationModule(ApplicationModule.GALKLab)
										}
									//className="appRoot_disabledBTN"
									>
										<p>
											<img src={freelanceIcon} alt="freelanceIcon" />
										</p>
										{t("homeRoot_appModuleOption_GALKLab")}
									</button>
								</Tooltip>
							</Link>
						</li>
						<li key={ApplicationModule.AccountSetting}>
							<Link to="/AccountSetting">
								<button
									onClick={() =>
										setApplicationModule(ApplicationModule.AccountSetting)
									}
								>
									<p>
										<img src={developmentIcon} alt="settingIcon" />
									</p>
									{t("homeRoot_appModuleOption_accountSetting")}
								</button>
							</Link>
						</li>
					</ul>
				</div>
				<div className="appRoot_clearfix"></div>
			</div>
			<div className="appRoot_clearfix"></div>
		</section>
	);
};

const mapStateToProps = (state) => ({
	company: state.company.company,
});

export default connect(mapStateToProps, {setApplicationModule,})(HomeRoot);

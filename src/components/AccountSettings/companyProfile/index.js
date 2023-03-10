import React, { useState } from "react";
import { Region } from "../../common/layout/region";
import Logo from "./logo";
import CoverPhoto from "./coverPhoto";
import BasicInformation from "./basicInformation";
import Operation from "./operationalInformation";
import { useTranslation } from "react-i18next";
import { defaultCompanyLogoURL, defaultCompanyCoverPhoto } from "../../../utils/constants";

import Do from "./whatWeDo";
import { connect } from "react-redux";
import { Card, Button, Modal, Divider, Progress } from "antd";
import { EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";
import ProfileCompletedModal from "./profileCompletedModal";
import "./style.css";

var whatWeDoBool = 0;
var basicInfoBool = 0;
var coverPhotoBool = 0;
var corporateLogoBool = 0;
var operationalInfoBool = 0;
var isProfileCompleted = false;
const percentagePerStep = 20

export const setCompletionBool = (boolName, boolValue=1) => {
	if (boolName == "whatWeDo") whatWeDoBool = boolValue
	if (boolName == "basicInfo") basicInfoBool = boolValue
	if (boolName == "coverPhoto") coverPhotoBool = boolValue
	if (boolName == "corporateLogo") corporateLogoBool = boolValue
	if (boolName == "operationalInfo") operationalInfoBool = boolValue

	if (whatWeDoBool == basicInfoBool == operationalInfoBool == corporateLogoBool == coverPhotoBool == 1) {
		isProfileCompleted = true
	} else {
		isProfileCompleted = false
	}
}

const CompanyProfile = ({ company }) => {
	const [showStudentView, setShowStudentView] = useState(false);
	const [showModal, setShowModal] = useState(true);
	const { t } = useTranslation();

	const closeModal = () => {
		setShowModal(false);
		isProfileCompleted = false;
	};

	if (Object.keys(company).length){
		if (company.do != "") whatWeDoBool = 1
		if (company.website != "") basicInfoBool = 1
		if (company.description != "") operationalInfoBool = 1
		if (company.logo != defaultCompanyLogoURL) corporateLogoBool = 1
		if (company.coverPhoto != defaultCompanyCoverPhoto) coverPhotoBool = 1
	}

	return (
		<Region>
			<div id="ProgressBar">
				<Progress percent={
					percentagePerStep*whatWeDoBool + percentagePerStep*basicInfoBool + percentagePerStep*coverPhotoBool
					+ percentagePerStep*corporateLogoBool + percentagePerStep*operationalInfoBool
				} />
			</div>
			<Divider />
			<Card
				title={`${t("company_profile")}`}
				style={{
					height: "95%",
					width: "100%",
					overflowY: "auto",
				}}
				extra={
					<Button type="primary" onClick={() => setShowStudentView(true)}>
						{`${t("accountsetting_companyprofile_checkstudentview")}`}
					</Button>
				}
			>
				<BasicInformation />
				<CoverPhoto />
				<Logo />
				<Operation />
				<Do />
				{showStudentView && (
					<Modal
						title="Student view"
						centered
						visible={true}
						onOk={() => {
							setShowStudentView(false);
						}}
						onCancel={() => {
							setShowStudentView(false);
						}}
						footer={[
							<Button
								key="Ok"
								type="primary"
								onClick={() => setShowStudentView(false)}
							>
								{t("ok")}
							</Button>,
						]}
						width={1000}
					>
						<div className="studentView_companyProfile_container">
							<div className="studentView_companyProfile_container_grid">
								<div
									className="studentView_grid_profileTop"
									style={{
										background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${company.coverPhoto
											? company.coverPhoto
											: defaultCompanyCoverPhoto
											}) no-repeat center center/cover`,
									}}
								>
									<div className="actionContainer">
										<img
											src={company.logo ? company.logo : defaultCompanyLogoURL}
											alt=""
										/>
									</div>

									<span className="profileTop_companyName">
										{company.nameInEnglish
											? company.nameInEnglish
											: company.name}
									</span>

									<div className="actionContainer">
										<div>
											<span className="profileTop_industry">
												{company.industry}
											</span>
											<br />
											<span className="profileTop_address">
												{company.address}{" "}
												<EnvironmentOutlined style={{ fontSize: 18 }} />
											</span>
										</div>
										<span className="profileTop_website">
											<a href={company.website} target="_blank">
												{company.website}
											</a>{" "}
											<GlobalOutlined style={{ fontSize: 18, marginLeft: 5 }} />
										</span>
									</div>
								</div>
								<div className="studentView_grid_profileAbout">
									<h2>Company Information</h2>
									<p>
										{company.description}
										<br />
										<br />
										<strong>Founder:</strong> {company.founder}
										<br />
										<strong>No of Employee:</strong> {company.size}
									</p>
									{company.do && (
										<>
											<Divider />
											<h2>What we do</h2>
											<p>{company.do}</p>
										</>
									)}
								</div>
							</div>
						</div>
					</Modal>
				)}
			</Card>
			{isProfileCompleted && showModal && (
				<ProfileCompletedModal modalCloseHandler={closeModal} />
			)}
		</Region>
	);
};

const mapStateToProps = (state) => ({
	company: state.company.company,
});

export default connect(mapStateToProps, {})(CompanyProfile);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDashboardBasic } from "../../actions/dashboardActions";
import Logo from "../../assets/images/logo.png";
import { Card, List, Skeleton } from "antd";
import { useTranslation } from "react-i18next";

import "./dashboardStyles.css";

const BasicInformation = ({
	getDashboardBasic,
	companyId,
	basicInfoData,
	isLoading,
}) => {
	const { t } = useTranslation();

	useEffect(() => {
		if (companyId) {
			getDashboardBasic(companyId);
		}
	}, [companyId]);

	return (
		<Card
			className="dashboard-basicInformation-card-container"
			title={`${t("internship_dashboard_basicinfo_title")}`}
		>
			<div className="cardBox">
				<React.Fragment>
					<h3 className="milageText">Mileage Card</h3>
					<img src={Logo} className="dashboard-basicInformation-card-logo" />
					<h3 className="pointText">
						{basicInfoData ? basicInfoData.galkMileagePoint : ""}
						<span>Points</span>
					</h3>
					<p className="rankText">
						Rank {basicInfoData ? basicInfoData.galkRank : ""}
					</p>

					<h3 className="companyText">
						{basicInfoData ? basicInfoData.companyName : ""}
					</h3>

					<div className="dateBox">
						<p className="label1">MONTH / YEAR</p>
						<span className="lable2">GOOD{"\n"}THRU</span>
						<h3>{basicInfoData ? basicInfoData.galkMileageExpiry : ""}</h3>
					</div>
				</React.Fragment>
			</div>
			<List>
				<List.Item>
					{isLoading || !basicInfoData ? (
						<Skeleton.Input style={{ width: 120 }} active={true} size="large" />
					) : (
						<List.Item.Meta
							title={`${t("internship_dashboard_basicinfo_list1")}`}
							description={`${
								basicInfoData ? basicInfoData.galkMileagePoint : ""
							}`}
						/>
					)}
				</List.Item>
				<List.Item>
					{isLoading || !basicInfoData ? (
						<Skeleton.Input style={{ width: 200 }} active={true} size="large" />
					) : (
						<List.Item.Meta
							title={`${t("internship_dashboard_basicinfo_list2")}`}
							description={`${
								basicInfoData ? basicInfoData.galkMileageMembership : ""
							}`}
						/>
					)}
				</List.Item>
				<List.Item>
					{isLoading || !basicInfoData ? (
						<Skeleton.Input style={{ width: 100 }} active={true} size="large" />
					) : (
						<List.Item.Meta
							title={`${t("internship_dashboard_basicinfo_list3")}`}
							description={`${
								basicInfoData ? basicInfoData.galkMileageExpiry : ""
							}`}
						/>
					)}
				</List.Item>
			</List>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.dashboard.isBasicInformationLoading,
	companyId: state.firebase.profile.companyId,
	basicInfoData: state.dashboard.basicInformation,
});

export default connect(mapStateToProps, { getDashboardBasic })(
	BasicInformation
);

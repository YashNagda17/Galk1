import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDashboardCompanyStat } from "../../actions/dashboardActions";
import { Card, List, Skeleton } from "antd";
import { useTranslation } from "react-i18next";

import "./dashboardStyles.css";

const CompanyStatInformation = ({
	isLoading,
	getDashboardCompanyStat,
	companyStatData,
	companyId,
}) => {
	const { t } = useTranslation();

	useEffect(() => {
		if (companyId) {
			getDashboardCompanyStat(companyId);
		}
	}, [companyId]);

	if (companyStatData) {
		var {
			totalCandidateIntroduced,
			totalInternshipJobCount,
			totalStudentInInterviewPanelCount,
			totalStudentSelectedCount,
		} = companyStatData;
	}

	return (
		<Card
			className="dashboard-basicInformation-card-container"
			title={`${t("internship_dashboard_companystat_title")}`}
		>
			<List>
				<List.Item>
					<List.Item.Meta
						title={`${t("internship_dashboard_companystat_list1_item1_title")}`}
						description={`${t(
							"internship_dashboard_companystat_list1_item1_desc"
						)}`}
					/>
					{isLoading || !companyStatData ? (
						<Skeleton.Input style={{ width: 40 }} active={true} />
					) : (
						<span className="dashboard_companyStat_card_count">
							{totalCandidateIntroduced}
						</span>
					)}
				</List.Item>
				<List.Item>
					<List.Item.Meta
						title={`${t("internship_dashboard_companystat_list1_item2_title")}`}
						description={`${t(
							"internship_dashboard_companystat_list1_item2_desc"
						)}`}
					/>
					{isLoading || !companyStatData ? (
						<Skeleton.Input style={{ width: 40 }} active={true} />
					) : (
						<span className="dashboard_companyStat_card_count">
							{totalInternshipJobCount}
						</span>
					)}
				</List.Item>
				<List.Item>
					<List.Item.Meta
						title={`${t("internship_dashboard_companystat_list1_item3_title")}`}
						description={`${t(
							"internship_dashboard_companystat_list1_item3_desc"
						)}`}
					/>
					{isLoading || !companyStatData ? (
						<Skeleton.Input style={{ width: 40 }} active={true} />
					) : (
						<span className="dashboard_companyStat_card_count">
							{totalStudentInInterviewPanelCount}
						</span>
					)}
				</List.Item>
				<List.Item>
					<List.Item.Meta
						title={`${t("internship_dashboard_companystat_list1_item4_title")}`}
						description={`${t(
							"internship_dashboard_companystat_list1_item4_desc"
						)}`}
					/>
					{isLoading || !companyStatData ? (
						<Skeleton.Input style={{ width: 40 }} active={true} />
					) : (
						<span className="dashboard_companyStat_card_count">
							{totalStudentSelectedCount}
						</span>
					)}
				</List.Item>
			</List>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.dashboard.isCompanyStatInformationLoading,
	companyStatData: state.dashboard.companyStatInformation,
	companyId: state.firebase.profile.companyId,
});

export default connect(mapStateToProps, { getDashboardCompanyStat })(
	CompanyStatInformation
);

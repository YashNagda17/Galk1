import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Region } from "../../common/layout/region";
import ThirdYear from "./thirdYear";
// import FourthYear from "./fourthYear";
import {
	getStudentListInInterviewPanel,
	resetStudentListInInterviewPanel,
} from "../../../actions/interviewPanelActions";
import { RestrictedCompanyAccountType } from "../../../utils/constants";
import { getCompanyAccountType } from "../../../reducers/companySelector";
import Loading from "../../common/loading";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import "./style.css";

// const { TabPane } = Tabs;

const InterviewPanel = ({
	isLoading,
	companyId,
	thirdYearList,
	// fourthYearList,
	getStudentListInInterviewPanel,
	resetStudentListInInterviewPanel,
	companyAccountType
}) => {
	const { t } = useTranslation();
	const isRestrictedAccountType = 
		RestrictedCompanyAccountType.includes(companyAccountType);

	useEffect(() => {
		if (companyId && !thirdYearList) {
			getStudentListInInterviewPanel();
		}
	}, [companyId, thirdYearList]);

	useEffect(() => {
		return () => {
			resetStudentListInInterviewPanel();
		};
	}, []);

	return (
		<Region>
			{
				isRestrictedAccountType && t("complete_company_profile_page")
			}
			{ !isRestrictedAccountType &&
				<div className="interviewPanel-container">
					{(isLoading || !thirdYearList) && <Loading size="large" />}
					{!isLoading && (
						// <Tabs
						// 	size="large"
						// 	type="card"
						// 	defaultActiveKey="1"
						// 	centered
						// 	className="interviewPanel_tabs"
						// >
						// 	<TabPane
						// 		tab="Internship"
						// 		key="1"
						// 		className="interviewPanel_tabPane"
						// 	>
						// 		{thirdYearList && <ThirdYear studentList={thirdYearList} />}
						// 	</TabPane>
						// 	<TabPane tab="FullTime" key="2">
						// 		{fourthYearList && <FourthYear studentList={fourthYearList} />}
						// 	</TabPane>
						// </Tabs>
						<>{thirdYearList && <ThirdYear studentList={thirdYearList} />}</>
					)}
				</div>
			}
		</Region>
	);
};

const mapStateToProps = (state) => ({
	companyId: state.company.company.id,
	isLoading: state.interviewPanel.isListLoading,
	thirdYearList: state.interviewPanel.thirdYearList,
	// fourthYearList: state.interviewPanel.fourthYearList,
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, {
	getStudentListInInterviewPanel,
	resetStudentListInInterviewPanel,
})(InterviewPanel);

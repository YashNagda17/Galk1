import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Region } from "../../common/layout/region";
import SearchPanel from "./searchPanel";
import SearchResult from "./searchResult";
import Loading from "../../common/loading";
import { getAllGALKLabStudents } from "../../../actions/studentActionsGALKLab";
import { getCompanyAccountType } from "../../../reducers/companySelector";
import { RestrictedCompanyAccountType } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

import "./GALKLabStudents.css";

const GALKLabStudentList = ({
	getAllGALKLabStudents,
	companyId,
	studentList,
	isLoading,
	companyName,
	companyAccountType
}) => {
	const { t } = useTranslation();
	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);

	useEffect(() => {
		if (companyId && companyName) {
			getAllGALKLabStudents(companyId, companyName);
		}
	}, [companyId, companyName]);

	return (
		<Region>
			{
				isRestrictedAccountType && t("complete_company_profile_page")
			}
			{ !isRestrictedAccountType &&
				<div className="thirdYearStudents-container">
					<div className="thirdYearStudents-searchResult">
						{(isLoading || !studentList) && <Loading size="large" />}
						{!isLoading && studentList && (
							<SearchResult studentList={studentList} />
						)}
					</div>
				</div>
			}
		</Region>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.GALKLabStudents.isListLoading,
	companyId: state.firebase.profile.companyId,
	companyName: state.company.company.name,
	studentList: state.GALKLabStudents.filteredStudentList,
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, { getAllGALKLabStudents })(
	GALKLabStudentList
);

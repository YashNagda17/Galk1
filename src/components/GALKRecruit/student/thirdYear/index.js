import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Region } from "../../../common/layout/region";
import SearchPanel from "./searchPanel";
import SearchResult from "./searchResult";
import Loading from "../../../common/loading";
import { getAllTaggedThirdYearStudents } from "../../../../actions/thirdYearStudentActions";
import { RestrictedCompanyAccountType } from "../../../../utils/constants";
import { getCompanyAccountType } from "../../../../reducers/companySelector";
import { useTranslation } from "react-i18next";

import "./thirdYearStudents.css";

const ThirdYearStudents = ({
	getAllTaggedThirdYearStudents,
	companyId,
	studentList,
	isLoading,
	companyAccountType
}) => {
	const { t } = useTranslation();
	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);

	useEffect(() => {
		if (companyId) {
			getAllTaggedThirdYearStudents(companyId);
		}
	}, [companyId]);

	return (
		<Region>
			{
				isRestrictedAccountType && t("complete_company_profile_page")
			}
			{ !isRestrictedAccountType &&
				<div className="thirdYearStudents-container">
					<div className="thirdYearStudents-searchPanel">
						<SearchPanel isLoading={isLoading} />
					</div>
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
	isLoading: state.thirdYearStudents.isListLoading,
	companyId: state.firebase.profile.companyId,
	studentList: state.thirdYearStudents.filteredStudentList,
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, { getAllTaggedThirdYearStudents })(
	ThirdYearStudents
);

import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Region } from "../../common/layout/region";
import SearchPanel from "./searchPanel";
import SearchResult from "./searchResult";
import Loading from "../../common/loading";
import { getAllTaggedFourthYearStudents } from "../../../actions/fourthYearStudentActions";
import { Empty } from "antd";

import "./fourthYearStudents.css";

const FourthYearStudents = ({
	getAllTaggedFourthYearStudents,
	companyId,
	studentList,
	isLoading,
}) => {
	useEffect(() => {
		if (companyId) {
			getAllTaggedFourthYearStudents(companyId);
		}
	}, [companyId]);

	return (
		<Region>
			<div className="thirdYearStudents-container">
				<div className="thirdYearStudents-searchPanel">
					<SearchPanel isLoading={isLoading} />
				</div>
				<div className="thirdYearStudents-searchResult">
					{isLoading && <Loading size="large" />}
					{/* {studentList && studentList.length < 1 && <Empty />} */}
					{!isLoading && studentList && (
						<SearchResult studentList={studentList} />
					)}
				</div>
			</div>
		</Region>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.fourthYearStudents.isListLoading,
	companyId: state.firebase.profile.companyId,
	studentList: state.fourthYearStudents.filteredStudentList,
});

export default connect(mapStateToProps, { getAllTaggedFourthYearStudents })(
	FourthYearStudents
);

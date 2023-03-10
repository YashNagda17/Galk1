import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Region } from "../../common/layout/region";
import SearchResult from "./searchResult";
import Loading from "../../common/loading";
import { getAllThirdYearStudents } from "../../../actions/thirdYearStudentActions";

import "./thirdYearStudents.css";

const AllThirdYearStudents = ({
	getAllThirdYearStudents,
	studentList,
	isLoading
}) => {
	useEffect(() => {
		getAllThirdYearStudents();
	}, []);
	
	return (
		<Region>
			<div className="thirdYearStudents-container">
				<div className="thirdYearStudents-searchResult">
					{(isLoading || !studentList) && <Loading size="large" />}
					{!isLoading && studentList && (
						<SearchResult studentList={studentList} />
					)}
				</div>
			</div>
		</Region>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.thirdYearStudents.isListLoading,
	studentList: state.thirdYearStudents.filteredStudentList,
});

export default connect(mapStateToProps, { getAllThirdYearStudents })(
	AllThirdYearStudents
);

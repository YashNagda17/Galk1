import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Region } from "../../common/layout/region";
import SearchResult from "./searchResult";
import Loading from "../../common/loading";
import { getAllStudentsList } from "../../../actions/studentActions";

import "./GALKLabStudents.css";

const GALKLabStudentList = ({
	getAllStudentsList,
	studentList,
	isLoading
}) => {
	useEffect(() => {
		getAllStudentsList();
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
	isLoading: state.GALKLabStudents.isListLoading,
	studentList: state.GALKLabStudents.filteredStudentList,
});

export default connect(mapStateToProps, { getAllStudentsList })(
	GALKLabStudentList
);

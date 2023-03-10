import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Region } from "../../common/layout/region";
import SearchResult from "./searchResult";
import Loading from "../../common/loading";
import { database } from "../../../utils/configs/firebaseConfig";
import {
	getGalkLabJobs,
	resetGalkLabJobList,
} from "../../../actions/galkLabJobPostingActions";
import { getAllGALKLabTaggedStudents } from "../../../actions/studentActionsGALKLab";

import { useTranslation } from "react-i18next";
import { Card, Tabs } from "antd";

import "./GALKLabStudents.css";

const { TabPane } = Tabs;

const GALKLabTeamsList = ({
	getAllGALKLabTaggedStudents,
	getGalkLabJobs,
	companyId,
	jobList,
	isLoading,
	companyName,
}) => {
	const [gotTaggedStudentsList, setGotTaggedStudentsList] = useState(false);
	const [isListLoading, setIsListLoading] = useState(false);
	const [taggedStudentsList, setTaggedStudentList] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
		if (companyId && !jobList) {
			getGalkLabJobs();
		}
	}, [companyId, jobList]);
	useEffect(() => {
		if (companyId && companyName) {
			getAllGALKLabTaggedStudents(companyId, companyName);
		}
	}, [companyId, companyName]);
	useEffect(() => {
		return () => {
			resetGalkLabJobList();
		};
	}, []);

	const getPlanCost = (data) => {
		if (data == undefined) return "Error"
		if (data.length < 4){
			return t("min_4_engineers")
		}

		const initialCost = 1000;
		const basicCost = 6500;
		const extraCost = 975 * (data.length - 4);

		return t("project_cost", { charge: initialCost + basicCost + extraCost })
	}

	const getTaggedStudents = () => {
		if (!jobList) return

		setIsListLoading(true)
		
		let completeTaggedStudentList = []
		for (let i=0; i<jobList.length; i++){
			completeTaggedStudentList.push([])
		}
		for (let i=0; i<jobList.length; i++){
			const selectedJob = jobList[i]
			if (!selectedJob.candidateTaggedList) {
				if (i==jobList.length-1){
					setGotTaggedStudentsList(true)
					setTaggedStudentList(completeTaggedStudentList)
					setIsListLoading(false)
				}
				continue
			}
			for (let j=0; j<selectedJob.candidateTaggedList.length; j++){
				database
					.collection("StudentProfile")
					.where("id", "==", selectedJob.candidateTaggedList[j])
					.get()
					.then((qry) => {
						qry.forEach((doc) => {
							completeTaggedStudentList[i].push(doc.data())
						});
					})
					.then(() => {
						if (j == selectedJob.candidateTaggedList.length-1){
							if (i==jobList.length-1){
								setGotTaggedStudentsList(true)
								setTaggedStudentList(completeTaggedStudentList)
								setIsListLoading(false)
							}
						}
					})
					.catch((ex) => {
					});
			}
		}
	}

	if(!gotTaggedStudentsList && !isListLoading)
		getTaggedStudents()
		
	const [value, setValue] = React.useState(0);
	return (
		<Region>
			{(isLoading || !taggedStudentsList) && <Loading size="large" />}
			{!isLoading && taggedStudentsList && ((jobList && jobList.length != 0) &&
			<>
				<Tabs size="small">
					{
						jobList && jobList
							.filter((job) => job.status !== "archived")
							.map((item, i) => (
								<TabPane tab={item.title} key={i}>
									<SearchResult studentList={taggedStudentsList[i]} planCost={getPlanCost(taggedStudentsList[i])} />
								</TabPane>
							))
					}
				</Tabs>
			</>
			)}
		</Region>
	);
};

const mapStateToProps = (state) => ({
	jobList: state.galkLabJobs.jobList,
	companyId: state.company.company.id,
	companyName: state.company.company.name,
	isLoading: state.GALKLabStudents.isListLoading,
});

export default connect(mapStateToProps, { getAllGALKLabTaggedStudents, getGalkLabJobs })(
	GALKLabTeamsList
);

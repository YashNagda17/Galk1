import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setApplicationModule } from "../../../actions/appActions";
import { ApplicationModule } from "../../../utils/models/applicationModules";
import { RestrictedCompanyAccountType } from "../../../utils/constants";
import { getCompanyAccountType } from "../../../reducers/companySelector";
import { withRouter, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";
import {
	AppstoreOutlined,
	UserSwitchOutlined,
	CommentOutlined,
	BankOutlined,
	UsergroupAddOutlined,
	UserOutlined,
	TeamOutlined,
	ProfileOutlined,
} from "@ant-design/icons";
import "./leftBottom.css";

const LeftBottom = ({
	location,
	appModule,
	match,
	setApplicationModule,
	userId,
	companyAccountType
}) => {
	const { t } = useTranslation();
	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);

	//Below hook is the fix of left navigation visibility on page refresh
	useEffect(() => {
		if (appModule === "Default") {
			let splittedLocation = location.pathname.split("/");

			if (splittedLocation.includes("Internship")) {
				setApplicationModule(ApplicationModule.Internship);
			}
			if (splittedLocation.includes("GALKLab")) {
				setApplicationModule(ApplicationModule.GALKLab);
			}
			if (splittedLocation.includes("AccountSetting")) {
				setApplicationModule(ApplicationModule.AccountSetting);
			}
		}
	}, [appModule, location]);

	const internshipPages = isRestrictedAccountType
	?	[
			{
				title: `${t("left_nav_bottom_option_internship_all_students")}`,
				href: "/Internship/AllStudents",
				icon: <TeamOutlined />,
				key: "AllStudents",
			},
			{
				title: `${t("left_nav_bottom_option_internship_all_students_statistics")}`,
				href: "/Internship/AllStudentsStatistics",
				icon: <TeamOutlined />,
				key: "AllStudentsStatistics",
			},
			{
				title: `${t("left_nav_bottom_optiion_internship_jobs")}`,
				href: "/Internship/Jobs",
				icon: <ProfileOutlined />,
				key: "Jobs",
			},
			{
				title: `${t("left_nav_bottom_optiion_application_form")}`,
				href: "/Internship/Forms",
				icon: <ProfileOutlined />,
				key: "Application Form",
			},
		]
	:	[
			// {
			// 	title: `${t("left_nav_bottom_optiion_internship_dashboard")}`,
			// 	href: "/Internship/Dashboard",
			// 	icon: <AppstoreOutlined />,
			// 	key: "Dashboard",
			// },
			{
				title: `${t("left_nav_bottom_option_internship_all_students")}`,
				href: "/Internship/AllStudents",
				icon: <TeamOutlined />,
				key: "AllStudents",
			},
			{
				title: `${t("left_nav_bottom_option_internship_all_students_statistics")}`,
				href: "/Internship/AllStudentsStatistics",
				icon: <TeamOutlined />,
				key: "AllStudentsStatistics",
			},
			{
				title: `${t("left_nav_bottom_optiion_internship_students")}`,
				href: "/Internship/Students",
				icon: <TeamOutlined />,
				key: "Students",
			},
			{
				title: `${t("left_nav_bottom_optiion_internship_jobs")}`,
				href: "/Internship/Jobs",
				icon: <ProfileOutlined />,
				key: "Jobs",
			},
			
			{
				title: `${t("left_nav_bottom_optiion_internship_interviewPanel")}`,
				href: "/Internship/InterviewPanel",
				icon: <UserSwitchOutlined />,
				key: "InterviewPanel",
			},
			{
				title: `${t("left_nav_bottom_optiion_internship_chatRoom")}`,
				href: "/Internship/ChatRoom",
				icon: <CommentOutlined />,
				key: "ChatRoom",
			},
		];
	const galkLabPages = isRestrictedAccountType
	?	[
			{
				title: `${t("left_nav_bottom_option_internship_all_students_statistics")}`,
				href: "/GALKLab/AllStudentsStatistics",
				icon: <TeamOutlined />,
				key: "AllStudentsStatistics",
			},
			{
				title: `${t("left_nav_bottom_option_internship_all_students")}`,
				href: "/GALKLab/AllStudents",
				icon: <TeamOutlined />,
				key: "AllStudents",
			},
			{
				title: `${t("left_nav_bottom_optiion_internship_jobs")}`,
				href: "/GALKLab/Jobs",
				icon: <ProfileOutlined />,
				key: "Jobs",
			},
			{
				title: `${t("left_nav_bottom_optiion_application_form")}`,
				href: "/GALKLab/Forms",
				icon: <ProfileOutlined />,
				key: "Application Form",
			},
			// {
			// 	title: `${t("left_nav_bottom_option_teams")}`,
			// 	href: "/GALKLab/Teams",
			// 	icon: <TeamOutlined />,
			// 	key: "Teams",
			// },
		]	
	:	[
			{
				title: `${t("left_nav_bottom_option_internship_all_students_statistics")}`,
				href: "/GALKLab/AllStudentsStatistics",
				icon: <TeamOutlined />,
				key: "AllStudentsStatistics",
			},
			{
				title: `${t("left_nav_bottom_option_internship_all_students")}`,
				href: "/GALKLab/AllStudents",
				icon: <TeamOutlined />,
				key: "AllStudents",
			},
			{
				title: `${t("left_nav_bottom_optiion_internship_students")}`,
				href: "/GALKLab/Students",
				icon: <TeamOutlined />,
				key: "Students",
			},
			{
				title: `${t("left_nav_bottom_option_internship_jobs")}`,
				href: "/GALKLab/Jobs",
				icon: <ProfileOutlined />,
				key: "Jobs",
			},
			// {
			// 	title: `${t("left_nav_bottom_option_teams")}`,
			// 	href: "/GALKLab/Teams",
			// 	icon: <TeamOutlined />,
			// 	key: "Teams",
			// },
			// {
			// 	title: `${t("left_nav_bottom_optiion_internship_interviewPanel")}`,
			// 	href: "/GALKLab/InterviewPanel",
			// 	icon: <UserSwitchOutlined />,
			// 	key: "InterviewPanel",
			// },
			{
				title: `${t("left_nav_bottom_optiion_internship_chatRoom")}`,
				href: "/GALKLab/ChatRoom",
				icon: <CommentOutlined />,
				key: "ChatRoom",
			},
		];
	const cloudSourcingPages = [
		// {
		// 	title: `${t("left_nav_bottom_optiion_internship_dashboard")}`,
		// 	href: "/Freelance/dashboard",
		// 	icon: <AppstoreOutlined />,
		// },
		// {
		// 	title: `${t("left_nav_bottom_optiion_internship_candidates")}`,
		// 	href: "/Freelance/candidates",
		// 	icon: <AppstoreOutlined />,
		// },
		// {
		// 	title: `${t("left_nav_bottom_optiion_internship_jobs")}`,
		// 	href: "/Freelance/jobs",
		// 	icon: <AppstoreOutlined />,
		// },
		// {
		// 	title: `${t("left_nav_bottom_optiion_internship_management")}`,
		// 	href: "/Freelance/management",
		// 	icon: <AppstoreOutlined />,
		// },
		// {
		//   title: "ChatBox",
		//   href: "/Freelance/chatbox",
		//   icon: <ChatIcon />,
		// },
		// {
		//   title: "ActivityLog",
		//   href: "/Freelance/activityLog",
		//   icon: <MouseIcon />,
		// },
	];

	const accountSettingPages = [
		{
			title: `${t("left_nav_bottom_optiion_account_companyprofile")}`,
			href: "/AccountSetting/Companyprofile",
			icon: <BankOutlined />,
			key: "Companyprofile",
		},
		{
			title: `${t("left_nav_bottom_optiion_account_myprofile")}`,
			href: "/AccountSetting/Myprofile",
			icon: <UserOutlined />,
			key: "Myprofile",
		},
		{
			title: `${t("left_nav_bottom_optiion_account_teammembers")}`,
			href: "/AccountSetting/TeamMembers",
			icon: <UsergroupAddOutlined />,
			key: "TeamMembers",
		},
	];

	const getActiveModule = (appModule) => {
		if (appModule === ApplicationModule.Internship) {
			return internshipPages;
		}
		if (appModule === ApplicationModule.GALKLab){
			return galkLabPages;
		}
		if (appModule === ApplicationModule.Freelance) {
			return cloudSourcingPages;
		}
		if (appModule === ApplicationModule.AccountSetting) {
			return accountSettingPages;
		}
		return [];
	};

	return (
		<div style={{ padding: 10 }}>
			{userId && (
				<Menu mode="inline" selectedKeys={[location.pathname.split("/")[2]]}>
					{getActiveModule(appModule).map((item, i) => (
						
						<Menu.Item key={item.key} icon={item.icon}>
							<Link to={item.href}>{item.title} </Link>
						</Menu.Item>
					))}
				</Menu>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	userId: state.firebase.auth.uid,
	appModule: state.app.appModule,
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, { setApplicationModule })(
	withRouter(LeftBottom)
);

import React from "react";
import { connect } from "react-redux";
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

const LeftBottom = ({ location, history, userId }) => {
	const { t } = useTranslation();
	return (
		<div style={{ padding: 10 }}>
			{userId && (
				<Menu mode="inline" selectedKeys={[location.pathname.split("/")[1]]}>
					<Menu.Item key="Home" icon={<AppstoreOutlined />}>
						<Link to="/Home">{t("dashboard")}</Link>
					</Menu.Item>
					<Menu.ItemGroup key="g2" title="Students">
						<Menu.Item key="3rdYearStudents" icon={<TeamOutlined />}>
							<Link to="/3rdYearStudents">3rd Year</Link>
						</Menu.Item>
						<Menu.Item key="4thYearStudents" icon={<TeamOutlined />}>
							<Link to="/4thYearStudents">4th Year</Link>
						</Menu.Item>
						<Menu.Item key="interviewPanel" icon={<UserSwitchOutlined />}>
							<Link to="/interviewPanel">{t("nav_interview_panel")}</Link>
						</Menu.Item>
					</Menu.ItemGroup>
					<Menu.ItemGroup key="g3" title="Management">
						<Menu.Item key="jobPosting" icon={<ProfileOutlined />}>
							<Link to="/jobPosting">{t("nav_job_posting")}</Link>
						</Menu.Item>
						<Menu.Item key="chatRoom" icon={<CommentOutlined />}>
							<Link to="/chatRoom">{t("nav_chat_room")}</Link>
						</Menu.Item>
						<Menu.Item key="myAccount" icon={<UserOutlined />}>
							<Link to="/myAccount">{t("nav_my_account")}</Link>
						</Menu.Item>
						<Menu.Item key="companyProfile" icon={<BankOutlined />}>
							<Link to="/companyProfile">{t("nav_company_profile")}</Link>
						</Menu.Item>
						<Menu.Item key="teamMembers" icon={<UsergroupAddOutlined />}>
							<Link to="/teamMembers">{t("nav_team_member")}</Link>
						</Menu.Item>
					</Menu.ItemGroup>
				</Menu>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	userId: state.firebase.auth.uid,
});

export default connect(mapStateToProps, {})(withRouter(LeftBottom));

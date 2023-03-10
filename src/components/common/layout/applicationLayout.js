import React, { useEffect, useRef } from "react";
import Logo from "../../../assets/images/logo.png";
import { logout } from "../../../actions/authActions";
import { getNotificaion } from "../../../actions/notificationActions"
import IndiaFlag from "../../../assets/images/in.svg";
import JapanFlag from "../../../assets/images/jp.svg";
import LeftNavigation from "../navigation_v2/leftNavigationContainer";
import { Layout, Avatar, Tooltip, Select, Button, Affix, Badge } from "antd";
import { ExportOutlined, BankOutlined, BellFilled } from "@ant-design/icons";
import i18next from "i18next";
import cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./applicationLayout.css";
import Notification from "../notification/notification";
import { onClickNotification } from "../notification/notificationUtility";

const { Header, Content, Sider } = Layout;

const ApplicationLayout = ({
	company,
	userName,
	children,
	history,
	logout,
	profilePicture,
	notifications,
	getNotificaion
}) => {
	const { t } = useTranslation();
	const currentLanguageCode = cookies.get("i18next") || "en";
	const _logout = () => {
		logout(history);
	};
	const unsubscribeFromNotification = useRef(null);

	const handleLanguageChange = (languageCode) => {
		i18next.changeLanguage(languageCode);
	};
	useEffect(() => {
		if (company?.id)
			unsubscribeFromNotification.current = getNotificaion(company?.id)
		return () => {
			let unsubscribe = unsubscribeFromNotification.current
			if (typeof unsubscribe == typeof Function) {
				unsubscribe()
			}
		}
	}, [company?.id])
	return (
		<Layout>
			<Affix offsetTop={0}>
				<div className="applicationLayout-header">
					<Link to={"/Home"}>
						<div className="applicationLayout-header-logo">
							<img src={Logo} alt="Logo" />
						</div>
					</Link>
					<div className="applicationLayout-header-menu">
						<div>
							<span>
								<b>{t("welcome_message", { name: userName })}</b>
							</span>
						</div>

						<div>
							<Avatar
								shape="square"
								src={profilePicture || null}
								style={{
									marginLeft: 10,
									marginRight: 10,
									cursor: "pointer",
								}}
								icon={!profilePicture && <BankOutlined />}
							/>
						</div>
						<div className="notificationiContainer" >
							<div className="badgeContainer"
								onClick={(e) => onClickNotification('notificationDropdown', 'badgeContainer')}>
								<Badge count={notifications?.unreadCount} size="default" className="badgeStyle"  >
									<Avatar shape="square" size="small"
										className="avatarStyle"
										src={<BellFilled style={{ fontSize: '180%' }} />} />
								</Badge>
							</div>
							<div className="notificationDropdown" id="notificationDropdown" >
								<div className="upperTriangle"></div>
								<Notification />
							</div>
						</div>
						<div >
							<Tooltip title={t("logout")} placement="bottomLeft">
								<Button
									type="primary"
									icon={<ExportOutlined />}
									onClick={_logout}
									style={{ marginLeft: 10 }}
								/>
							</Tooltip>
						</div>
						<div>
							<Select
								defaultValue={currentLanguageCode}
								bordered={false}
								onChange={handleLanguageChange}
							>
								<Select.Option value="en">
									<Avatar shape="square" size="small" src={IndiaFlag} />
								</Select.Option>
								<Select.Option value="ja">
									<Avatar shape="square" size="small" src={JapanFlag} />
								</Select.Option>
							</Select>
						</div>
					</div>
				</div>
			</Affix>
			<Layout>
				<Sider width={235} className="applicationLayout-sider">
				<LeftNavigation />
				</Sider>
				<Layout
					style={{
						padding: 0,
						backgroundColor: "#f2f2f2 !important",
					}}
				>
					<Content className="applicationLayout-content">{children}</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	userId: state.firebase.auth.uid,
	userName: state.firebase.profile.name,
	company: state.company.company,
	profilePicture: state.company.companyUserProfilePicture,
	notifications: state.notifications
});

export default connect(mapStateToProps, { logout, getNotificaion })(
	withRouter(ApplicationLayout)
);

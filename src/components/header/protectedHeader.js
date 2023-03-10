import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { withRouter, Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import IndiaFlag from "../../assets/images/in.svg";
import JapanFlag from "../../assets/images/jp.svg";
import { Avatar, Badge, Popover, Menu, Button, Tooltip, Select } from "antd";
import { BellOutlined, LogoutOutlined, BankOutlined } from "@ant-design/icons";
import i18next from "i18next";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import "./protectedHeader.css";

const Header = ({ location, history, logout, company, user }) => {
	const { t } = useTranslation();
	const currentLanguageCode = cookies.get("i18next") || "en";
	const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

	useEffect(() => {
		if (company.notifications) {
			let count = getUnreadCount(company.notifications);
			setUnreadNotificationCount(count);
		}
	}, [company]);

	const _logout = () => {
		logout(history);
	};

	const getUnreadCount = (notifications) => {
		let count = 0;
		notifications.forEach((item) => {
			if (item.readStatus === false) count = count + 1;
		});
		return count;
	};

	const handleLanguageChange = (languageCode) => {
		i18next.changeLanguage(languageCode);
	};

	return (
		<React.Fragment>
			<div style={{ position: "fixed", zIndex: 1, width: "100%" }}>
				<div className="navContainer">
					<div className="brand_Logo">
						<img src={Logo} alt="Logo" />
					</div>
					{user && (
						<div className="navigationMenu">
							<Menu mode="horizontal" selectedKeys={[location.pathname]}>
								<Menu.Item key="/HomePage">
									<Link to="/HomePage">{t("internship_students")}</Link>
								</Menu.Item>
								<Menu.Item key="/Dashboard">
									<Link to="/Dashboard">{t("dashboard")}</Link>
								</Menu.Item>
								<Menu.Item key="/ChatRoom">
									<Link to="/ChatRoom">{t("chat_room")}</Link>
								</Menu.Item>
								<Menu.Item key="/Profile">
									<Link to="/Profile">{t("company_profile")}</Link>
								</Menu.Item>
							</Menu>

							<Avatar
								src={company.logo || null}
								style={{
									marginLeft: 10,
									marginRight: 10,
									cursor: "pointer",
								}}
								icon={!company.logo && <BankOutlined />}
							/>
							<Tooltip title="Logout" placement="bottomLeft">
								<Button
									shape="circle"
									icon={<LogoutOutlined />}
									onClick={_logout}
									style={{ marginLeft: 10 }}
								/>
							</Tooltip>
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
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	user: state.firebase.auth.uid,
	company: state.company.company,
});

export default connect(mapStateToProps, { logout })(withRouter(Header));

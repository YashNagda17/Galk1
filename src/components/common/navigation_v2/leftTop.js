import React from "react";
import { Avatar, Typography, Select, Tooltip } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ApplicationModule } from "../../../utils/models/applicationModules";
import { useTranslation } from "react-i18next";
import { setApplicationModule } from "../../../actions/appActions";
import "./leftTop.css";

const { Title, Text } = Typography;
const { Option } = Select;

const LeftTop = ({ company, appModule, setApplicationModule, history }) => {
	const { t } = useTranslation();
	const { logo, name, nameInEnglish, industry } = company;

	const handleModuleChange = (value) => {
		if (value === ApplicationModule.Internship) {
			setApplicationModule(ApplicationModule.Internship);
			history.push("/Internship/AllStudents");
		} else if (value === ApplicationModule.GALKLab) {
			setApplicationModule(ApplicationModule.GALKLab);
			history.push("/GALKLab/AllStudentsStatistics");
		} else if (value === ApplicationModule.AccountSetting) {
			setApplicationModule(ApplicationModule.AccountSetting);
			history.push("/AccountSetting/Companyprofile");
		}
	};

	return (
		<div
			style={{
				width: "100%",
				textAlign: "center",
				marginTop: 20,
			}}
		>
			<Avatar
				style={{ backgroundColor: "#083b6e", marginBottom: 10 }}
				shape="square"
				size={70}
				icon={!logo && <BankOutlined />}
				src={logo}
			/>
			<Title level={4} style={{ color: "#f2f2f2" }}>
				{name}
				<br />
				{nameInEnglish && `${nameInEnglish}`}
			</Title>
			<Text type="secondary" style={{ color: "#f3f3f3" }}>
				{industry}
			</Text>

			<Tooltip 
				title={company.website == ""
					? t("complete_company_profile_functionality")
					: ""
				}
			>
				<Select
					value={appModule}
					onChange={handleModuleChange}
					className="appModule_dropdown_root"
					disabled={company.website == ""}
				>
					<Option
						value={ApplicationModule.Internship}
						className="appModule_dropdown_option"
					>
						{t("left_nav_top_dropdownOptiion_Internship")}
					</Option>
					<Option
						value={ApplicationModule.GALKLab}
						className="appModule_dropdown_option"
					>
						{t("left_nav_top_dropdownOptiion_GALKLab")}
					</Option>
					<Option
						value={ApplicationModule.AccountSetting}
						className="appModule_dropdown_option"
					>
						{t("left_nav_top_dropdownOptiion_accountSetting")}
					</Option>
				</Select>
			</Tooltip>
		</div>
	);
};

const mapStateToProps = (state) => ({
	company: state.company.company,
	appModule: state.app.appModule,
});

export default connect(mapStateToProps, { setApplicationModule })(
	withRouter(LeftTop)
);

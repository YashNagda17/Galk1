import React from "react";
import { Avatar, Typography } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

const { Title, Text } = Typography;

const LeftTop = ({ company }) => {
	const { logo, name, nameInEnglish, industry } = company;
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
				size={50}
				icon={!logo && <BankOutlined />}
				src={logo}
			/>
			<Title level={5} style={{ color: "#f2f2f2" }}>
				{name}
				{nameInEnglish && ` / ${nameInEnglish}`}
			</Title>
			<Text type="secondary" style={{ color: "#f3f3f3" }}>
				{industry}
			</Text>
		</div>
	);
};

const mapStateToProps = (state) => ({
	company: state.company.company,
});

export default connect(mapStateToProps, {})(LeftTop);

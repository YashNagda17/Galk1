import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getGALKNews } from "../../actions/dashboardActions";
import { useTranslation } from "react-i18next";

import { Card, Skeleton, Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import "./dashboardStyles.css";

const GALKNews = ({ isLoading, newsList, getGALKNews }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const { t } = useTranslation();

	useEffect(() => {
		getGALKNews();
	}, []);

	const totalNewsCount = newsList ? newsList.length : 0;
	const ifLeftArrowDisable =
		totalNewsCount === 0 || currentIndex === 0 ? true : false;
	const ifRightArrowDisable =
		totalNewsCount < 2 || currentIndex === totalNewsCount - 1 ? true : false;

	const currentNews = newsList && newsList.length > 0 && newsList[currentIndex];

	return (
		<Card
			className="dashboard-bottom-card-container"
			title={`${t("internship_dashboard_news_title")}`}
			extra={
				<React.Fragment>
					<Button
						icon={<LeftOutlined />}
						disabled={ifLeftArrowDisable}
						onClick={() => setCurrentIndex(currentIndex - 1)}
					/>
					<Button
						icon={<RightOutlined />}
						disabled={ifRightArrowDisable}
						onClick={() => setCurrentIndex(currentIndex + 1)}
					/>
				</React.Fragment>
			}
		>
			{isLoading && (
				<>
					<div
						style={{ height: 180, width: "100%", backgroundColor: "#f2f2f2" }}
					/>
					<br />
					<Skeleton paragraph={{ rows: 2 }} active />
				</>
			)}
			{currentNews && !isLoading && (
				<Card
					cover={<img alt="example" src={currentNews.coverPhoto} />}
					bordered={false}
					size="small"
				>
					<Card.Meta
						title={currentNews.title}
						description={currentNews.description}
					/>
				</Card>
			)}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.dashboard.isGALKNewsLoading,
	newsList: state.dashboard.GALKNews,
});

export default connect(mapStateToProps, {
	getGALKNews,
})(GALKNews);

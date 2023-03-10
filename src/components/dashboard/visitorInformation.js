import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getVsitorList } from "../../actions/dashboardActions";

import { Card, List, Skeleton, Avatar, Space, Empty } from "antd";

import "./dashboardStyles.css";

const VisitorInformation = ({
	companyId,
	isLoading,
	visitorList,
	getVsitorList,
}) => {
	useEffect(() => {
		if (companyId) {
			getVsitorList(companyId);
		}
	}, [companyId]);

	return (
		<Card className="dashboard-bottom-card-container" title="Recent Visitors">
			<List>
				{isLoading && (
					<>
						<List.Item key={1}>
							<Space>
								<Skeleton.Avatar active shape="square" size={60} />
								<Skeleton.Input style={{ width: 200 }} active />
							</Space>
						</List.Item>
						<List.Item key={2}>
							<Space>
								<Skeleton.Avatar active shape="square" size={60} />
								<Skeleton.Input style={{ width: 200 }} active />
							</Space>
						</List.Item>
						<List.Item key={3}>
							<Space>
								<Skeleton.Avatar active shape="square" size={60} />
								<Skeleton.Input style={{ width: 200 }} active />
							</Space>
						</List.Item>
					</>
				)}
				{!isLoading &&
					visitorList &&
					visitorList.slice(0, 5).map((item, index) => (
						<List.Item key={index}>
							<List.Item.Meta
								avatar={
									<Avatar src={item.profilePic} shape="square" size={60} />
								}
								title={item.name}
								description={item.collegeName}
							/>
						</List.Item>
					))}
				{!isLoading && visitorList && visitorList.length < 1 && (
					<Empty key={1} />
				)}
			</List>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.dashboard.isVisitorListLoading,
	visitorList: state.dashboard.visitorList,
	companyId: state.firebase.profile.companyId,
});

export default connect(mapStateToProps, { getVsitorList })(VisitorInformation);

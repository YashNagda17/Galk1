import React from "react";
import { Card, List, Empty } from "antd";

export default function StudentSocialFeed() {
	return (
		<Card
			className="dashboard-bottom-card-container"
			title="Student Social Feed"
		>
			<List>
				<Empty />
			</List>
		</Card>
	);
}

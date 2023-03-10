import React from "react";
import "./region.css";

export const Region = ({ children, style }) => (
	<div className="region" style={style}>
		{children}
	</div>
);

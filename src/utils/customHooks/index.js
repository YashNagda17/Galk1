import React, { useEffect, useRef } from "react";

export const usePreviousState = (value) => {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};

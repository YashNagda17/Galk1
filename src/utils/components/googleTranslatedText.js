import React, { useState, useEffect } from "react";
import { googleTranslate } from "../configs/googleTranslateConfig";

export const TranslatedToEnglish = (props) => {
	const [translatedText, setTranslatedText] = useState("");

	useEffect(() => {
		googleTranslate.translate(
			props.originalText,
			"en",
			function (err, translation) {
				setTranslatedText(translation.translatedText);
			}
		);
	}, []);

	return <p style={{ whiteSpace: "pre-wrap" }}>{translatedText}</p>;
};

import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { googleTranslate } from "../configs/googleTranslateConfig";

const TranslateOnDemand = (props) => {
	const { text } = props;
	const [translatedText, setTranslatedText] = useState(text);
	const [translateLanguage, setTranslateLanguage] = useState("en");

	const translateHandler = (e) => {
		e.preventDefault();
		if (translateLanguage === "en") {
			translate("ja");
			setTranslateLanguage("ja");
		} else {
			translate("en");
			setTranslateLanguage("en");
		}
	};

	useEffect(() => {
		translate("en");
	}, []);

	const translate = (language) => {
		googleTranslate.translate(text, language, (err, translation) => {
			setTranslatedText(translation.translatedText);
		});
	};

	return (
		<>
			<Button type="link" onClick={translateHandler} style={{ paddingLeft: 0 }}>
				{translateLanguage === "en"
					? "Translate to Japanese..."
					: "Translate to English..."}
			</Button>
			<br />
			{translatedText}
		</>
	);
};

export default TranslateOnDemand;

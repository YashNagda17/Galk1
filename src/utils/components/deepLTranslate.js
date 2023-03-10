import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { languageCode } from "../constants";

const deepLAuthKey = "7169916a-aebb-5fa3-bb6c-429b9acd0d98:fx";
const deepLBaseURL = "https://api-free.deepl.com/v2/translate";

const TranslateText = ({ originalText, to }) => {
	const [translatedText, setTranslatedText] = useState(originalText);
	const [translateTo, setTranslateTo] = useState(to);

	// const deepLApiURL = `${deepLBaseURL}?auth_key=${deepLAuthKey}&text=${originalText}&&source_lang=${from}&target_lang=${to}`;

	useEffect(() => {}, []);

	const translateHandler = (e) => {
		e.preventDefault();
		if (translateTo === languageCode.JAPANESE) {
			translate(languageCode.ENGLISH, languageCode.JAPANESE);
			setTranslateTo(languageCode.ENGLISH);
		} else {
			translate(languageCode.JAPANESE, languageCode.ENGLISH);
			setTranslateTo(languageCode.JAPANESE);
		}
	};

	const translate = async (from, to) => {
		const deepLApiURL = `${deepLBaseURL}?auth_key=${deepLAuthKey}&text=${translatedText}&&source_lang=${from}&target_lang=${to}`;

		const response = await fetch(deepLApiURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		response
			.json()
			.then((data) => setTranslatedText(data.translations[0].text));
	};

	return (
		<>
			<Button type="link" onClick={translateHandler} style={{ paddingLeft: 0 }}>
				{translateTo === languageCode.JAPANESE
					? "Translate to Japanese..."
					: "Translate to English..."}
			</Button>
			<br />
			{translatedText}
		</>
	);
};

export default TranslateText;

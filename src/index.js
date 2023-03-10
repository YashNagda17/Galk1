import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { firebase } from "./utils/configs/firebaseConfig";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import reportWebVitals from "./reportWebVitals";

//Localization configs
i18next
	.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		supportedLngs: ["en", "ja"],
		fallbackLng: "en",
		debug: false,
		// Options for language detector
		detection: {
			order: ["path", "cookie", "htmlTag"],
			caches: ["cookie"],
		},
		react: { useSuspense: false },
		backend: {
			loadPath: "/assets/languages/{{lng}}/translation.json",
		},
	});

// ReactReduxFirebaseProvider configs
const rrfConfig = {
	useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
	userProfile: "CompanyUserProfile",
	attachAuthIsReady: true,
};
const rrfProps = {
	firebase: firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance, // Create firestore instead of craete it in fbConfig.js
};

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<App />
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

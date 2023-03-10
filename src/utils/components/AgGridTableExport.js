import React, { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import {
	getAdmissionYearForSecondYearStudents,
	getAdmissionYearForThirdYearStudents,
	getAdmissionYearForFourthYearStudents,
} from "../functions/javaScriptHelper";
import { RestrictedCompanyAccountType } from "../constants";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const createBlob = (response) => response.blob();

const fromBlobToBase64 = (blob) =>
	new Promise((res) => {
		var reader = new FileReader();
		reader.onloadend = () => res(reader.result);
		reader.readAsDataURL(blob);
	});

const createBase64ImageFromURL = (url) =>
	fetch(url, {
		method: "GET",
	})
		.then(createBlob)
		.then((blob) => fromBlobToBase64(blob))
		.catch((err) => console.log("Image Fetch err:", err));

const evaluateStudentGrade = (studentAdmissionYear) => {
	const second = getAdmissionYearForSecondYearStudents();
	const third = getAdmissionYearForThirdYearStudents();
	const fourth = getAdmissionYearForFourthYearStudents();

	if (studentAdmissionYear === second.toString()) return "2nd Year";
	if (studentAdmissionYear === third.toString()) return "3rd Year";
	if (studentAdmissionYear === fourth.toString()) return "4th Year";
};

const AgGridTableExport = ({
	company,
	studentList,
	documentName,
	companyAccountType,
}) => {
	const [rowData, setRawData] = useState([]);

	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);

	useEffect(() => {
		async function populateStudenDataWithBase64Image() {
			let allPromise = [];
			let studentDataWithImage64 = [];

			studentList.forEach((x, i) => {
				let promise = createBase64ImageFromURL(x.img).then((res) => {
					let studentWithImage64 = {
						slNo: i + 1,
						photo: res,
						name: isRestrictedAccountType ? "" : x.name,
						gender: x.gender,
						iit: x.collegeName,
						grade: evaluateStudentGrade(x.yearOfAdmission),
						major: x.branchName,
						JEERank: x.JEERank,
						CGPA: x.collegeGrade,
						skills: x.skills ? x.skills.toString() : "",
						secondarySkills: x.secondarySkills
							? x.secondarySkills.toString()
							: "",
						education: x.education,
						project: x.project,
						placeOfBirth: x.placeOfBirth,
						eatingHabbit: x.eatingHabbit,
						spokenLanguages: x.spokenLanguages,
					};
					studentWithImage64["slNo"] = studentDataWithImage64.length + 1;
					studentDataWithImage64.push(studentWithImage64);
				});
				allPromise.push(promise);
			});
			await Promise.all(allPromise).then(() =>
				setRawData(studentDataWithImage64)
			);
		}
		if (studentList.length) {
			populateStudenDataWithBase64Image();
		}
	}, [studentList]);

	const [gridApi, setGridApi] = useState(null);

	const exportDataToExcel = () => {
		gridApi.exportDataAsExcel();
	};

	const onGridReady = (params) => {
		setGridApi(params.api);
		// setGridColumnApi(params.columnApi);
	};
	const studentImgRenderer = (params) => {
		return `<img height="150" id="${params.data.photo}" alt="${params.data.photo}" src="${params.data.photo}" width="150">`;
	};

	const studentEducationValueFormatter = (params) => {
		const education = params.data.education;
		let educationNode = "";
		education.forEach((edu) => {
			educationNode =
				educationNode +
				` Degree: ${edu.degree}\n Duration: ${edu.startDate}~${
					edu.endDate
				} \n InstituteName: ${edu.instituteName}${edu.description || ""}\n\n`;
		});
		return educationNode;
	};

	const studentProjectValueFormatter = (params) => {
		const project = params.data.project;
		let projectNode = "";
		project.forEach((proj) => {
			projectNode =
				projectNode +
				`Type: ${proj.type || "n/a"}\nTitle: ${proj.title}\nDuration: ${
					proj.startDate
				}~${proj.endDate}\nSkills used: ${proj.skillsUsed
					.map((x) => (x.label ? x.label : x))
					.toString()}\n\n`;
		});
		return projectNode;
	};

	const studentPersonalDetailsValueFormatter = (params) => {
		const { placeOfBirth, eatingHabbit, spokenLanguages } = params.data;
		let projectNode = `Hometown: ${placeOfBirth || "-n/a-"}\nDietary: ${
			eatingHabbit || "-n/a-"
		}\nSpeaking Language: ${
			spokenLanguages ? spokenLanguages.toString() : "-n/a-"
		}\n\n`;
		return projectNode;
	};

	const newLineFormatter = (param) => {
		return param.value.replaceAll("\n", "<br/>");
	};

	return (
		<>
			<div>
				<button
					onClick={exportDataToExcel}
					disabled={!rowData.length}
					style={{ marginBottom: "5px", fontWeight: "bold" }}
				>
					Export to Excel
				</button>
			</div>
			<div
				id="studentExportGrid"
				className="ag-theme-alpine"
				style={{ height: 400, width: "100%", display: "none" }}
			>
				<AgGridReact
					rowData={rowData}
					onGridReady={onGridReady}
					defaultColDef={{
						cellClass: "multiline",
					}}
					defaultExcelExportParams={{
						addImageToCell: function (rowIndex, col, value) {
							if (col.colId !== "photo") {
								return;
							}
							//   var countryCode = countryCodes[value];
							return {
								image: {
									id: `${rowIndex}_studentImage`,
									// base64: createBase64ImageFromID(
									// 	document.getElementById(value)
									// ),
									base64: value,
									imageType: "jpg",
									height: 200,
									width: 200,
									fitCell: false,
									position: {
										offsetX: 25,
										offsetY: 25,
									},
								},
							};
						},
					}}
					excelStyles={[
						{
							id: "headerGroup",
							alignment: { horizontal: "Center" },
							font: { bold: true },
						},
						{
							id: "header",
							alignment: { vertical: "Center" },
							font: { bold: true },
						},
						{
							id: "multiline",
							alignment: { wrapText: true, vertical: "Center", horizontal: "Center" },
						},
						{
							id: "cell",
							alignment: { horizontal: "Center", vertical: "Center" },
						},
					]}
				>
					<AgGridColumn headerName=" ">
						<AgGridColumn width={100} field="slNo" />
					</AgGridColumn>
					<AgGridColumn headerName="Candidate Information">
						{/* <AgGridColumn
							field="photo"
							cellStyle={{ "background-color": "green" }}
							width={250}
							autoHeight={true}
							cellRenderer={studentImgRenderer}
						/> */}
						{!isRestrictedAccountType && <AgGridColumn field="name" />}
						<AgGridColumn field="gender" />
						<AgGridColumn field="iit" />
						<AgGridColumn field="major" />
						<AgGridColumn field="JEERank" />
						<AgGridColumn field="CGPA" />
						<AgGridColumn
							field="skills"
							headerName="Primary technical skills"
						/>
						<AgGridColumn
							field="secondarySkills"
							headerName="Secondary tecnical skills"
						/>
						{/* <AgGridColumn field="strength" /> */}
						<AgGridColumn
							autoHeight={true}
							width={500}
							wrapText={true}
							field="education"
							headerName="Education details"
							valueGetter={studentEducationValueFormatter}
							cellRenderer={newLineFormatter}
						/>
						<AgGridColumn
							autoHeight={true}
							width={500}
							wrapText={true}
							field="project"
							headerName="Project details"
							valueGetter={studentProjectValueFormatter}
							cellRenderer={newLineFormatter}
						/>
						{/* <AgGridColumn
							autoHeight={true}
							width={500}
							wrapText={true}
							headerName="Personal details"
							valueGetter={studentPersonalDetailsValueFormatter}
							cellRenderer={newLineFormatter}
						/> */}
					</AgGridColumn>
				</AgGridReact>
			</div>
		</>
	);
};

export default AgGridTableExport;

import React from "react";
import moment from "moment";
// import { TranslatedToEnglish } from "../googleTranslatedText";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

const generateHeader = (documentName) => {
  if (documentName === "StudentSummaryList") {
    return [
      { label: "No.", key: "slNo" },
      { label: "Profile picture", key: "profilePic" },
      { label: "Name", key: "name" },
      { label: "Gender", key: "gender" },
      { label: "Willings Recommended", key: "recommended" },
      { label: "IIT", key: "collegeName" },
      { label: "Major", key: "branchName" },
      { label: "CGPA", key: "collegeGrade" },
      { label: "Programming test score", key: "galkScore" },
      { label: "Computing skills", key: "skills" },
      { label: "Interviewer comment in general", key: "adminComments" },
      {
        label: "What made you interested in working in Japan?",
        key: "whyInJapan",
      },
      {
        label: "What are your strengths and weaknesses?",
        key: "strengthAndWeakness",
      },
      { label: "What can you contribute to us?", key: "whatToContribute" },
    ];
  } else {
    return [
      { label: "No", key: "slNo" },
      { label: "氏名", key: "name" },
      { label: "性別", key: "gender" },
      { label: "所属校", key: "collegeName" },
      { label: "専攻", key: "branchName" },
      { label: "GALKScore", key: "galkScore" },
      { label: "CGPA", key: "collegeGrade" },
      { label: "スキルセット", key: "skills" },
      { label: "プロジェクト", key: "project" },
      { label: "証書", key: "certificate" },
      { label: "コメント", key: "adminComments" },
      { label: "趣味", key: "personalInterest" },
      { label: "食事", key: "eatingHabbit" },
      { label: "Survey", key: "Survey" },
    ];
  }
};

const ExportToExcel = ({ documentName, company, studentList, surveyList }) => {
  const { t } = useTranslation();
  const companyId = company.id;
  const generateRequiredDataFromSource = (studentDataList, surveyList) => {
    var formatterObjectArray = [];
    if (studentDataList) {
      if (surveyList && surveyList.length > 0) {
        formatterObjectArray = studentDataList.map((student, index) => {
          return {
            slNo: index + 1,
            id: student.id,
            name: student.name,
            gender: student.gender || "",
            collegeName: student.collegeName,
            branchName: student.branchName,
            galkScore: student.testScore || "n/a",
            collegeGrade: student.collegeGrade.split("/")[0],
            skills: student.skills,
            project: student.project,
            certificate: student.certificate,
            adminComments: student.adminComments || "",
            personalInterest: student.personalInterest || [],
            eatingHabbit: student.eatingHabbit || "",
            survey: surveyList.filter((s) =>
              s.surveyAnswerList
                .map((ans) => ans.studentId)
                .includes(student.id)
            ),
          };
        });
      } else {
        formatterObjectArray = studentDataList.map((student, index) => {
          return {
            slNo: index + 1,
            id: student.id,
            img: student.img,
            name: student.name,
            gender: student.gender || "",
            collegeName: student.collegeName,
            branchName: student.branchName,
            galkScore: student.testScore || "n/a",
            collegeGrade: student.collegeGrade.split("/")[0],
            skills: student.skills,
            project: student.project,
            certificate: student.certificate,
            adminComments: student.adminComments || "",
            personalInterest: student.personalInterest || [],
            eatingHabbit: student.eatingHabbit || "",
            survey: null,
            recommended: student.recommendedToCompanies
              ? student.recommendedToCompanies
                  .map((x) => x.key)
                  .includes(companyId)
              : false,
            selfStrength: student.selfStrength || "n/a",
            selfWeakness: student.selfWeakness || "n/a",
            whatToContribute: student.whatToContribute || "n/a",
            whyInJapan: student.whyInJapan || "n/a",
          };
        });
      }
      return formatterObjectArray;
    }

    return [];
  };

  const exportDocument = () => {
    let tableData = document.getElementById("summary-table-to-xls").outerHTML;
    let a = document.createElement("a");
    a.href = `data:application/vnd.ms-excel, ${encodeURIComponent(tableData)}`;
    a.download = `${documentName}_${company.name}_${moment()
      .format("L")
      .replace("/", "_")}`;
    a.click();
  };

  if (documentName === "StudentSummaryList") {
    return (
      <React.Fragment>
        {/* <ReactHTMLTableToExcel
          id="summary-test-table-xls-button"
          className="btn btn-default iq-mb-10"
          table="summary-table-to-xls"
          filename={`${documentName}_${company.name}_${moment()
            .format("L")
            .replace("/", "_")}`}
          sheet={`${documentName}`}
          buttonText="ExportStudentSummary"
        /> */}
        <Button
          type="primary"
          size="small"
          onClick={exportDocument}
          style={{ float: "right" }}
        >
          {t("export_student_summary")}
        </Button>
        <table id="summary-table-to-xls" style={{ display: "none" }}>
          <tbody>
            <tr>
              <td style={{ border: "2px solid black" }}>
                <b>Company Name: </b>
              </td>
              <td style={{ border: "2px solid black" }}>{company.name}</td>
            </tr>
            <tr>
              <td style={{ border: "2px solid black" }}>
                <b>Document type: </b>
              </td>
              <td style={{ border: "2px solid black" }}>{`${documentName}`}</td>
            </tr>
            <tr>
              <td style={{ border: "2px solid black" }}>
                <b>Date: </b>
              </td>
              <td style={{ border: "2px solid black" }}>{`${moment().format(
                "LL"
              )}`}</td>
            </tr>
            <tr>
              <td colSpan={19}></td>
            </tr>
            <tr>
              {generateHeader(documentName).map((header, i) =>
                // header.key === "profilePic" ||
                header.key === "whyInJapan" ||
                header.key === "strengthAndWeakness" ||
                header.key === "adminComments" ||
                header.key === "whatToContribute" ? (
                  <th
                    colSpan={3}
                    key={i}
                    style={{
                      color: "#b0b0b0",
                      fontWeight: "bold",
                      backgroundColor: "#3b4044",
                      border: "2px solid #b0b0b0",
                    }}
                  >
                    {header.label}
                  </th>
                ) : (
                  <th
                    key={i}
                    style={{
                      color: "#b0b0b0",
                      fontWeight: "bold",
                      backgroundColor: "#3b4044",
                      border: "2px solid #b0b0b0",
                    }}
                  >
                    {header.label}
                  </th>
                )
              )}
            </tr>
            {generateRequiredDataFromSource(studentList).map(
              (student, index) => (
                <tr key={index}>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                      width: 135,
                    }}
                  >
                    {student.slNo}
                  </td>
                  <td>
                    <img src={student.img} alt="" height="100" width="132" />
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.name}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.gender}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                      fontSize: 40,
                    }}
                  >
                    <b>{student.recommended === true ? "*" : ""}</b>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.collegeName}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.branchName}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.collegeGrade}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.testScore}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.skills.toString()}
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      verticalAlign: "top",
                      border: "2px solid black",
                      width: 400,
                    }}
                  >
                    {student.adminComments}
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      verticalAlign: "top",
                      border: "2px solid black",
                      width: 400,
                    }}
                  >
                    {student.whyInJapan}
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    <span>
                      <strong>Strength:</strong>
                      {student.selfStrength}
                      <br />
                      <strong>Weakness:</strong>
                      {student.selfWeakness}
                    </span>
                  </td>

                  <td
                    colSpan={3}
                    style={{
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.whatToContribute}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="btn btn-default iq-mb-10"
          table="table-to-xls"
          filename={`${documentName}_${company.name}_${moment()
            .format("L")
            .replace("/", "_")}`}
          sheet={`${documentName}`}
          buttonText={`${t("download_list")}(Excel)`}
        />
        <table id="table-to-xls" style={{ display: "none" }}>
          <tbody>
            <tr>
              <td style={{ border: "2px solid black" }}>
                <b>Company Name: </b>
              </td>
              <td style={{ border: "2px solid black" }}>{company.name}</td>
            </tr>
            <tr>
              <td style={{ border: "2px solid black" }}>
                <b>Document type: </b>
              </td>
              <td style={{ border: "2px solid black" }}>
                {`${documentName}`}.
              </td>
            </tr>
            <tr>
              <td style={{ border: "2px solid black" }}>
                <b>Date: </b>
              </td>
              <td style={{ border: "2px solid black" }}>{`${moment().format(
                "LL"
              )}`}</td>
            </tr>
            <tr>
              <td colSpan={19}></td>
            </tr>
            <tr>
              {generateHeader(generateHeader).map((header, i) =>
                header.key === "certificate" ||
                header.key === "project" ||
                header.key === "adminComments" ||
                header.key === "Survey" ? (
                  <th
                    colSpan={3}
                    key={i}
                    style={{
                      color: "#b0b0b0",
                      fontWeight: "bold",
                      backgroundColor: "#3b4044",
                      border: "2px solid #b0b0b0",
                    }}
                  >
                    {header.label}
                  </th>
                ) : (
                  <th
                    key={i}
                    style={{
                      color: "#b0b0b0",
                      fontWeight: "bold",
                      backgroundColor: "#3b4044",
                      border: "2px solid #b0b0b0",
                    }}
                  >
                    {header.label}
                  </th>
                )
              )}
            </tr>
            {generateRequiredDataFromSource(studentList, surveyList).map(
              (student, index) => (
                <tr key={index}>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.slNo}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.name}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.gender}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.collegeName}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.branchName}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.testScore}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.collegeGrade}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.skills.toString()}
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      verticalAlign: "top",
                      border: "2px solid black",
                      width: 600,
                    }}
                  >
                    {student.project.map((project, index) => (
                      <table key={index}>
                        <tbody>
                          <tr>
                            <th
                              colSpan={3}
                              style={{ backgroundColor: "#b4b4b4" }}
                            >
                              <b>{project.title}</b>
                            </th>
                          </tr>
                          <tr>
                            <td colSpan={3} style={{ width: 600 }}>
                              <b>Description:</b>
                              <br />
                              {project.description}
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3}>
                              <b>Technical skills:</b>{" "}
                              {project.skillsUsed
                                .map((skill) => skill.label)
                                .toString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      verticalAlign: "top",
                      border: "2px solid black",
                      width: 600,
                    }}
                  >
                    {student.certificate.map((certificate, index) => (
                      <table key={index}>
                        <tbody>
                          <tr>
                            <th
                              style={{ backgroundColor: "#b4b4b4" }}
                              colSpan={3}
                            >
                              <b>{certificate.title}</b>
                            </th>
                          </tr>
                          <tr>
                            <td
                              colSpan={3}
                              style={{
                                verticalAlign: "top",
                                width: 600,
                              }}
                            >
                              <React.Fragment>
                                <b>Description:</b>
                                <br />
                                {certificate.description}
                                <br />
                                {/* <TranslatedText
                                  text={certificate.description}
                                /> */}
                                {/* <TranslatedToEnglish
                                  originalText={certificate.description}
                                /> */}
                              </React.Fragment>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      verticalAlign: "top",
                      border: "2px solid black",
                      width: 400,
                    }}
                  >
                    <React.Fragment>
                      <br />
                      {student.adminComments}
                      <br />
                      {/* <TranslatedText text={student.adminComments} /> */}
                      {/* <TranslatedToEnglish
                        originalText={student.adminComments}
                      /> */}
                    </React.Fragment>
                  </td>
                  <td
                    style={{
                      verticalAlign: "top",
                      border: "2px solid black",
                      width: 600,
                    }}
                  >
                    {student.personalInterest.map((personalInterest, index) => (
                      <div key={index}>
                        <span>
                          <b>
                            {personalInterest.title}
                            {" :"}
                          </b>
                        </span>
                        <br className="excelCellBreak" />
                        <span>
                          <b>Description:</b>
                          {personalInterest.description}
                          <br />
                          {/* <TranslatedText text={personalInterest.description} /> */}
                          {/* <TranslatedToEnglish
                            originalText={personalInterest.description}
                          /> */}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "top",
                      border: "2px solid black",
                    }}
                  >
                    {student.eatingHabbit}
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      verticalAlign: "top",
                      border: "2px solid black",
                      width: 600,
                    }}
                  >
                    {student.survey &&
                      student.survey.map((survey, index) => (
                        <table key={index}>
                          <tbody>
                            <tr>
                              {`Survey#${index}: `}
                              {survey.surveyDescription}
                            </tr>
                            {survey.surveyQuestionList.map((question, i) => (
                              <React.Fragment>
                                <tr>
                                  <th
                                    style={{ backgroundColor: "#b4b4b4" }}
                                    colSpan={3}
                                  >
                                    <b>{question.question}</b>
                                  </th>
                                </tr>
                                <tr>
                                  <td
                                    colSpan={3}
                                    style={{
                                      verticalAlign: "top",
                                      width: 600,
                                    }}
                                  >
                                    <React.Fragment>
                                      <b>Answer:</b>
                                      <br />
                                      {
                                        survey.surveyAnswerList.find(
                                          (ans) => ans.studentId === student.id
                                        ).answer[i]
                                      }
                                    </React.Fragment>
                                  </td>
                                </tr>
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      ))}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
};

export default ExportToExcel;

import React, { useState } from 'react';
import { Region } from "../layout/region";
import {Helmet} from "react-helmet";
import jsPDF from 'jspdf';
import { useTranslation } from "react-i18next";
import GalkRecruitPdf from './galkrecruitpdf';

export default function App_Form_Galk_Lab() {

  const [doe, setdoe] = useState('');
  const [companyname, setcomname] = useState('');
  const [companyaddress, setcaddress] = useState('');
  const [companyphone, setcphone] = useState('');
  const [nostudents, setnostudents] = useState('');
  const [applicantname, setaname] = useState('');
  const [applicantemail, setaemail] = useState('');
  const [contactname, setcname] = useState('');
  const [contactemail, setcemail] = useState('');
  const [startdate, setsd] = useState('');
  const [signature, setsign] = useState([]);
  const data = new FileReader()
	data.addEventListener('load',()=>{
		setsign(data.result)
	})

  const { t } = useTranslation();
  

  return (
	<div>
		<Helmet>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
		</Helmet>

		<Region>
			<h1>
				Galk Lab Form
			</h1>
			<form id= "form1" onSubmit={ (e) => {
				e.preventDefault();
				var doc = new jsPDF('p');
				GalkRecruitPdf(doc, doe, companyname, companyaddress, 
					companyphone, applicantname,
					applicantemail, contactname,
					contactemail, startdate,
					signature, nostudents,
					);
				
				doc.save("application_copy.pdf");
				}}
			>
			<table>
				<tbody>
				<tr>
					<td><label htmlFor="doe">{t("Date of Entry")}</label></td>
					<td><input type="date" id="doe" value={doe} onChange={(e) => setdoe(e.target.value)} required /></td>
				</tr>
				<tr>
					<td><label htmlFor="companyname">{t("Company Name")}</label></td>
					<td><input type="text" id="companyname" value={companyname} onChange={(e) => setcomname(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="companyaddress">{t("Company Address")}</label></td>
					<td><input type="text" id="companyaddress" value={companyaddress} onChange={(e) => setcaddress(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="companyphone">{t("Company Phone")}</label></td>
					<td><input type="tel" id="companyphone" value={companyphone} onChange={(e) => setcphone(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="applicantname">{t("Applicant Name")}</label></td>
					<td><input type="text" id="applicantname" value={applicantname} onChange={(e) => setaname(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="applicantemail">{t("Applicant Email")}</label></td>
					<td><input type="email" id="applicantemail" value={applicantemail} onChange={(e) => setaemail(e.target.value)} required /></td>
				</tr>
				<tr>
					<td><label htmlFor="contactname">{t("Contact Name")}</label></td>
					<td><input type="text" id="contactname" value={contactname} onChange={(e) => setcname(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="contactemail">{t("Contact Email")}</label></td>
					<td><input type="email" id="contactemail" value={contactemail} onChange={(e) => setcemail(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="nostudents">{t("Number of Students to be Hired")}</label></td>
					<td><input type="number" id="nostudents" value={nostudents} onChange={(e) => setnostudents(e.target.value)} required /></td>
				</tr>
				<tr>
					<td><label htmlFor="startdate">{t("Start Date")}</label></td>
					<td><input type="date" id="startdate" value={startdate} onChange={(e) => setsd(e.target.value)} /></td>
				</tr>


				<h1>Upload Signature</h1>
				<tr>
					<td><label htmlFor="signature">{t("Signature")}</label></td>
					<td><input type="file" id="signature" onChange={(e) => {
						const fileExtension = e.target.files[0].name.split(".").at(-1);
						const allowedFileTypes = ["jpg"];
						
						if (!allowedFileTypes.includes(fileExtension)) {
							window.alert(`File does not support. Files type must be ${allowedFileTypes.join(", ")}`);
							return false;
						}
						data.readAsDataURL(e.target.files[0])
						setsign(data)
						
					}
						} /></td>
				</tr>



			
				</tbody>
			</table>
			<input type="submit" value={t("Submit")} />
			</form>
		</Region>
	</div>
	
  );
  }

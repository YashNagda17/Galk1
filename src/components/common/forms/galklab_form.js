import React, { useState } from 'react';
import { Region } from "../layout/region";
import {Helmet} from "react-helmet";
import jsPDF from 'jspdf';
import { useTranslation } from "react-i18next";
import GalkLabPdf from "./galklabpdf";


export default function App_Form_Galk_Lab() {

  const [doe, setdoe] = useState('');
  const [companyname, setcomname] = useState('');
  const [companyaddress, setcaddress] = useState('');
  const [companyphone, setcphone] = useState('');
  const [applicantname, setaname] = useState('');
  const [applicantemail, setaemail] = useState('');
  const [contactname, setcname] = useState('');
  const [contactemail, setcemail] = useState('');
  const [startdate, setsd] = useState('');
  const [signature, setsign] = useState('');
  const data = new FileReader()
  data.addEventListener('load',()=>{
	setsign(data.result)
  })

  const [d1, setd1] = useState('');
  const [d2, setd2] = useState('');
  const [d3, setd3] = useState('');
  const { t } = useTranslation();
  

  return (
	<div>
		<Helmet>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
		</Helmet>

		<Region>
			<h1>
				Galk Lab Application Form
			</h1>
			<h2> The Company applies for the use of the lab-based development service (service name: GALK) provided by Willings,Inc. to support the matching of students and graduates of 
				the Indian Institutes of Technology (hereinafter referred to as IIT) with companies. </h2>

			<form id= "form1" onSubmit={ (e) => {
				e.preventDefault();
				var doc = new jsPDF('p');

				GalkLabPdf( doc, doe, companyname, companyaddress, 
				companyphone, applicantname, applicantemail, contactname,
				contactemail, startdate, signature, d1, d2, d3
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
					<td><label htmlFor="startdate">{t("Start Date")}</label></td>
					<td><input type="date" id="startdate" value={startdate} onChange={(e) => setsd(e.target.value)} /></td>
				</tr>

				<h1>{t("Description of Work")}</h1>
				<tr>
					<td><label htmlFor="d1">{t("Description")} 1</label></td>
					<td><input type="text" id="d1" value={d1} onChange={(e) => setd1(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="d2">{t("Description")} 2</label></td>
					<td><input type="text" id="d2" value={d2} onChange={(e) => setd2(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="d3">{t("Description")} 3</label></td>
					<td><input type="text" id="d3" value={d3} onChange={(e) => setd3(e.target.value)} /></td>
				</tr>
				
				<h2> Important Summary </h2>

				<h1>Upload Signature</h1>
				<tr>
					<td><label htmlFor="signature">{t("Signature")}</label></td>
					<td><input type="file" id="signature" onChange={(e) => {
						const fileExtension = e.target.files[0].name.split(".").at(-1);
						const allowedFileTypes = ["jpg","jpeg"];
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

import React, { useState } from 'react';
import { Region } from "../layout/region";
import {Helmet} from "react-helmet";
import jsPDF from 'jspdf';
import { useTranslation } from "react-i18next";
import GalkRecruitPdf from './galkrecruitpdf';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box} from '@mui/material';

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
			
				
				<tr>
					<td><label htmlFor="doe">{t("Date of Entry")}</label></td>
					<td><input type="date" id="doe" value={doe} onChange={(e) => setdoe(e.target.value)} required /></td>
				</tr>

				
				
					
					<TextField
            			required
            			id="companyname"
            			name="companyname"
            			label={t("Company Name")}
            			fullWidth
						style = {{width: 500}}
            			autoComplete="given-name"
            			variant="standard"
						value={companyname}
						onChange={(e) => setcomname(e.target.value)}
          				/>
        			

					
					<TextField
            			required
            			id="companyaddress"
            			name="companyaddress"
            			label={t("Company Address")}
            			style = {{width: 700}}
            			autoComplete="given-name"
						fullwidth
            			variant="standard"
						value={companyaddress}
						onChange={(e) => setcaddress(e.target.value)
						}
          				/>
        			
					
					
					<TextField
            			required
            			id="companyphone"
            			name="companyphone"
            			label={t("Company Phone")}
						
            			style = {{width: 300}}
						fullwidth
            			autoComplete="given-name"
            			variant="standard"
						value={companyphone}
						onChange={(e) => setcphone(e.target.value)}
          				/>
        			

					<Grid item xs={12} sm={6}>
					<TextField
            			required
            			id="applicantname"
            			name="applicantname"
						style = {{width: 300}}
            			label={t("Applicant Name")}
            			fullWidth
            			autoComplete="given-name"
            			variant="standard"
						value={applicantname}
						onChange={(e) => setaname(e.target.value)}
          			/>
					</Grid>
        			

					
					<TextField
            			required
            			id="applicantemail"
            			name="applicantemail"
						style = {{width: 300}}
            			label={t("Applicant Email")}
            			
            			autoComplete="given-name"
            			variant="standard"
						value={applicantemail}
						onChange={(e) => setaemail(e.target.value)}
          				/>
        			
					<Grid item  xs={12}>
					<TextField
            			
            			id="contactname"
            			name="contactname"
            			label={t("Contact Name")}
            			style = {{width: 300}}
            			autoComplete="given-name"
            			variant="standard"
						value={contactname}
						onChange={(e) => setcname(e.target.value)}
          				/>
        			</Grid>

					<Grid item  xs={12}>
					<TextField
            			style = {{width: 300}}
            			id="contactemail"
            			name="contactemail"
            			label={t("Contact Email")}
            			
            			autoComplete="given-name"
            			variant="standard"
						value={contactemail}
						onChange={(e) => setcemail(e.target.value)}
          				/>
        			</Grid>
					<td><label htmlFor="nostudents">{t("Number of Students to be Hired")}</label></td>
					<td><input type="number" id="nostudents" value={nostudents} onChange={(e) => setnostudents(e.target.value)} required /></td>
				
				<tr>
					<td><label htmlFor="startdate">{t("Start Date")}</label></td>
					<td><input type="date" id="startdate" value={startdate} onChange={(e) => setsd(e.target.value)} /></td>
				</tr>

				<h2> {t("Fee (Per Person)")}: Standard </h2>
					
					<h1> {t("Consulting Fee")}: 9,800 USD (Excluding TAX) </h1>
					<h1> {t("Referral fee")}: 35% from 1st annual income of the student (Excluding TAX) </h1>
					<h1> {t("Payment Term")} : The end of the previous month of service. 
					Note that If the service use starts in the middle of the month, 
					the fee must be paid by the day before the service use starts.</h1>
        			
					
            			
						<h2> {t("Remittance Address")} </h2>
						<h1> {t("Bank Name: Mizuho Bank")} </h1>
						<h1> {t("Swift Code: MHCBJPJT")} </h1>
						<h1> {t("Branch: Kabutocho(027)")} </h1>
						<h1> {t("A/c Number: 2291403")} </h1>
						<h1> {t("A/c Name: カ WILLINGS")} </h1>
       				
				<h2> Important Summary </h2>
				<ol style={{ listStyleType: 'list-square' }}>
					<h1 > {t("About Application")}</h1>
    				<li> {t("termrec1")} </li>
					<li> {t("termrec2")} </li>
					<li> {t("termrec3")} </li>
				</ol>

				<ol style={{ listStyleType: 'list-square' }}>
					<h1 > {t("Payment/Various discounts")}</h1>
    				<li> {t("termrec4")} </li>
					<li> {t("termrec5")} </li>
					<li> {t("termrec6")} </li>
				</ol>

				<ol style={{ listStyleType: 'list-square' }}>
					<h1 > {t("Cancellation/Refund")}</h1>
    				<li> {t("termrec7")} </li>
					<li> {t("termrec8")} </li>
				</ol>

				<ol style={{ listStyleType: 'list-square' }}>
					<h1 > {t("Other")}</h1>
    				<li> {t("termrec9")} </li>
					<li> {t("termrec10")} </li>
				</ol>
					

					
				<h2>Upload Signature</h2>
				<h1> {t("Signature for the confirmation of aforementioned guidelines")}</h1>
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



			
				
			<input type="submit" value={t("Submit")} />
			</form>
		</Region>
	</div>
	
  );
  }

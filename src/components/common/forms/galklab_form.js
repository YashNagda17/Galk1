import React, { useState } from 'react';
import { Region } from "../layout/region";
import {Helmet} from "react-helmet";
import jsPDF from 'jspdf';
import { useTranslation } from "react-i18next";
import GalkLabPdf from "./galklabpdf";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, Row, Col, Button, Modal, Empty, Divider,Form } from "antd";

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
  const [operating_hours, setop] = useState('');
  const data = new FileReader()
  data.addEventListener('load',()=>{
	setsign(data.result)
  })

  const [d1, setd1] = useState('');
  const [d2, setd2] = useState('');
  const [d3, setd3] = useState('');
  const { t } = useTranslation();
  const theme = createTheme();

  return (
	<div>
		<Helmet>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
		</Helmet>

		<Region>
		<>
		<div>
			<Card
				
				size="large"
				bodyStyle={{ padding: 0 }}
				style={{
					height: "105%",
					width: "100%",
					overflowY: "auto",
				}}
			>
        
          
			<h2>
			
				{t("Galk Lab")} {t("Application Form")}
			</h2>
			<h1> The Company applies for the use of the lab-based development service (service name: GALK) provided by Willings,Inc. to support the matching of students and graduates of 
				the Indian Institutes of Technology (hereinafter referred to as IIT) with companies. </h1>

			<Form id= "form1" onSubmit={ (e) => {
				e.preventDefault();
				var doc = new jsPDF('p');

				GalkLabPdf( doc, doe, companyname, companyaddress, 
				companyphone, applicantname, applicantemail, contactname,
				contactemail, startdate, signature, d1, d2, d3, operating_hours
				);

				
				
				doc.save("application_copy.pdf");
				}}
			>
			
			
				<tr>
					<td><label htmlFor="doe">{t("Date of Entry")}</label></td>
					<td><input type="date" id="doe" value={doe} onChange={(e) => setdoe(e.target.value)} required /></td>
				</tr>

				<tr>
					<td><label htmlFor="startdate">{t("Start Date")}</label></td>
					<td><input type="date" id="startdate" value={startdate} onChange={(e) => setsd(e.target.value)} /></td>
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
					<Divider style={{'background-color':'black'}}/>
				<h2>{t("Description of Work")}</h2>
					<TextField
            			style = {{width: 700}}
            			id="d1"
            			name="d1"
            			label={t("Description")+" 1"} 
            			fullwidth
            			autoComplete="given-name"
            			variant="standard"
						value={d1}
						onChange={(e) => setsd(e.target.value)}
          			/>

					<TextField
            			style = {{width: 700}}
            			id="d2"
            			name="d2"
            			label={t("Description") + " 2"} 
            			fullwidth
            			autoComplete="given-name"
            			variant="standard"
						value={d2}
						onChange={(e) => setd2(e.target.value)}
          			/>

					<TextField
            			style = {{width: 700}}
            			id="d3"
            			name="d3"
            			label={t("Description") + " 3"} 
            			fullwidth
            			autoComplete="given-name"
            			variant="standard"
						value={d3}
						onChange={(e) => setd3(e.target.value)}
          			/>
					<Divider style={{'background-color':'black'}}/>
					<h2> {t("Service Plan")}: Standard </h2>
					<TextField
            			required
            			id="applicantname"
						inputProps={{ type: 'number'}}
            			name="operating_hours"
						style = {{width: 300}}
            			label={t("Engineer operating hours ") + " per month"}
            			fullWidth
            			autoComplete="given-name"
            			variant="standard"
						value={operating_hours}
						onChange={(e) => setop(e.target.value)}
          			/>
					<h1> {t("Monthly Fee")}: 6500 USD(Excluding Tax) </h1>
					<h1> {t("Payment Term")} : The end of the previous month of service. 
					Note that If the service use starts in the middle of the month, 
					the fee must be paid by the day before the service use starts.</h1>
        			
					<Divider style={{'background-color':'black'}}/>
            			
						<h2> {t("Remittance Address")} </h2>
						<h1> {t("Bank Name: Mizuho Bank")} </h1>
						<h1> {t("Swift Code: MHCBJPJT")} </h1>
						<h1> {t("Branch: Kabutocho(027)")} </h1>
						<h1> {t("A/c Number: 2291403")} </h1>
						<h1> {t("A/c Name: カ WILLINGS")} </h1>
       				
						<Divider style={{'background-color':'black'}}/>
				<h2> Important Summary </h2>
				<ol style={{ listStyleType: 'list-square' }}>
    				<li> {t("termlab1")} </li>
					<li> {t("termlab2")} </li>
					<li> {t("termlab3")} </li>
					<li> {t("termlab4")} </li>
					<li> {t("termlab5")} </li>
					<li> {t("termlab6")} </li>
					<li> {t("termlab7")} </li>
					<li> {t("termlab8")} </li>
					<li> {t("termlab9")} </li>
					<li> {t("termlab10")} </li>
				</ol>

				<Divider style={{'background-color':'black'}}/>
					<h2>Upload Signature</h2>
					<h1> {t("Signature for the confirmation of aforementioned guidelines")}</h1>
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
					<Divider style={{'background-color':'black'}}/>
			<input type="submit" value={t("Submit")} />
			</Form>
			</Card>
			</div>
			</>
		</Region>
	</div>
	
  );
  }

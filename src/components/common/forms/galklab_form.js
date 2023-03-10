import React, { useState } from 'react';
import { Region } from "../layout/region";
import {Helmet} from "react-helmet";
import jsPDF from 'jspdf';


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

  const [d1, setd1] = useState('');
  const [d2, setd2] = useState('');
  const [d3, setd3] = useState('');
  function function1(pdf)
  {
	pdf.text(10,20,companyname,'center');	
  }

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
				var pdf = new jsPDF('p');
				//var printWindow = window.open('', '', 'height=400,width=800');
				function1(pdf);
				pdf.save("application_copy.pdf");
				}}
			>
			<table>
				<tbody>
				<tr>
					<td><label htmlFor="doe">Date of Entry</label></td>
					<td><input type="date" id="doe" value={doe} onChange={(e) => setdoe(e.target.value)} required /></td>
				</tr>
				<tr>
					<td><label htmlFor="companyname">Company Name</label></td>
					<td><input type="text" id="companyname" value={companyname} onChange={(e) => setcomname(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="companyaddress">Company Address</label></td>
					<td><input type="text" id="companyaddress" value={companyaddress} onChange={(e) => setcaddress(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="companyphone">Company Phone</label></td>
					<td><input type="tel" id="companyphone" value={companyphone} onChange={(e) => setcphone(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="applicantname">Applicant Name</label></td>
					<td><input type="text" id="applicantname" value={applicantname} onChange={(e) => setaname(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="applicantemail">Applicant Email</label></td>
					<td><input type="email" id="applicantemail" value={applicantemail} onChange={(e) => setaemail(e.target.value)} required /></td>
				</tr>
				<tr>
					<td><label htmlFor="contactname">Contact Name</label></td>
					<td><input type="text" id="contactname" value={contactname} onChange={(e) => setcname(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="contactemail">Contact Email</label></td>
					<td><input type="email" id="contactemail" value={contactemail} onChange={(e) => setcemail(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="startdate">Start Date</label></td>
					<td><input type="date" id="startdate" value={startdate} onChange={(e) => setsd(e.target.value)} /></td>
				</tr>

				<h1>Description of Work</h1>
				<tr>
					<td><label htmlFor="d1">Description 1</label></td>
					<td><input type="text" id="d1" value={d1} onChange={(e) => setd1(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="d2">Description 2</label></td>
					<td><input type="text" id="d2" value={d2} onChange={(e) => setd2(e.target.value)} /></td>
				</tr>
				<tr>
					<td><label htmlFor="d3">Description 3</label></td>
					<td><input type="text" id="d3" value={d3} onChange={(e) => setd3(e.target.value)} /></td>
				</tr>


				<h1>Upload Signature</h1>
				<tr>
					<td><label htmlFor="signature">Signature</label></td>
					<td><input type="file" id="signature" value={signature} onChange={(e) => setsign(e.target.value)} /></td>
				</tr>



			
				</tbody>
			</table>
			<input type="submit" value="Submit" />
			</form>
		</Region>
	</div>
	
  );
  }

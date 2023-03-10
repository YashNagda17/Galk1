import React, { useEffect, useRef } from "react";
import { Region } from "../layout/region";
import jsPDF from 'jspdf';

function App_Form_Galk_Recruit1() {
	function function1(pdf,e){
		
		
	}
	return (
		
		<Region>
			
			<h1>
				Galk Recruit Form
			</h1>
			<form id= "form1" onSubmit={ (e) => {
				e.preventDefault();
				var pdf = new jsPDF('p');
				//var printWindow = window.open('', '', 'height=400,width=800');
				function1(pdf,e);
				pdf.save("application_copy.pdf");
			}}
			>
				<input type="text" id="name" placeholder="name"/>
				<br/>
				<input type="number" id="age" placeholder="age"/>
				<br/>
				<input type="submit" value="Submit" />
			</form>
		</Region>
	  	
	);
  }
export default(
	App_Form_Galk_Recruit1
)
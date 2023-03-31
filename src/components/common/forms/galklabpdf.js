const GalkLabPdf = function (doc,
    doe,
    companyname,
    companyaddress, 
    companyphone, 
    applicantname,
    applicantemail,
    contactname,
    contactemail,
    startdate,
    signature,
    d1,
    d2,
    d3,
	operating_hours
    )
  {
	
	var margin = 10;
	doc.setFontSize(20);
	doc.setFont('times', 'bold');
	doc.text(70,20,'GALK Application Form');

	doc.setLineWidth(0.5);
	doc.line(70, 23, 145, 23);

	
	doc.setFontSize(12);
	var line1 = 'The Company applies for the use of the lab-based development service (service name: GALK) provided by Willings,Inc. to support the matching of students and graduates of the Indian Institutes of Technology (hereinafter referred to as IIT) with companies.';
	doc.setFont('times', 'normal');
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin, 30, line1);
	//line1 = 

	
	doc.setFillColor(0,0,0);
	doc.rect(margin,43,190-margin,10,'F');
	doc.setTextColor(255, 255, 255);
	doc.text(100,49, 'Applicant Information','center');

	doc.setFontSize(11);
	doc.setFillColor(211,211,211);
	doc.rect(margin,53,40,10,'F');
	doc.setTextColor(0,0,0);
	doc.text(30,58, 'Date of Entry(*)','center');

	doc.setLineWidth(0.1);
	doc.setTextColor(0,0,0);
	doc.text(50+margin,58, doe);
	


	doc.setFillColor(211,211,211);
	doc.rect(margin,63,40,10,'F');
	doc.setTextColor(0,0,0);
	doc.text(30,68, 'Company Name(*)','center');

	doc.setLineWidth(0.1);
	doc.setTextColor(0,0,0);
	doc.text(50+margin,68, companyname);

	doc.setFillColor(211,211,211);
	doc.rect(margin,73,40,10,'F');
	doc.setTextColor(0,0,0);
	doc.text(30,78, 'Company Address(*)','center');

	doc.setLineWidth(0.1);
	doc.setTextColor(0,0,0);
	doc.text(50+margin,78, companyaddress);

	doc.setFillColor(211,211,211);
	doc.rect(margin,83,40,10,'F');
	doc.setTextColor(0,0,0);
	doc.text(30,88, 'Company Phone(*)','center');

	doc.setLineWidth(0.1);
	doc.setTextColor(0,0,0);
	doc.text(50+margin,88, companyphone);

	doc.setFillColor(211,211,211);
	doc.rect(margin,93,40,10,'F');
	doc.setTextColor(0,0,0);
	doc.text(30,98, 'Applicant Name(*)','center');

	doc.setLineWidth(0.1);
	doc.setTextColor(0,0,0);
	doc.text(50+margin,98, applicantname);

	doc.setFillColor(211,211,211);
	doc.rect(margin,103,40,10,'F');
	doc.setTextColor(0,0,0);
	doc.text(30,108, 'Applicant Email(*)','center');

	doc.setLineWidth(0.1);
	doc.setTextColor(0,0,0);
	doc.text(50+margin,108, applicantemail);

	doc.setFillColor(211,211,211);
	doc.rect(margin,113,40,10,'F');
	doc.setTextColor(0,0,0);
	doc.text(30,118, 'Contact Name','center');

	doc.setLineWidth(0.1);
	doc.setTextColor(0,0,0);
	doc.text(50+margin,118, contactname);

	doc.setFontSize(5);
	doc.setLineWidth(0.1);
	doc.setFont('times', 'italic');
	doc.setTextColor(0,0,0);
	doc.text(115,122, '(Please indicate if there is another person in charge besides the person filling in the application form)');
	doc.setFontSize(11);
	doc.setFont('times', 'normal');

	doc.setFillColor(211,211,211);
	doc.rect(margin,123,40,10,'F');
	doc.setTextColor(0,0,0);
	doc.text(30,128, 'Contact Email','center');

	doc.setLineWidth(0.1);
	doc.setTextColor(0,0,0);
	doc.text(50+margin,128, contactemail);

	


	doc.setFillColor(211,211,211);
	doc.rect(margin,133,40,10,'F');
	doc.setTextColor(0,0,0);
	doc.text(30,138, 'Start Date','center');

	doc.setLineWidth(0.1);
	doc.setTextColor(0,0,0);
	doc.text(50+margin,138, startdate);




	doc.line(margin,63, 200-margin, 63);
	doc.line(margin,73 ,200-margin, 73);
	doc.line(margin,83 ,200-margin, 83);
	doc.line(margin,93 ,200-margin, 93);
	doc.line(margin,103 ,200-margin, 103);
	doc.line(margin,113 ,200-margin, 113);
	doc.line(margin,123 ,200-margin, 123);
	doc.line(margin,133 ,200-margin, 133);
	doc.line(margin,143 ,200-margin, 143);
	doc.line(margin,53, margin,143);

	doc.line(50,53, 50,143);
	doc.line(200-margin, 53, 200-margin, 143);


	doc.setFontSize(12);	
	doc.setFillColor(0,0,0);
	doc.rect(margin,145,190-margin,10,'F');
	doc.setTextColor(255, 255, 255);
	doc.text(100,151, 'Service Plan','center');

	doc.setFontSize(11);
	doc.setTextColor(0,0,0);
	doc.setFont('times', 'bold');
	doc.text(margin+10,160,'Plan');
	doc.text(margin+60,160,'Engineer Operating Hours per month','center');
	doc.text(margin+113,160,'Monthly Fee','center');
	doc.text(margin+160,160,'Payment Term','center');

	doc.setFont('times', 'normal');
	doc.text(margin+10,170,'Plan');
	doc.text(margin+60,170,operating_hours,'center');
	doc.text(margin+113,170,'6500 USD (Excluding Tax)','center');
	doc.text(margin+160,170,'The end of the previous','center');
	doc.text(margin+160,176,'month of service (*)','center');
	
	doc.line(margin, 155, margin,185);
	doc.line(40, 155, 40,185);
	doc.line(100, 155, 100,185);
	doc.line(150, 155, 150,185);
	doc.line(200-margin, 155, 200-margin, 185);
	doc.line(margin,165, 200-margin, 165);
	doc.line(margin,185, 200-margin, 185);
	doc.setFontSize(7);
	line1 = '* If the service use starts in the middle of the month, the fee must be paid by the day before the service use starts.'
	doc.text(margin+65,190, line1);


	doc.setFontSize(15);
	doc.setLineWidth(0.5);
	doc.rect(50, 195, 100, 36);
	doc.text(100,200, 'Remittance Address','center');
	doc.setFontSize(13);
	doc.text(100,206, 'Bank Name:   Mizuho Bank','center');
	doc.text(100,212, 'Swift Code:   MHCBJPJT','center');
	doc.text(100,218, 'Branch:   Kabutocho(027)','center');
	
	doc.text(100,224, 'A/c Number:   2291403','center');
	doc.text(100,230, 'A/c Name:   WILLINGS','center');

	doc.setFontSize(12);	
	doc.setFillColor(0,0,0);
	doc.rect(margin,240,190-margin,10,'F');
	doc.setTextColor(255, 255, 255);
	doc.text(100,246, 'Description of Work','center');

	doc.setFontSize(11);
	doc.setFillColor(211,211,211);
	doc.rect(margin,250,20,10,'F');
	doc.setTextColor(0,0,0);
	doc.text(20,255, '1','center');
	doc.setFillColor(211,211,211);
	doc.rect(margin,260,20,10,'F');
	doc.text(20,265, '2','center');
	doc.setFillColor(211,211,211);
	doc.rect(margin,270,20,10,'F');
	doc.text(20,275, '3','center');
	doc.setFontSize(9);
	doc.text(35,256, d1);
	doc.text(35,266, d2);	
	doc.text(35,276, d3);
	
	doc.setLineWidth(0.1);
	doc.line(margin,260, 200-margin, 260);
	doc.line(margin,270 ,200-margin, 270);
	doc.line(margin,280 ,200-margin, 280);
	doc.line(margin,250, margin, 280);
	doc.line(30,250, 30, 280);
	doc.line(200-margin, 250, 200-margin, 280);


	
	doc.addPage();
	doc.setFontSize(12);
	doc.setFont('times', 'normal');
	doc.text(margin, 20, '[Important Summary]');

	line1 = '1. This service is a quasi-commissioned lab-based development service and is not a contracted service that guarantees deliverables.';
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+2, 32, line1);

	line1 = '2. Submission of this application form is deemed to be an application for a period of three months from the service start date. Thereafter, the application will be automatically renewed every month.';
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+2, 44, line1);

	line1 = '3. If you wish to stop using the service, you must contact the operator in writing to formalise your request. Only in this case will you be suspended one month after the next renewal date.';
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+2, 56, line1);

	line1 = '4. During the service period, it will be possible to negotiate the continued development, replacement or increase the number of engineers. However, it is not possible to adjust the operating hours of the engineering team to less than 100 hours/month.';
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+5, 68, line1);

	line1 = '5. If additional engineers are required, a fee of 1,250 USD (excluding tax) per engineer will be charged on top of the monthly commission fee.';
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+2, 86, line1);

	line1 = "6. The number of engineers required and the team's operating hours will be quoted by the bridge SE in charge or a dedicated consultant based on the content of the interviews before the project starts.";
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+2, 98, line1);

	line1 = "7. We will propose an increase in the number of engineers if we receive additional requests to the original agreement on the development process or if the development schedule needs to be brought forward."
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+2, 110, line1);

	line1 = "8. In the unlikely event that an assigned member is unable to continue with the commissioning work during the service period, another member will immediately fill in."
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+2, 122, line1);

	line1 = "9. Any transfer of rights to use the service is not permitted."
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+2, 134, line1);

	line1 = "10. When introducing GALK, the logo data, company name and image data related to the project to be provided to the operator, we ask for your cooperation in granting permission to use them on the following websites and materials for the development of the project. We pledge to comply with the applicant's instructions, guidelines and other usage regulations, to use the data appropriately and not to alter or modify it in any way."
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+2, 140, line1);

	
	line1 = "GALK Official Website: https://www.galk-jp.com/"
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+50, 170, line1);

	
	line1 = "GALK Portal Site: https://company.galk-jp.com/"
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+50, 176, line1);

	line1 = "Company Website: http://willings.co.jp/"
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+50, 182, line1);

	line1 = "GALK Introductory Documents"
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+50, 188, line1);

	doc.setFontSize(8);
	doc.text(margin, 200, "Confirms and agrees to the above-mentioned important summary.")
	doc.setFontSize(12);

	doc.setFillColor(0,0,0);
	doc.rect(margin,205,40,10,'F');
	doc.setTextColor(255,255,255);
	doc.setFontSize(10);
	doc.text(30,209, 'Confirmation ','center');
	doc.text(30,213, 'Signature','center');
	
	doc.addImage(signature, 'JPEG', 50+margin,205,30,30);
	
	doc.setFontSize(12);
	doc.setTextColor(0,0,0);
	doc.text(margin, 250, "Person in charge from Willings, Inc: ");
	doc.line(margin,250,71,250)
}

export default GalkLabPdf;
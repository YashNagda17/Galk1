const GalkRecruitPdf = function (doc,
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
    nostudents,
    )
  {
	var margin = 10;
	doc.setFontSize(20);
	doc.setFont('times', 'bold');
	doc.text(70,20,'GALK Application Form');
	doc.setLineWidth(0.5);
	doc.line(70, 23, 145, 23);

	
	doc.setFontSize(12);
	var line1 = 'We, Willings, Inc., hereby apply to use the internship service (service name: GALK) provided by the Indian Institute of Technology (hereinafter IIT) for students and graduates of IIT to be matched with companies.';
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

	doc.setFillColor(211,211,211);
	doc.rect(margin,143,40,10,'F');
	doc.setTextColor(0,0,0);
	doc.text(30,148, 'Number of Students(*)','center');

	doc.setLineWidth(0.1);
	doc.setTextColor(0,0,0);
	doc.text(50+margin,148, nostudents);

	doc.line(margin,63, 200-margin, 63);
	doc.line(margin,73 ,200-margin, 73);
	doc.line(margin,83 ,200-margin, 83);
	doc.line(margin,93 ,200-margin, 93);
	doc.line(margin,103 ,200-margin, 103);
	doc.line(margin,113 ,200-margin, 113);
	doc.line(margin,123 ,200-margin, 123);
	doc.line(margin,133 ,200-margin, 133);
	doc.line(margin,143 ,200-margin, 143);
	doc.line(margin,153 ,200-margin, 153);
	doc.line(margin,53, margin,153);

	doc.line(50,53, 50,153);
	doc.line(200-margin, 53, 200-margin, 153);


	doc.setFontSize(12);	
	doc.setFillColor(0,0,0);
	doc.rect(margin,155,190-margin,10,'F');
	doc.setTextColor(255, 255, 255);
	doc.text(100,161,'Fee(Per Person)','center');

	doc.setFontSize(11 );
	doc.setTextColor(0,0,0);
	doc.setFont('times', 'bold');
	doc.text(margin+5,170,'Consulting Fee');
	doc.text(margin+5,185,'Referral Fee');
	
	

	doc.setFont('times', 'normal');
	doc.setFontSize(6);
	doc.text(margin+1,188,'(Hiring internship-participating ');
	doc.text(margin+1,191,'students as new graduate employees) ');

	doc.setFontSize(11 );
	doc.text(margin+60,170,'9,800 USD ','center');
	
	
	doc.text(margin+60,185,'35%','center');
	
	doc.setFontSize(8);
	doc.text(margin+60,191,'(Excluding TAX) ','center');

	doc.setFontSize(6);
	doc.text(margin+60,193,'Performance range:: 13,500 USD ~ 16,000 USD','center');

	doc.setFontSize(10);
	doc.text(46,188,'from 1st annual income of the student');
	doc.text(margin+60,175,'(Excluding TAX) ','center');
	doc.text(margin+95,170,'Payment at the end of the month following the date of ');
	doc.text(margin+95,175,'application entry');
	doc.text(margin+95,185,'Payment at the end of the month following the month the');
	doc.text(margin+95,190,' student accepts the offer');
	
	doc.line(45, 165, 45,195);
	doc.line(margin, 165, margin,195);
	doc.line(100, 165, 100,195);

	
	doc.line(200-margin, 165, 200-margin, 195);
	doc.line(margin,180, 200-margin, 180);
	doc.line(margin,195, 200-margin, 195);
	
	

	doc.setFontSize(15);
	doc.setLineWidth(0.5);
	doc.rect(50, 197, 100, 36);
	doc.text(100,202, 'Remittance Address','center');
	doc.setFontSize(13);
	doc.text(100,208, 'Bank Name:   Mizuho Bank','center');
	doc.text(100,214, 'Swift Code:   MHCBJPJT','center');
	doc.text(100,220, 'Branch:   Kabutocho(027)','center');
	
	doc.text(100,226, 'A/c Number:   2291403','center');
	doc.text(100,232, 'A/c Name:   WILLINGS','center');

	doc.setFontSize(13);
	doc.setFont('times', 'normal');
	doc.text(margin, 245, '[Important Summary]');
	doc.setFontSize(12);
	doc.text(margin+2, 250, '<About Application> ');

	doc.setFontSize(11);
	line1 = '1. The date of submission of this application form shall be deemed to be the official application for the use of the service.'
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+4, 255, line1);

	line1 = '2. The order of submission of the application forms will be the order in which the documents submitted to the IITs and the information about the host company in the handouts for IIT students are listed.'
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+4, 260, line1);

	line1 = '3. An invoice for the consulting fee will be issued as of the date of this application form.'
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+4, 270, line1);
	
	
	doc.addPage();

	doc.setFontSize(12);
	doc.text(margin+2, 20, '<Payment/Various discounts> ');

	doc.setFontSize(11);
	line1 = '1. If more than four students are accepted by one company, a deduction of JPY 30,000 per student will be deducted from the consulting fee. However, partial cancellations or partial acceptance by another company, such as a subsidiary or group company, which later has less than three students, are not permitted.'
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+4, 25, line1);
	
	line1 = '2. Switching from an in-country internship to an online internship is not permitted in situations where the student is able to come to Japan.'
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+4, 40, line1);

	line1 = '3. If the various arrival procedures for the internship are carried out by the applicant, a deduction of 3,500 USD per person will be made from the consulting fee. However, declarations made after the date of submission of the application form will not be accepted.'
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+4, 50, line1);

	doc.setFontSize(12);
	doc.text(margin+2, 65, '<Cancellation/Refund> ');

	doc.setFontSize(11);
	line1 = "1. In the case of cancellation at the applicant's convenience, the full amount of the introductory application fee will be refunded only up to the day before the data containing the personal details of the intern candidate selected on the basis of the applicant's application form is sent to the applicant. If the cancellation is made after the decision to accept the student, the full consulting fee will be charged as a cancellation fee.";
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+4, 70, line1);
	
	line1 = '2. If an internship is secured after the online interview, but the internship is not implemented due to reasons on the part of the student or the management company, the consulting fee will be refunded in full.';	
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+4, 90, line1);

	doc.setFontSize(12);
	doc.text(margin+2, 100, '<Other> ');

	doc.setFontSize(11);
	line1 = "1. Commuting and business-related travel expenses during the period of the visit-based internship are not included in the consulting fee and must be borne separately by Suica payment or other means."
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+4, 105, line1);
	
	line1 = '2. Any transfer of rights relating to the job offer and selection is not permitted.'
	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+4, 115, line1);

	line1 = "3. When introducing GALK, we ask for permission to use the logo data, company name and image data related to the project, video recordings of internship-related meetings and materials created by the interns, which will be provided to the management company, on the following websites and materials for the development of the project. We pledge to comply with the applicant's instructions, guidelines and other usage regulations, to use them appropriately and not to alter or modify them in any way."

	line1 = doc.splitTextToSize(line1, 190);
	doc.text(margin+4, 120, line1);

	

	

	
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

export default GalkRecruitPdf;
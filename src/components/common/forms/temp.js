import React, { useState,useEffect,useRef } from "react";
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Region } from "../layout/region";

export default function App_Form_Galk_Recruit() {
	const [pdfInfo, setPdfInfo] = useState([]);
	const viewer = useRef(null);
	useEffect(() => {
	  modifyPdf();
	  
	}, []);
  
	const modifyPdf = async () => {
	  const existingPdfBytes = await fetch(
		"https://pdf-lib.js.org/assets/with_update_sections.pdf"
	  ).then((res) => res.arrayBuffer());
	  
	  const pdfDoc = await PDFDocument.load(existingPdfBytes);
	  console.log(pdfDoc);
	  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
	  
	  const pages = pdfDoc.getPages();
	  const firstPage = pages[0];
	  
	  // Get the width and height of the first page
	  const { width, height } = firstPage.getSize();
	  firstPage.drawText("This text was added with JavaScript!", {
		x: 5,
		y: height / 2 + 300,
		size: 500,
		font: helveticaFont,
		color: rgb(0.95, 0.1, 0.1),
		rotate: degrees(-45),
	  });
	  
	  const pdfBytes = await pdfDoc.save();
	  const docUrl = URL.createObjectURL(
		new Blob(pdfBytes, { type: "application/pdf" })
	  );
	  setPdfInfo(docUrl);
	  console.log(docUrl);
	};
	
	return (
		
		<Region>
			<iframe title="test-frame" src={pdfInfo} ref={viewer} type="application/pdf" />
		</Region>

      );
}


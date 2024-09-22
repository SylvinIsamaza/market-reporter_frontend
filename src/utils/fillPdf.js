import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { dataUsed, factorToConsider, finalConsideration, proyeccionesDeRevolution, revolutionCalculation } from "../data/static";

export const fillPdf = async (pdfFile, reportData) => {
  const renovationOptions = [
    "Total renovation apparently with no structural damage",
    "Partial renovation apparently with no structural damage",
    "Cosmetic renovation apparently with no structural damage",
    "Apparently no renovation needed",
    "Condition unknown",
  ];

  try {
    const existingPdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    fields.forEach((field) => {
      const type = field.constructor.name;
      const name = field.getName();
      
      let value;
      if (type === 'PDFTextField') {
        value = field.getText();
      }
      console.log(`Field Name: ${name}`);
      consle.log(`Field Location: ${location}`)
      console.log(`Field Type: ${type}`);
      console.log(`Field Value: ${value}`);
      console.log('-----------------------------');
    });
    form.getTextField("location").setText(reportData.location || "");
    form.getTextField("catastralReference").setText(reportData.cadastralReference || "");
    form.getTextField("link").setText(reportData.propertyLink || "");
    form.getTextField("squareMeters").setText(reportData.totalSquareMeter || "");
    form.getTextField("numberOfRooms").setText(reportData.nbrOfRoom || "");
    form.getTextField("numberOfBathrooms").setText(reportData.nbrOfBaths || "");
    form.getTextField("floorNumber").setText(reportData.floorNumber || "");
    form.getTextField("announcedPrice").setText(reportData.price || "");
    form.getTextField("pricePerMeter").setText(reportData.pricePerSquaredMeter || "");
    form.getTextField("Paragraph-5LOcwcUgC7").setText(reportData.observation || "");
    form.getTextField("totalPopulation").setText(reportData.totalPopulation || "")
    form.getTextField("populationUnder18").setText(reportData.populationDistributionByAge?.under18 || "")
    form.getTextField("populationOver65").setText(reportData.populationOver65?.over65 || "")
    form.getTextField("saleDescription").setText(reportData.saleDescription || "")
    form.getTextField("rentDescription").setText(reportData.rentDescription || "")
    form.getTextField("saleMin").setText(reportData.sellPrice.minPrice || "")
    form.getTextField("saleMax").setText(reportData.sellPrice.maxPrice || "")
    form.getTextField("rentMin").setText(reportData.rentPrice.minPrice || "")
    form.getTextField("rentMax").setText(reportData.rentPrice.maxPrice || "")
    form.getTextField("generationDate").setText(Date.now() || "")
    // const populationEvolutionImage=pdfDoc.embedPng()
    // const populationEvolution = form.getTextField("populationEvolution").setImage(populationEvolutionImage);
    // console.log(populationEvolution)
    // const evolutionTableWomen=form.getTextField("evolutionTableWomen")
    // console.log(evolutionTableWomen)
    // const evolutionTableMen=form.getTextField("evolutionTableMen")
    // console.log(evolutionTableMen)
    // const notWorkingPopulationImage=pdfDoc.embedPng()
    // const notWorkingPopulation=form.getTextField("notWorkingPopulation").setImage(notWorkingPopulationImage);
    // console.log(notWorkingPopulation)
    // const householdIncome=form.getTextField("householdIncome").getRect();
    // console.log(householdIncome)
    // const map=form.getTextField("map").getRect();
    // console.log(map)
    
    
    
    
    renovationOptions.forEach((option) => {
      const checkBox = form.getCheckBox(option);
      if (reportData.renovation === option) {
        checkBox.check();
      } else {
        checkBox.uncheck();
      }
    });

    const pages = pdfDoc.getPages();
    let currentPage = pages[19]; 
    const { width, height } = currentPage.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const fontSize = 10;
    const marginLeft = 50;
    const bulletIndent = 20; 
    const maxWidth = width - marginLeft * 2;
    let textYPosition = height - 100; 
    const minYPosition = 50; 

    const wrapText = (text, maxWidth) => {
      const words = text.split(" ");
      let lines = [];
      let currentLine = "";

      words.forEach((word) => {
        const testLine = currentLine + word + " ";
        const testLineWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testLineWidth > maxWidth) {
          lines.push(currentLine);
          currentLine = word + " "; 
        } else {
          currentLine = testLine;
        }
      });

      lines.push(currentLine);
      return lines;
    };

    
    const createNewPage = () => {
      const newPage = pdfDoc.addPage([width, height]);
      textYPosition = height - 50; 
      currentPage = newPage; 
    };

    const writeText = (text, indent = 0, isBold = false) => {
      const selectedFont = isBold ? boldFont : font;
      const lines = wrapText(text, maxWidth - indent);

      lines.forEach((line) => {
       
        if (textYPosition < minYPosition) {
          createNewPage(); 
        }

        currentPage.drawText(line, {
          x: marginLeft + indent,
          y: textYPosition,
          size: fontSize,
          font: selectedFont,
          color: rgb(0, 0, 0),
        });
        textYPosition -= 18; 
      });
    };

    
    writeText("Factores a Considerar:", 0, true); 
   reportData.futurappreciation.factorToConsider.forEach((factor) => {
      writeText(`• ${factor}`, bulletIndent); 
    });

    textYPosition -= 10;
    writeText("Datos Usados:", 0, true); 
    reportData.futurappreciation.dataUsed.forEach((data) => {
      writeText(`• ${data}`, bulletIndent); 
    });

    textYPosition -= 10;
    writeText("Consideraciones Finales:", 0, true); 
    reportData.futurappreciation.finalConsideration.forEach((consideration) => {
      writeText(`• ${consideration}`, bulletIndent); 
    });

    textYPosition -= 10;
    writeText("Cálculo de Revolución:", 0, true); 
    writeText(reportData.futurappreciation.revolutionCalculation.description);
    writeText(reportData.futurappreciation.revolutionCalculation.formula);

    reportData.futurappreciation.revolutionCalculation.calculation.forEach((calc) => {
      writeText(calc.title, 20, true); 
      calc.ways.forEach((way) => {
        writeText(way, 40); 
      });
    });

    textYPosition -= 10;
    writeText("Proyecciones de Revolución:", 0, true); 
    writeText(proyeccionesDeRevolution);

    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], { type: "application/pdf" }), `${reportData.id}_${Date.now()}`);
  } catch (error) {
    console.error("Error filling PDF:", error);
  }
};

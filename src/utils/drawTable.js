const { PDFDocument, rgb, StandardFonts } =require('pdf-lib');

async function drawTableOnPage({
  page,
  topHeader = [],
  secondHeader,
  data,
  headerFont,
  textFont,
  fontSize = 12,
  margin = 50,
  rowHeight = 25,
  columnWidth = 100,
}) {
  const { height } = page.getSize();
  let currentY = height - margin;
  const drawCellText = (text, x, y, font, size, page, width) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: x + (width - textWidth) / 2,
      y: y,
      size: size,
      font: font,
    });
  };


  if (topHeader && topHeader.length > 0) {
    topHeader.forEach((header, index) => {
      page.drawRectangle({
        x: margin + index * columnWidth,
        y: currentY - rowHeight,
        width: columnWidth,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      drawCellText(header, margin + index * columnWidth, currentY - rowHeight + 8, headerFont, fontSize, page, columnWidth);
    });
    currentY -= rowHeight;
  }

  secondHeader.forEach((header, index) => {
    page.drawRectangle({
      x: margin + index * columnWidth,
      y: currentY - rowHeight,
      width: columnWidth,
      height: rowHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    drawCellText(header, margin + index * columnWidth, currentY - rowHeight + 8, headerFont, fontSize, page, columnWidth);
  });
  currentY -= rowHeight;
  data.forEach(row => {
    row.forEach((cell, index) => {
      page.drawRectangle({
        x: margin + index * columnWidth,
        y: currentY - rowHeight,
        width: columnWidth,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      drawCellText(cell.toString(), margin + index * columnWidth, currentY - rowHeight + 8, textFont, fontSize, page, columnWidth);
    });
    currentY -= rowHeight;
  });
}

module.exports=drawTableOnPage
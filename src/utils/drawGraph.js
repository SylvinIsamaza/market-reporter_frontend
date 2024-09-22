const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');

const generateChartImage = async (data,width,height,url) => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
  const configuration = {
    type: 'line', 
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  return imageBuffer


};

generateChartImage();

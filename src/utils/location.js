import axios from "axios"

async function getProvincias(req, res, next) {
  try {
    const response = await axios.get("http://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero/COVCCallejero.svc/json/ObtenerProvincias");
   
    const data = await response.data;
    console.log(data)
const provinces=[]
    const provinceData = data.consulta_provincieroResult.provinciero.prov
    if (provinceData && provinceData.length > 0) {
      provinceData.forEach((item) => {
        const { cpine, np } = item
        provinces.push(np)
      })
    }
  return provinces
  } catch (error) {
    next(error);
  }
}
async function getMunicipio(req, res, next) {
  try {
    const { provincia } = req.query;
    const response = await fetch(`http://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero/COVCCallejero.svc/json/ObtenerMunicipios?Provincia=${provincia.toUpperCase()}`);
    const data = await response.json();
    const municipio=[]
        const municipioData = data.consulta_municipieroResult.municipiero.muni
        if (municipioData && municipioData.length > 0) {
          municipioData.forEach((item) => {
            const { nm } = item
            municipio.push(nm)
          })
        }
       res.send(municipio)
  } catch (error) {
    next(error);
  }
}
async function getCallejero(req, res, next) {
  try {
    const { municipio, provincia } = req.query;
    const response = await fetch(`http://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero/COVCCallejero.svc/json/ObtenerCallejero?Provincia=${provincia.toUpperCase()}&Municipio=${municipio.toUpperCase()}`);
    const data = await response.json();
    const calle = data.consulta_callejeroResult.callejero?.calle
    const streetDetailsArray = [];

  if (calle && calle.length > 0) {
    calle.forEach(street => {
      const { tv, nv } = street.dir;
      streetDetailsArray.push({ sigla:tv, callejero:nv });
    });
  } 
  return res.send(streetDetailsArray);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProvincias,
  getCallejero,
  getMunicipio
}

import { useState, useEffect } from "react";
import axios from "axios";

// Hook to fetch Provincias (Provinces)
export function useFetchProvincias() {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await axios.get(
          "http://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero/COVCCallejero.svc/json/ObtenerProvincias"
        );
        const provinceData = response.data.consulta_provincieroResult.provinciero.prov;
       
        const provincesList = provinceData.map((item) => ({
          label: item.np,  
          value: item.np 
        }));
        setProvinces(provincesList);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch provinces");
        setLoading(false);
      }
    }
    fetchProvinces();
  }, []);

  return { provinces, loading, error };
}

export function useFetchMunicipios(province) {
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (province) {
      async function fetchMunicipios() {
        try {
          const response = await axios.get(
            `http://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero/COVCCallejero.svc/json/ObtenerMunicipios?Provincia=${province.toUpperCase()}`
          );
          const municipioData = response.data.consulta_municipieroResult.municipiero.muni;
          
          const municipiosList = municipioData.map((item) => ({
            label: item.nm,  
            value: item.nm   
          }));
          setMunicipios(municipiosList);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch municipios");
          setLoading(false);
        }
      }
      fetchMunicipios();
    }
  }, [province]);

  return { municipios, loading, error };
}

export function useFetchCallejero(province, municipio) {
  const [streets, setStreets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const roadTypeMap = {
    CL: "Calle",
    AV: "Avenida",
    CR: "Carretera",
    PL: "Plaza",
    PS: "Paseo",
    BL: "Bulevar",
    TR: "Travesía",
    CT: "Camino",
    RON: "Ronda",
    PG: "Paseo",
    J: "Jardín",
    CTRA: "Carretera",
    CS: "Callejón",
    LV: "Línea Verde",
    LT: "Línea de Tránsito",
    AG: "Avenida General",
    PC: "Parque",
    AP: "Acceso",
    S: "Sendero",
    AVDA: "Avenida",
    AVDA: "Avenida",
    PU: "Pueblo",
    Z: "Zona",
    M: "Metro",
  };
  
  function getFullRoadType(abbreviation) {
    return roadTypeMap[abbreviation] || "Unknown road type";
  }

  useEffect(() => {
    if (province && municipio) {
      async function fetchStreets() {
        try {
          const response = await axios.get(
            `http://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero/COVCCallejero.svc/json/ObtenerCallejero?Provincia=${province.toUpperCase()}&Municipio=${municipio.toUpperCase()}`
          );
          const calleData = response.data.consulta_callejeroResult.callejero.calle;
          
          const streetDetailsArray = calleData.map((street) => ({
            label: street.dir.nv+`(${street.dir.tv})`, 
            value: street.dir.tv+' '+street.dir.nv,
          }));
          setStreets(streetDetailsArray);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch streets");
          setLoading(false);
        }
      }
      fetchStreets();
    }
  }, [province, municipio]);

  return { streets, loading, error };
}

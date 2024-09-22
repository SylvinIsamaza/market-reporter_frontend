export const factorToConsider = [
  "Tendencias Históricas: Analizar el comportamiento histórico de los precios de los inmuebles en Manresa y áreas similares.",
  "Crecimiento Económico: Evaluar las previsiones de crecimiento económico en la región y su impacto en el mercado inmobiliario",
  "Tasa de Inflación: Considerar la inflación proyectada para los próximos años",
  "Desarrollo Urbano y Políticas Públicas: Revisar planes de desarrollo urbano y políticas gubernamentales que puedan afectar la valorización.",
  "Demanda y Oferta de Viviendas: Analizar la demanda y oferta actual y futura de inmuebles en la zona.",
];

export const dataUsed = [
  "Precio Actual del Inmueble: 60,000 € para un piso de 52 m² en Manresa.",
  "Tendencia de Aumento de Precio: Según los datos, el precio de las viviendas en Manresa ha aumentado un 4.9% en el último año y un 12.3% en los últimos 3 años.",
  "Inflación Anual Promedio en España: Aproximadamente 2% (puede variar dependiendo de factores económicos globales y nacionales).",
  "Proyecciones de Crecimiento: Asumiremos un crecimiento moderado del mercado inmobiliario del 3-4% anual.",
];

export const finalConsideration = [
  "Factores Externos: Estos cálculos no consideran posibles cambios drásticos en la economía, políticas gubernamentales, desastres naturales o eventos imprevistos que puedan afectar significativamente el mercado inmobiliario.",
  "Revisión Anual: Es recomendable revisar estas proyecciones anualmente para ajustarlas según las condiciones actuales del mercado.",
  "Esta estimación proporciona una orientación basada en las tendencias actuales y proyecciones razonables, pero siempre es prudente realizar análisis adicionales y consultar a profesionales del sector inmobiliario para decisiones de inversión a largo plazo.",
];
export const revolutionCalculation = {
  description:
    "Para proyectar el valor futuro del inmueble, utilizaremos una tasa de crecimiento compuesta anual (CAGR) basada en un rango de crecimiento del 3-4% anual.",
  formula:
    "Valor Futuro = Valor Actual times (1 + tasa de crecimiento})^número de años",
  calculation: [
    {
      title: "Crecimiento del 3% anual",
      ways: ["Valor Futuro = 60,000 *1.3439 ", "Valor Futuro 80,634, € "],
    },
    {
      title: "Crecimiento del 4% anual",
      ways: [
        "Valor Futuro = 60,000  (1 + 0.04)^10",
        "Valor Futuro} = 60,000 *1.4802",
        "Valor Futuro  88,812 € ",
      ],
    },
  ],
};
export const proyeccionesDeRevolution = "Basado en estos cálculos, el valor estimado del inmueble en Manresa dentro de 10 años podría estar en el rango de 80,634 € a 88,812 €.";

export const serviceInZone = [
  {
    title: "Colegios y Universidades:",
    items: ["Colegio La Salle Manresa: Un colegio concertado que ofrece educación infantil, primaria, secundaria y bachillerato. Se encuentra en Carrer de la Pau.",
      "UManresa - Universidad de Vic: Una universidad que ofrece grados en Ciencias de la Salud y Ciencias Sociales. Está ubicada en Av. Bases de Manresa."
    ]
  },
  {
    title: "Hospitales y Centros de Salud:",
    items: ["Hospital Sant Joan de Déu: Un hospital de referencia en la región, situado en C. Dr. Joan Soler, 1 -3, 08243 Manresa (ICS Catalunya Central).",
      "Centro de Atención Primaria Bages: Proporciona servicios de atención primaria en C. Soler i March, 6, 08242 Manresa (ICS Catalunya Central)."
    ]
  },
  {
    title: "Supermercados",
    items: [
      "Consum: Supermercado ubicado en Carrer de Saclosa, 20 y Carrer del Bisbe Torras i Bages, 38. Ofrecen horarios amplios, con apertura también los domingos (Consum)."
    ]
  },
  {
    title: "Transporte Público",
    items: ["Parada de Autobús Passeig del Riu - Renfe: Una parada de autobús cercana con conexiones a otras áreas de Manresa y hacia la estación de tren .",
      "Estación de Renfe Manresa: Ofrece conexiones ferroviarias con otras ciudades y regiones."
    ]
  },
  
]
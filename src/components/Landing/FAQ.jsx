import Question from "./Question";
import FaqImage from "../../assets/images/faq-image.png"

const FAQ = () => {
  const FAQS = [
    {
      question: "¿Cómo puedo generar un informe inmobiliario?",
      answer:
        "Para generar un informe, simplemente inicia sesión en tu cuenta (Con créditos de informe disponibles) , introduce la dirección de la vivienda de interés o/y la referencia catastral y procede. El sistema procesará y generará el informe automáticamente. Si quieres descubrir más acerca del funcionamiento de la web puedes consultar videotutoriales en nuestra lista de reproducción de youtube en el siguiente enlace: (https://www.youtube.com/playlist?list=PLTEP2tRaQO8X_bKT-B5vEtZuRE428wnUm)",
    },
    {
      question: "¿Puedo personalizar mi plan de suscripción?",
      answer:
        "Puedes actualizar tu plan de casapi al que más se adapte a tus necesidades entre los disponibles.",
    },
    {
      question: "¿Qué métodos de pago se aceptan?",
      answer:
        "Los cobros se procesan por “Stripe” que acepta las principales tarjetas de crédito, garantizando un proceso de pago seguro y conveniente.",
    },
    {
      question: "¿Cómo puedo convertirme en afiliado?",
      answer:
        "Al registrarte automáticamente te generamos un enlace de afiliación que puedes decidir usar para compartir con tus conocidos, lo encontrarás en tu perfil de usuario. Si quieres saber más acerca de nuestro programa de afiliados puedes consultarlo en terminos y condiciones en el apartado 6.",
    },
    {
      question: "¿Cómo puedo obtener soporte al cliente?",
      answer:
        "Puedes enviarnos un correo a (casapi@inmoemprende.es) y te atenderemos lo antes posible.",
    },
    {
      question: "¿Puedo descargar mis informes generados?",
      answer:
        "¡Por supuesto! Todos los informes generados se pueden descargar de manera segura y almacenar en tu dispositivo.",
    },
  ];

  return (
    <section id="Preguntas Frecuentes" className="flex flex-col items-center bg-white py-14 text-center">
      <span className="text-lg font-bold text-brand lg:text-3xl">FAQ</span>
      <div className=" lg:flex-row flex-col flex justify-center gap-20">
        <img src={FaqImage} className=" lg:w-[40%] h-[40rem]" />
        <div className="flex flex-grow flex-col gap-5 px-2 py-14">
          {FAQS.map((el, index) => (
            <Question
              id={index + 1}
              key={index}
              question={el.question}
              answer={el.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

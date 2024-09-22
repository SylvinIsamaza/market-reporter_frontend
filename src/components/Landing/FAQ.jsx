import Question from "./Question";
import FaqImage from "../../assets/images/faq-image.png"

const FAQ = () => {
  const FAQS = [
    {
      question: "¿Cómo puedo generar un informe inmobiliario?",
      answer:
        "Para generar un informe, simplemente inicie sesión en su cuenta, seleccione la propiedad de interés y elija el tipo de informe. El sistema procesará y generará el informe basado en los datos más recientes.",
    },
    {
      question: "¿Puedo personalizar mi plan de suscripción?",
      answer:
        "Sí, puede personalizar su plan de suscripción para incluir la cantidad de informes que necesite cada mes. Ajuste su plan en cualquier momento a través de su panel de usuario.",
    },
    {
      question: "¿Qué métodos de pago se aceptan?",
      answer:
        "Aceptamos varios métodos de pago, incluidos PayPal, Stripe y las principales tarjetas de crédito, garantizando un proceso de pago seguro y conveniente.",
    },
    {
      question: "¿Cómo puedo convertirme en afiliado?",
      answer:
        "Para convertirse en afiliado, regístrese a través de nuestra página del programa de afiliados. Recibirá un enlace único para promocionar nuestros servicios y ganar comisiones por cada venta realizada a través de su referencia.",
    },
    {
      question: "¿Cómo puedo obtener soporte al cliente?",
      answer:
        "Puede comunicarse con nuestro equipo de soporte al cliente a través de correo electrónico. Estamos aquí para ayudarle con cualquier pregunta o problema que pueda tener.",
    },
    {
      question: "¿Puedo descargar mis informes generados?",
      answer:
        "¡Por supuesto! Todos los informes generados se pueden descargar de manera segura y almacenar en su dispositivo. Acceda a ellos en cualquier momento a través de su panel de usuario.",
    },
  ];

  return (
    <section className="flex flex-col items-center bg-white py-14 text-center">
      <span className="text-lg font-bold text-brand lg:text-3xl">FAQ</span>
      <div className=" min-[900px]:flex-row flex-col flex justify-center gap-20">
        <img src={FaqImage} className=" min-[900px]:w-[40%] h-[40rem]" />
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

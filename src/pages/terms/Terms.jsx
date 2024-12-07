import React, { useEffect } from "react";
import "./terms.css";
import Header from "@/components/Landing/Header";
import { Link } from "react-router-dom";
import { termsData } from "./data";
import Footer from "@/components/Landing/Footer";
function Terms() {
  const handleScroll = (id) => {
   
      scrollToSection(id);
    }
  

  const scrollToSection = (id) => {
   
    const section = document.getElementById(id);
    if (section) {
      
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  return (
    <div id="terms" className=" font-poppins flex flex-col items-center gap-14 ">
      <Header />
      <div className="flex h-[100vh] overflow-hidden gap-[10px]">
        <div className=" md:flex hidden pt-[100px] md:pl-[60px] px-[10px] gap-[10px] flex-col items-start">
          {termsData.map((terms) => {
            return (
              
              <Link className=" hover:scale-[1.02] transition-all duration-150 hover:bg-gray-200  rounded-md w-[300px] border-[1px]  px-[20px] py-[8px]" to={`#${terms.id}`} onClick={() => handleScroll(terms.id)}>{terms.title}</Link>
            )
          })}
        </div>
        <div className="w-full !px-[30px] text-[#000] md:px-[72px] overflow-auto  doc-content">
          <h2 className="c12" id="h.f163jrdpxylk">
            <span className="c2 c13">T&eacute;rminos y Condiciones de Uso</span>
          </h2>
          <h3 className="c4" id="h.ea1tbsn18w4t">
            <span className="c7 c2">1. Objeto y aceptaci&oacute;n</span>
          </h3>
          <p className="c10">
            <span>
              Los presentes T&eacute;rminos y Condiciones (en adelante,
              &quot;T&amp;C&quot;) regulan el acceso, uso y contrataci&oacute;n
              de los servicios ofrecidos en el sitio web{" "}
            </span>
            <span className="c2">casapi.ai</span>
            <span>
              &nbsp;(en adelante, el &ldquo;Sitio Web&rdquo;), gestionado por{" "}
            </span>
            <span className="c2">Inmoemprende Financial Corp SL</span>
            <span className="c0">
              &nbsp;(en adelante, la &ldquo;Empresa&rdquo;).
            </span>
          </p>
          <p className="c10">
            <span className="c0">
              El uso del Sitio Web, as&iacute; como la adquisici&oacute;n de
              cualquier producto o servicio ofrecido en el mismo, implica la
              aceptaci&oacute;n plena e incondicional de estos T&amp;C por parte
              del Usuario. Si el Usuario no acepta estos T&amp;C, deber&aacute;
              abstenerse de utilizar el Sitio Web.
            </span>
          </p>
          <hr />
          <p className="c6">
            <span className="c0"></span>
          </p>
          <h3 className="c4" id="h.1w6tr1wmjbyk">
            <span className="c7 c2">2. Servicios ofrecidos</span>
          </h3>
          <p className="c10">
            <span className="c0">
              El Sitio Web proporciona los siguientes servicios:
            </span>
          </p>
          <ol className="c1 lst-kix_ilelz54kri88-0 start" start="1">
            <li className="c3 li-bullet-0">
              <span className="c2">
                Generaci&oacute;n de informes inmobiliarios automatizados:
                <br />
              </span>
              <span className="c0">
                Informes generados mediante inteligencia artificial y datos
                provenientes de fuentes oficiales y terceros, que incluyen:
              </span>
            </li>
          </ol>
          <ul className="c1 lst-kix_ilelz54kri88-1 start">
            <li className="c9 li-bullet-0">
              <span className="c0">
                Valoraciones orientativas de compra y alquiler de inmuebles.
              </span>
            </li>
            <li className="c9 li-bullet-0">
              <span className="c0">
                Datos demogr&aacute;ficos y caracter&iacute;sticas del entorno.
              </span>
            </li>
            <li className="c9 li-bullet-0">
              <span className="c0">
                Comparativas de mercado mediante inmuebles testigo.
              </span>
            </li>
            <li className="c9 li-bullet-0">
              <span className="c0">
                Enlaces a servicios de terceros relacionados con el sector
                inmobiliario (reformas, seguros, etc.).
              </span>
            </li>
          </ul>
          <ol className="c1 lst-kix_ilelz54kri88-0" start="2">
            <li className="c3 li-bullet-0">
              <span className="c2">
                Suscripciones mensuales:
                <br />
              </span>
              <span className="c0">
                Planes que ofrecen acceso limitado a un n&uacute;mero mensual de
                informes inmobiliarios automatizados, especialmente
                dise&ntilde;ados para profesionales del sector.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c2">
                Programa de afiliaci&oacute;n opcional:
                <br />
              </span>
              <span className="c0">
                Un sistema de afiliaci&oacute;n que permite a los Usuarios
                obtener comisiones por ventas generadas a trav&eacute;s de
                enlaces personalizados.
              </span>
            </li>
          </ol>
          <hr />
          <p className="c6">
            <span className="c0"></span>
          </p>
          <h3 className="c4" id="h.9r2zvt63bpc3">
            <span className="c7 c2">3. Condiciones de uso del Sitio Web</span>
          </h3>
          <p className="c10">
            <span className="c0">El Usuario se compromete a:</span>
          </p>
          <ul className="c1 lst-kix_1125wxgjwlu-0 start">
            <li className="c3 li-bullet-0">
              <span className="c0">
                Hacer uso del Sitio Web de manera responsable y en conformidad
                con estos T&amp;C, la legislaci&oacute;n aplicable y los
                principios de buena fe.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                No utilizar el Sitio Web para realizar actividades
                il&iacute;citas, fraudulentas o que puedan da&ntilde;ar los
                intereses de la Empresa o de terceros.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                No intentar acceder a secciones restringidas del Sitio Web,
                alterar sus funcionalidades, o emplear el Sitio Web con fines
                distintos a los aqu&iacute; estipulados.
              </span>
            </li>
          </ul>
          <p className="c10">
            <span className="c0">
              En caso de incumplimiento, la Empresa se reserva el derecho de
              restringir, suspender o cancelar el acceso al Sitio Web del
              Usuario, sin perjuicio de las acciones legales correspondientes.
            </span>
          </p>
          <hr />
          <p className="c6">
            <span className="c0"></span>
          </p>
          <h3 className="c4" id="h.f0gqod5c9ho6">
            <span className="c7 c2">4. Condiciones de compra</span>
          </h3>
          <h4 className="c11" id="h.hz1b17t7ux6m">
            <span className="c2 c5">
              4.1. Modalidades de contrataci&oacute;n
            </span>
          </h4>
          <p className="c10">
            <span className="c0">
              El Sitio Web ofrece las siguientes opciones de compra:
            </span>
          </p>
          <ul className="c1 lst-kix_qydvrq81vklr-0 start">
            <li className="c3 li-bullet-0">
              <span className="c2">Informes individuales:</span>
              <span className="c0">
                &nbsp;Pago &uacute;nico por cada informe generado.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c2">Packs de informes:</span>
              <span className="c0">
                &nbsp;Adquisici&oacute;n de varios informes a un precio
                reducido.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c2">Suscripciones mensuales:</span>
              <span className="c0">
                &nbsp;Acceso recurrente a un n&uacute;mero espec&iacute;fico de
                informes al mes (25 o 50 informes, seg&uacute;n el plan
                seleccionado).
              </span>
            </li>
          </ul>
          <h4 className="c11" id="h.42znyt582c3y">
            <span className="c5 c2">
              4.2. Procedimiento de contrataci&oacute;n
            </span>
          </h4>
          <p className="c10">
            <span className="c0">
              El Usuario deber&aacute; seguir los siguientes pasos para realizar
              una compra en el Sitio Web:
            </span>
          </p>
          <ol className="c1 lst-kix_hvqpbc65xht0-0 start" start="1">
            <li className="c3 li-bullet-0">
              <span className="c0">
                Seleccionar el producto, pack o suscripci&oacute;n deseada.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                Realizar el pago correspondiente a trav&eacute;s de la pasarela
                de pago segura habilitada en el Sitio Web.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                Una vez confirmado el pago, proporcionar los datos necesarios
                para la generaci&oacute;n del informe o la activaci&oacute;n del
                servicio.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                Recibir el producto o servicio adquirido.
              </span>
            </li>
          </ol>
          <h4 className="c11" id="h.ldnjjld2h1q2">
            <span className="c5 c2">4.3. Plazos de entrega</span>
          </h4>
          <ul className="c1 lst-kix_swz0rwxb8we2-0 start">
            <li className="c3 li-bullet-0">
              <span className="c0">
                Los informes adquiridos a trav&eacute;s del Sitio Web
                ser&aacute;n generados y entregados en un tiempo razonable tras
                la recepci&oacute;n de los datos requeridos por parte del
                Usuario.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                Los plazos de entrega pueden variar en funci&oacute;n del
                volumen de solicitudes en paralelo, la carga del servidor o
                problemas t&eacute;cnicos imprevistos. La Empresa
                realizar&aacute; todos los esfuerzos razonables para minimizar
                retrasos y garantizar el cumplimiento del servicio en el menor
                tiempo posible.
              </span>
            </li>
          </ul>
          <h4 className="c11" id="h.yi56gfh0opia">
            <span className="c5 c2">
              4.4. Pol&iacute;ticas de reembolso y cancelaci&oacute;n
            </span>
          </h4>
          <ul className="c1 lst-kix_muhjkkjc678r-0 start">
            <li className="c3 li-bullet-0">
              <span className="c2">Compras individuales y packs:</span>
              <span className="c0">
                &nbsp;No se admiten devoluciones, salvo que se produzcan errores
                t&eacute;cnicos imputables al Sitio Web que impidan la correcta
                generaci&oacute;n del informe.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c2">Suscripciones:</span>
              <span className="c0">
                &nbsp;La cancelaci&oacute;n de una suscripci&oacute;n no
                dar&aacute; derecho a reembolso del per&iacute;odo ya abonado.
                El Usuario podr&aacute; seguir utilizando el servicio hasta el
                final de dicho per&iacute;odo.
              </span>
            </li>
          </ul>
          <hr />
          <p className="c6">
            <span className="c0"></span>
          </p>
          <h3 className="c4" id="h.wm3vwxb7w1bs">
            <span className="c7 c2">5. Limitaciones del servicio</span>
          </h3>
          <ol className="c1 lst-kix_tmzj1mxcrj2z-0 start" start="1">
            <li className="c3 li-bullet-0">
              <span className="c2">
                Car&aacute;cter orientativo de los informes:
                <br />
              </span>
              <span>
                Los informes generados son herramientas orientativas basadas en
                datos oficiales y modelos estad&iacute;sticos.{" "}
              </span>
              <span className="c5 c2">
                No constituyen una tasaci&oacute;n oficial ni una
                garant&iacute;a de exactitud.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c2">
                Factores no considerados:
                <br />
              </span>
              <span className="c0">
                Los informes no contemplan caracter&iacute;sticas
                espec&iacute;ficas del inmueble que puedan afectar a su valor,
                como el estado de conservaci&oacute;n, reformas recientes o
                aspectos subjetivos que solo pueden evaluarse mediante
                inspecci&oacute;n presencial.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c2">
                Uso del informe:
                <br />
              </span>
              <span className="c0">
                El Usuario es responsable del uso que haga de los informes. La
                Empresa no ser&aacute; responsable de decisiones
                econ&oacute;micas, legales o contractuales basadas
                exclusivamente en el contenido de los mismos.
              </span>
            </li>
          </ol>
          <hr />
          <p className="c6">
            <span className="c0"></span>
          </p>
          <h3 className="c4" id="h.r716s85i33rf">
            <span className="c7 c2">6. Programa de afiliaci&oacute;n</span>
          </h3>
          <h4 className="c11" id="h.d0jl9qtznjja">
            <span className="c5 c2">6.1. Funcionamiento del programa</span>
          </h4>
          <p className="c10">
            <span>
              El programa de afiliaci&oacute;n permite a los Usuarios generar un
              enlace personalizado para promocionar los servicios del Sitio Web.
              Por cada venta realizada a trav&eacute;s de dicho enlace, el
              afiliado recibir&aacute; una comisi&oacute;n del{" "}
            </span>
            <span className="c2">
              11% sobre la base imponible (antes de IVA)
            </span>
            <span className="c0">, siempre que:</span>
          </p>
          <ul className="c1 lst-kix_2bblfua0gpsh-0 start">
            <li className="c3 li-bullet-0">
              <span className="c0">
                La transacci&oacute;n no sea objeto de devoluci&oacute;n.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                El cliente no haya utilizado un cup&oacute;n de descuento, en
                cuyo caso la comisi&oacute;n se calcular&aacute;
                proporcionalmente al precio efectivamente pagado.
              </span>
            </li>
          </ul>
          <h4 className="c11" id="h.wmypo7bf6dpx">
            <span className="c5 c2">6.2. Modificaciones del programa</span>
          </h4>
          <p className="c10">
            <span>
              La Empresa se reserva el derecho de modificar las condiciones del
              programa en cualquier momento, notific&aacute;ndolo a los
              afiliados con un plazo m&iacute;nimo de{" "}
            </span>
            <span className="c5 c2">15 d&iacute;as de antelaci&oacute;n.</span>
          </p>
          <h4 className="c11" id="h.l59vjlz6on5d">
            <span className="c5 c2">6.3. Condiciones de pago</span>
          </h4>
          <ul className="c1 lst-kix_ynq92p1zpo3w-0 start">
            <li className="c3 li-bullet-0">
              <span>
                Las comisiones acumuladas se abonar&aacute;n una vez alcanzado
                un importe m&iacute;nimo de{" "}
              </span>
              <span className="c2">50 &euro;</span>
              <span className="c0">.</span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                Los pagos se realizar&aacute;n mediante transferencia bancaria o
                el m&eacute;todo acordado, dentro de los primeros 10 d&iacute;as
                del mes siguiente al cumplimiento del umbral.
              </span>
            </li>
          </ul>
          <hr />
          <p className="c6">
            <span className="c0"></span>
          </p>
          <h3 className="c4" id="h.usjj4upggvfo">
            <span className="c7 c2">7. Propiedad intelectual e industrial</span>
          </h3>
          <p className="c10">
            <span className="c0">
              Todos los contenidos, dise&ntilde;os, marcas, logotipos y
              dem&aacute;s elementos gr&aacute;ficos del Sitio Web son propiedad
              exclusiva de la Empresa o de terceros licenciantes.
            </span>
          </p>
          <p className="c10">
            <span className="c0">
              Queda prohibida la reproducci&oacute;n, distribuci&oacute;n,
              modificaci&oacute;n o uso no autorizado de dichos elementos, salvo
              que se cuente con el consentimiento previo y por escrito de la
              Empresa.
            </span>
          </p>
          <hr />
          <p className="c6">
            <span className="c0"></span>
          </p>
          <h3 className="c4" id="h.r9admmohkjie">
            <span className="c2 c7">
              8. Limitaci&oacute;n de responsabilidad
            </span>
          </h3>
          <h4 className="c11" id="h.urj055yqo32">
            <span className="c5 c2">8.1. Generaci&oacute;n de informes</span>
          </h4>
          <p className="c10">
            <span className="c0">
              La Empresa no ser&aacute; responsable de errores, omisiones o
              desactualizaciones en los informes generados, ni de las decisiones
              que los Usuarios puedan tomar bas&aacute;ndose en ellos.
            </span>
          </p>
          <h4 className="c11" id="h.4r1ovdqu1f50">
            <span className="c5 c2">8.2. Funcionamiento del Sitio Web</span>
          </h4>
          <p className="c10">
            <span className="c0">
              No se garantiza la disponibilidad continua del Sitio Web ni la
              ausencia de errores t&eacute;cnicos. La Empresa no ser&aacute;
              responsable de:
            </span>
          </p>
          <ul className="c1 lst-kix_62gi6kif1qom-0 start">
            <li className="c3 li-bullet-0">
              <span className="c0">
                Da&ntilde;os derivados de interrupciones del servicio.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                Ataques inform&aacute;ticos, virus u otras incidencias
                t&eacute;cnicas.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                Incompatibilidades con el dispositivo o software del Usuario.
              </span>
            </li>
          </ul>
          <h4 className="c11" id="h.hwzlzvw2d5gh">
            <span className="c5 c2">8.3. Enlaces a terceros</span>
          </h4>
          <p className="c10">
            <span className="c0">
              Los servicios de terceros recomendados en el Sitio Web son
              ofrecidos por proveedores independientes. La Empresa no asume
              responsabilidad alguna por la calidad, cumplimiento o
              adecuaci&oacute;n de dichos servicios.
            </span>
          </p>
          <hr />
          <p className="c6">
            <span className="c0"></span>
          </p>
          <h3 className="c4" id="h.9lf4kzy9gtoz">
            <span className="c7 c2">
              9. Modificaciones de los T&eacute;rminos y Condiciones
            </span>
          </h3>
          <p className="c10">
            <span className="c0">
              La Empresa se reserva el derecho de modificar estos T&amp;C en
              cualquier momento. Las modificaciones ser&aacute;n notificadas y
              publicadas en el Sitio Web con car&aacute;cter previo a su entrada
              en vigor.
            </span>
          </p>
          <hr />
          <p className="c6">
            <span className="c0"></span>
          </p>
          <h3 className="c4" id="h.qn2k6bc77xwl">
            <span className="c7 c2">
              10. Legislaci&oacute;n aplicable y jurisdicci&oacute;n
            </span>
          </h3>
          <p className="c10">
            <span>
              Estos T&amp;C se rigen por la legislaci&oacute;n espa&ntilde;ola.
              Para la resoluci&oacute;n de disputas, las partes se someten a los
              Juzgados y Tribunales de{" "}
            </span>
            <span className="c2">Barcelona</span>
            <span className="c0">
              , salvo disposici&oacute;n legal imperativa en contrario.
            </span>
          </p>
          <p className="c6">
            <span className="c0"></span>
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Terms;

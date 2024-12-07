import React, { useEffect } from "react";
import './cookie.css'
import { cookieData } from "./data";
import { Link } from "react-router-dom";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
function CookiePolicy() {
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
  <div id="cookie" className=" font-poppins flex flex-col items-center gap-14 ">
    <Header />
    <div className="flex h-[100vh] overflow-hidden gap-[10px]">
      <div className=" md:flex hidden pt-[100px] md:pl-[60px] px-[10px] gap-[10px] flex-col items-start">
        {cookieData.map((terms) => {
          return (
            
            <Link className=" hover:scale-[1.02] transition-all duration-150 hover:bg-gray-200  rounded-md w-[300px] border-[1px]  px-[20px] py-[8px]" to={`#${terms.id}`} onClick={() => handleScroll(terms.id)}>{terms.title}</Link>
          )
        })}
      </div>
      <div class="md:px-[40px] px-0 overflow-auto c10 doc-content">
        <h2 class="c13" id="h.vli9wd5jvofh">
          <span class="c2">Pol&iacute;tica de Cookies</span>
        </h2>
        <h3 class="c11" id="h.26k5qsfqt6ig">
          <span class="c5">1. Introducci&oacute;n</span>
        </h3>
        <p class="c6">
          <span>En el sitio web </span>
          <span class="c9">casapi.ai</span>
          <span class="c3">
            &nbsp;(en adelante, el &ldquo;Sitio Web&rdquo;), utilizamos cookies
            y tecnolog&iacute;as similares para mejorar la experiencia del
            Usuario, personalizar el contenido, ofrecer funcionalidades de redes
            sociales y analizar el tr&aacute;fico del sitio.
          </span>
        </p>
        <p class="c6">
          <span class="c3">
            Al acceder y continuar navegando en el Sitio Web, el Usuario acepta
            el uso de cookies conforme a esta Pol&iacute;tica, salvo que haya
            configurado su navegador para rechazarlas.
          </span>
        </p>
        <hr />
        <p class="c8">
          <span class="c3"></span>
        </p>
        <h3 class="c11" id="h.l9scvro0dtzw">
          <span class="c5">2. &iquest;Qu&eacute; son las cookies?</span>
        </h3>
        <p class="c6">
          <span class="c3">
            Las cookies son peque&ntilde;os archivos de texto que se almacenan
            en el dispositivo del Usuario al visitar un sitio web. Estas
            permiten al Sitio Web recordar informaci&oacute;n sobre la visita,
            como el idioma preferido y otras configuraciones, facilitando y
            mejorando la navegaci&oacute;n en visitas futuras.
          </span>
        </p>
        <hr />
        <p class="c8">
          <span class="c3"></span>
        </p>
        <h3 class="c11" id="h.684n2gm0sbb6">
          <span class="c5">3. Tipos de cookies utilizadas en el Sitio Web</span>
        </h3>
        <p class="c6">
          <span class="c3">
            En el Sitio Web se emplean las siguientes categor&iacute;as de
            cookies:
          </span>
        </p>
        <h4 class="c12" id="h.f0otfy4jujyl">
          <span class="c0">3.1. Cookies t&eacute;cnicas</span>
        </h4>
        <p class="c6">
          <span class="c3">
            Son esenciales para el funcionamiento b&aacute;sico del Sitio Web y
            permiten al Usuario navegar por el mismo y utilizar funciones como
            el acceso a &aacute;reas seguras o la realizaci&oacute;n de pagos.
            Sin estas cookies, el Sitio Web no puede funcionar correctamente.
          </span>
        </p>
        <h4 class="c12" id="h.6z2v8up2lypl">
          <span class="c0">3.2. Cookies de personalizaci&oacute;n</span>
        </h4>
        <p class="c6">
          <span class="c3">
            Permiten recordar las preferencias del Usuario, como el idioma, la
            regi&oacute;n o configuraciones espec&iacute;ficas, para mejorar su
            experiencia de navegaci&oacute;n.
          </span>
        </p>
        <h4 class="c12" id="h.ckclcchk9z9r">
          <span class="c0">3.3. Cookies anal&iacute;ticas</span>
        </h4>
        <p class="c6">
          <span>
            Se utilizan para analizar el comportamiento de los Usuarios en el
            Sitio Web y recopilar estad&iacute;sticas sobre el tr&aacute;fico,
            las p&aacute;ginas visitadas y las interacciones con el contenido.
            Ejemplo:{" "}
          </span>
          <span class="c0">Google Analytics.</span>
        </p>
        <h4 class="c12" id="h.lfmzqmc21cz1">
          <span class="c0">3.4. Cookies publicitarias</span>
        </h4>
        <p class="c6">
          <span class="c3">
            Estas cookies permiten gestionar de forma eficiente los espacios
            publicitarios del Sitio Web y mostrar anuncios relevantes para el
            Usuario, bas&aacute;ndose en sus h&aacute;bitos de
            navegaci&oacute;n. Tambi&eacute;n pueden emplearse para medir la
            eficacia de campa&ntilde;as publicitarias.
          </span>
        </p>
        <h4 class="c12" id="h.byfz2icja9l1">
          <span class="c0">3.5. Cookies de terceros</span>
        </h4>
        <p class="c6">
          <span class="c3">
            Algunas cookies utilizadas en el Sitio Web son gestionadas por
            terceros, como proveedores de servicios de an&aacute;lisis, redes
            sociales o plataformas publicitarias. Ejemplo: cookies de redes
            sociales como Facebook Pixel o Google Ads.
          </span>
        </p>
        <hr />
        <p class="c8">
          <span class="c3"></span>
        </p>
        <h3 class="c11" id="h.v898vxi373ol">
          <span class="c5">
            4. Gesti&oacute;n y desactivaci&oacute;n de cookies
          </span>
        </h3>
        <p class="c6">
          <span class="c3">
            El Usuario puede configurar su navegador para rechazar todas las
            cookies o recibir una notificaci&oacute;n cuando se env&iacute;e una
            cookie. A continuaci&oacute;n, se proporcionan enlaces a las
            instrucciones de configuraci&oacute;n de los navegadores m&aacute;s
            populares:
          </span>
        </p>
        <ul class="c7 lst-kix_13z7is3okxg3-0 start">
          <li class="c1 li-bullet-0">
            <span class="c9">Google Chrome:</span>
            <span class="c3">
              &nbsp;https://support.google.com/chrome/answer/95647?hl=es
            </span>
          </li>
          <li class="c1 li-bullet-0">
            <span class="c9">Mozilla Firefox:</span>
            <span>
              <a
                class="c4"
                href="https://www.google.com/url?q=https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias&amp;sa=D&amp;source=editors&amp;ust=1733423513057365&amp;usg=AOvVaw1XJuqcgVxZ8X7eVlUFS3wZ"
              >
                &nbsp;
              </a>
            </span>
            <span class="c14">
              <a
                class="c4"
                href="https://www.google.com/url?q=https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias&amp;sa=D&amp;source=editors&amp;ust=1733423513057473&amp;usg=AOvVaw1VBmaa1i_ha1X2APp_57sk"
              >
                https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias
              </a>
            </span>
          </li>
          <li class="c1 li-bullet-0">
            <span class="c9">Microsoft Edge:</span>
            <span>
              <a
                class="c4"
                href="https://www.google.com/url?q=https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09&amp;sa=D&amp;source=editors&amp;ust=1733423513057649&amp;usg=AOvVaw3KreVUrnw3nmPbfYgcOKIY"
              >
                &nbsp;
              </a>
            </span>
            <span class="c14">
              <a
                class="c4"
                href="https://www.google.com/url?q=https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09&amp;sa=D&amp;source=editors&amp;ust=1733423513057766&amp;usg=AOvVaw1cksVQkhKJB_RruiBv7V9N"
              >
                https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09
              </a>
            </span>
          </li>
          <li class="c1 li-bullet-0">
            <span class="c9">Safari:</span>
            <span>
              <a
                class="c4"
                href="https://www.google.com/url?q=https://support.apple.com/es-es/guide/safari/sfri11471/mac&amp;sa=D&amp;source=editors&amp;ust=1733423513057905&amp;usg=AOvVaw1ae__iy3C7flU6_GkhsAAn"
              >
                &nbsp;
              </a>
            </span>
            <span class="c14">
              <a
                class="c4"
                href="https://www.google.com/url?q=https://support.apple.com/es-es/guide/safari/sfri11471/mac&amp;sa=D&amp;source=editors&amp;ust=1733423513057971&amp;usg=AOvVaw03ZHO-NcBCmr-ZV8nrBV6-"
              >
                https://support.apple.com/es-es/guide/safari/sfri11471/mac
              </a>
            </span>
          </li>
        </ul>
        <p class="c6">
          <span class="c3">
            La desactivaci&oacute;n de algunas cookies puede afectar el
            funcionamiento del Sitio Web y limitar ciertas funcionalidades.
          </span>
        </p>
        <hr />
        <p class="c8">
          <span class="c3"></span>
        </p>
        <h3 class="c11" id="h.abg571ko2ga3">
          <span class="c5">5. Herramienta de consentimiento de cookies</span>
        </h3>
        <p class="c6">
          <span class="c3">
            El Sitio Web incluye un banner de cookies que permite al Usuario:
          </span>
        </p>
        <ul class="c7 lst-kix_n3kyn8tkqdru-0 start">
          <li class="c1 li-bullet-0">
            <span class="c3">Aceptar todas las cookies.</span>
          </li>
          <li class="c1 li-bullet-0">
            <span class="c3">Rechazar todas las cookies no esenciales.</span>
          </li>
          <li class="c1 li-bullet-0">
            <span class="c3">
              Configurar sus preferencias seleccionando las categor&iacute;as de
              cookies que desea aceptar.
            </span>
          </li>
        </ul>
        <p class="c6">
          <span class="c3">
            El Usuario puede modificar sus preferencias en cualquier momento
            desde el enlace de &quot;Configuraci&oacute;n de cookies&quot;
            disponible en el pie de p&aacute;gina del Sitio Web.
          </span>
        </p>
        <hr />
        <p class="c8">
          <span class="c3"></span>
        </p>
        <h3 class="c11" id="h.t82pmfg2lhet">
          <span class="c5">
            6. Actualizaciones de la Pol&iacute;tica de Cookies
          </span>
        </h3>
        <p class="c6">
          <span class="c3">
            La presente Pol&iacute;tica de Cookies puede ser actualizada para
            reflejar cambios en las cookies utilizadas o para cumplir con nuevas
            exigencias legales. Se recomienda al Usuario revisar esta
            Pol&iacute;tica peri&oacute;dicamente.
          </span>
        </p>
        <hr />
        <p class="c8">
          <span class="c3"></span>
        </p>
        <h3 class="c11" id="h.z0o80dgks5no">
          <span class="c5">7. Contacto</span>
        </h3>
        <p class="c6">
          <span class="c3">
            Para cualquier consulta relacionada con el uso de cookies en el
            Sitio Web, el Usuario puede ponerse en contacto con nosotros en:
          </span>
        </p>
        <ul class="c7 lst-kix_lfjwvt53jnz9-0 start">
          <li class="c1 li-bullet-0">
            <span class="c9">Correo electr&oacute;nico:</span>
            <span class="c3">&nbsp;inmoinforme@inmoemprende.es</span>
          </li>
        </ul>
        <p class="c8">
          <span class="c3"></span>
        </p>
      </div>
    </div>
    <Footer/>
  </div>
);
}

export default CookiePolicy;

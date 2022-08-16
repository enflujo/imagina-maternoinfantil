<script setup>
import { ref } from 'vue';

//const historiasAbiertas = reactive({ maria: false, claudia: false, raquel: false, camila: false, adriana: false });
const historiaAbierta = ref('');

function siVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        callback(element);
        observer.disconnect();
      }
    });
  }).observe(element);
}

function siInvisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio <= 0) {
        callback(element);
        observer.disconnect();
      }
    });
  }).observe(element);
}

function scroll() {
  const elements = document.querySelectorAll('.titulo');
  elements.forEach((el) => {
    siVisible(el, () => {
      el.classList.add('animado');
    });

    siInvisible(el, () => {
      if (el.classList.contains('animado')) {
        el.classList.remove('animado');
      }
    });
  });

  desaparecerComida();
  mostrarComida();
  mostrarMadres();
}

function desaparecerComida() {
  const historiaAlimentacion = document.getElementById('historiaAlimentacion');

  let scrollY;
  let paso =
    (historiaAlimentacion.getBoundingClientRect().height + historiaAlimentacion.getBoundingClientRect().top) / 20;

  document.addEventListener('scroll', () => {
    scrollY = historiaAlimentacion.getBoundingClientRect().top;

    for (let i = 0; i < 20; i++) {
      let imagenComida = document.getElementById(i);
      if (scrollY + paso * i < i) {
        imagenComida.style.visibility = 'hidden';
      } else if (scrollY <= 210) {
        imagenComida.style.visibility = 'visible';
      }
    }
  });
}

function mostrarComida() {
  const historiaAlimentacion = document.getElementById('historiaAlimentacion');
  const imagenesComida = document.getElementById('imagenesComida');
  const intro = document.getElementById('intro');
  const parrafo2 = document.getElementById('comidaParrafo2');

  siVisible(parrafo2, () => {
    imagenesComida.style.visibility = 'visible';
    imagenesComida.classList.add('animado');
  });

  siVisible(intro, () => {
    imagenesComida.style.visibility = 'hidden';
  });

  /*if (intro.getBoundingClientRect().top > 0) {
    imagenesComida.style.visibility = 'hidden';
  }*/
}

function mostrarMadres() {
  const historiaMadres = document.getElementById('historiaMadres');
  const menuMadres = document.getElementById('menuMadres');
  const imagenMadres = document.getElementById('imagenMadres');
  const imagenesComida = document.getElementById('imagenesComida');

  siVisible(menuMadres, () => {
    if (!imagenMadres.classList.contains('aparecer')) {
      imagenMadres.classList.add('aparecer');
    }
  });
}

function abrirHistoria(nombre = '') {
  if (historiaAbierta.value === nombre) {
    historiaAbierta.value = '';
  } else {
    historiaAbierta.value = nombre;
  }
}
</script>

<template>
  <div id="cuali" @mouseover="scroll()">
    <div id="intro">
      <h1 class="titulo">Narrativas de la pandemia</h1>
      <h3 class="subtitulo">Cómo se afectó la vida de las madres en la pandemia</h3>

      <p>
        En mayo y junio de 2022 se llevó a cabo una indagación cualitativa en las ciudades de Bogotá y Cúcuta. En este
        ejercicio participaron mujeres colombianas y venezolanas (regularizadas, no regularizadas y pendulares) que
        vivieron embarazos y partos durante la pandemia. De los resultados de esta investigación extrajimos algunos
        fragmentos sobre su experiencia alimentaria y sus vivencias en los servicios de salud colombianos.
      </p>

      <div id="menuHistorias">
        <a href="#historiaAlimentacion" class="botonHistoria" id="botonAlimentacion"
          ><img src="src\assets\imagenes\iconoAlimentacion.svg" />Alimentación</a
        >
        <a href="#historiaMadres" @click="imagenesComida.style.visibility = 'hidden'" class="botonHistoria"
          ><img src="src\assets\imagenes\iconoExperiencias.svg" />Madres en pandemia</a
        >
        <a href="#conclusiones" class="botonHistoria"
          ><img src="src\assets\imagenes\iconoAnticoncepcion.svg" />Algunas conclusiones</a
        >
      </div>
    </div>
    <div class="historia" id="historiaAlimentacion">
      <div class="columnaIzquierda">
        <div id="imagenesComida">
          <img class="imagen" id="19" src="src/assets/imagenes/comida_capa21.png" />
          <img class="imagen" id="18" src="src/assets/imagenes/comida_capa20.png" />
          <img class="imagen" id="17" src="src/assets/imagenes/comida_capa19.png" />
          <img class="imagen" id="16" src="src/assets/imagenes/comida_capa18.png" />
          <img class="imagen" id="15" src="src/assets/imagenes/comida_capa17.png" />
          <img class="imagen" id="14" src="src/assets/imagenes/comida_capa16.png" />
          <img class="imagen" id="13" src="src/assets/imagenes/comida_capa15.png" />
          <img class="imagen" id="12" src="src/assets/imagenes/comida_capa14.png" />
          <img class="imagen" id="11" src="src/assets/imagenes/comida_capa13.png" />
          <img class="imagen" id="10" src="src/assets/imagenes/comida_capa12.png" />
          <img class="imagen" id="9" src="src/assets/imagenes/comida_capa11.png" />
          <img class="imagen" id="8" src="src/assets/imagenes/comida_capa10.png" />
          <img class="imagen" id="7" src="src/assets/imagenes/comida_capa09.png" />
          <img class="imagen" id="6" src="src/assets/imagenes/comida_capa08.png" />
          <img class="imagen" id="5" src="src/assets/imagenes/comida_capa07.png" />
          <img class="imagen" id="4" src="src/assets/imagenes/comida_capa06.png" />
          <img class="imagen" id="3" src="src/assets/imagenes/comida_capa05.png" />
          <img class="imagen" id="2" src="src/assets/imagenes/comida_capa04.png" />
          <img class="imagen" id="1" src="src/assets/imagenes/comida_capa03.png" />
          <img class="imagen" id="0" src="src/assets/imagenes/comida_capa02.png" />
        </div>
      </div>
      <div class="columnaDerecha">
        <div class="titulo" id="titulo1">
          <h2>1. Si hay arroz, hay comida</h2>
          <h3 class="subtitulo">La experiencia de la alimentación en tiempos pandémicos</h3>
        </div>
        <div class="contenido">
          <p>
            La comida no siempre estuvo presenten de la misma forma en la experiencia de estas mujeres. En algunos
            casos, no faltó comida por las ayudas que recibían de organizaciones o familiares. Sin embargo, cuando este
            mercado empezaba a agotarse días antes de que llegara el siguiente, se reducían las porciones, la cantidad
            de comidas o los productos de los platos.
            <br />
          </p>

          <p id="comidaParrafo2">
            En medio de la pandemia y ante la pérdida de trabajo, algunas mujeres salieron de Bogotá para ir a vivir con
            sus familiares o los familiares de sus parejas en municipios o pueblo donde había más posibilidad de
            trabajar la tierra. Allí cultivaban diferentes alimentos para comer o para intercambiar con vecinos por
            otras cosas. Aunque no pasaron hambre, en esta situación no hubo variedad, ya que los municipios usualmente
            se dedican al cultivo de uno o pocos productos.
          </p>

          <p class="testimonio">
            Adriana cuenta que cuando estaban en la costa era más fácil la vida porque, aunque su esposo trabajaba por
            días, nunca faltaba la comida y no les faltaba a las niñas. De nuevo en Bogotá su esposo se ha enfrentado a
            situaciones de desempleo que han hecho que las porciones de comida se reduzcan. Esos días ella ha preferido
            no estar en casa para no tener que decirle a sus hijas que no les puede dar de comer lo que quieren.
          </p>

          <p>
            Con respecto a la comida hay diferencias regionales. Por ejemplo, algunas mujeres que estuvieron en la costa
            cuentan que hay más presencia de plátano o yuca. En cambio, quienes se quedaron en Bogotá o municipios
            cercanos hablan de papa y granos.
          </p>
          <p>
            El principal producto alimenticio para estas mujeres y sus familias es el arroz, tanto para las que son de
            Bogotá, como para aquellas que vienen de otras regiones de Colombia o de Venezuela.
          </p>
          <p>Otros alimentos mencionados comúnmente en los testimonios son papa, plátano, yuca, granos y huevos.</p>
          <p>
            Es recurrente escuchar que los productos como la carne, el queso, el pollo o los huevos son para los platos
            de los niños y niñas. Así, los adultos prescinden de estos alimentos cuando no alcanza. Esto nos hace
            preguntarnos: ¿Qué pasa con la salud nutricional de cuidadores (madres, abuelas y padres)? ¿Cómo se vigila
            su salud nutricional?
          </p>
        </div>
      </div>
    </div>

    <div class="historia" id="historiaMadres">
      <div class="columnaIzquierda">
        <img id="imagenMadres" class="imagen" src="src/assets/imagenes/madres_migrantes.png" />
      </div>
      <div class="columnaDerecha">
        <div class="titulo" id="titulo2">
          <h2>2. Madres en pandemia</h2>
          <h3 class="subtitulo">Experiencias de mujeres gestantes en el sistema de salud</h3>
        </div>
        <div class="contenido">
          <p>
            El embarazo y el parto son momentos decisivos para las mujeres, así como el momento del nacimiento es
            decisivo para el recién nacido. La pandemia de COVID-19 impactó los sistemas de salud y alteró la
            experiencia de las mujeres gestantes. Los controles prenatales, el parto y el postparto se vieron afectados.
            Aunque la mayoría de las entrevistadas tuvo controles prenatales durante el embarazo y accedió a ellos sin
            pagar, muchos se realizaron de forma virtual. Durante su parto en los hospitales las mujeres estuvieron
            solas, sin acompañantes, y tuvieron que respirar, soportar las contracciones y pujar con el tapabocas puesto
            y las ventanas abiertas en plena noche.
          </p>
          <p>A continuación algunos testimonios de mujeres que dieron a luz durante la pandemia*:</p>

          <div id="menuMadres">
            <div @click="abrirHistoria('maria')" class="botonMadres" id="botonMaria">María</div>
            <div @click="abrirHistoria('claudia')" class="botonMadres">Claudia</div>
            <div @click="abrirHistoria('raquel')" class="botonMadres">Raquel</div>
            <div @click="abrirHistoria('camila')" class="botonMadres">Camila</div>
            <div @click="abrirHistoria('adriana')" class="botonMadres">Adriana</div>
          </div>
          <div v-if="historiaAbierta === 'maria'" class="historiaMujer" id="maria">
            <h3>María</h3>
            <p>
              María es una mujer venezolana no regularizada que llegó a Bogotá con su pareja. Para ella no ha sido claro
              cómo funciona el sistema de salud en Colombia, sabe que su hija por nacer en Colombia tiene médico pero
              cree que ella, para estar dentro del sistema de salud, necesita portar un carné que lo certifique.
            </p>
            <p>
              En julio de 2021 fue por urgencias al hospital Simón Bolívar. Le hicieron un examen y le formularon
              algunos medicamentos porque tuvo una infección. Fuera de esa atención solo tuvo otros dos controles
              prenatales que pagó en un centro médico particular por el Olaya, en donde le hicieron un ecograma.
            </p>
            <p>
              Cuenta que todo iba bien hasta la semana 35, pero al llegar a la 36 rompió fuente y los dolores fueron
              insoportables. Tuvo que ir al Simón Bolívar, que era el hospital más cercano, donde la remitieron al
              hospital de Suba, que desde su barrio quedaba a una hora en transporte público. Todo se volvió traumático.
              No tuvo tiempo para ingresar en la sala de partos, su hija nació apenas entró al hospital. El personal de
              salud la regañó por haberse ido hasta Suba y no ir al Simón Bolívar, pese a explicarles que la habían
              enviado desde allá. No vio a su hija sino hasta el segundo día después del parto, pues al haber sido
              prematura tuvieron que drenarle sangre que tenía en la cabeza y podía ser peligrosa.
            </p>
            <div class="botonCerrar"><a href="#historiaMadres" @click="abrirHistoria('maria')">***cerrar***</a></div>
          </div>
          <div v-if="historiaAbierta === 'claudia'" class="historiaMujer" id="claudia">
            <h3>Claudia</h3>
            <p>
              Claudia tiene treinta y un años y vive en el barrio Cerro Norte en la localidad de Usaquén. Cuenta con
              EPS, con la cual pudo hacerse todos los controles prenatales cerca de su casa y pagó plan complementario
              para que un familiar pudiera acompañarla en su parto (finalmente, estuvo sola).
            </p>
            <p>
              Quedó en embarazo en medio de la pandemia y su EPS le asignó dos clínicas: la Corpas en Suba y La
              Magdalena en Teusaquillo. Le dieron una cita en la clínica de Teusaquillo para inducirle el parto, pero
              ella sentía que estaba de menos tiempo (37 semanas), pese a lo que decían los médicos. Cuando ingresó a la
              sala de partos iniciaron todos los protocolos, la bata, las agujas y en este caso, el tapabocas. Cuando le
              pusieron la oxitocina empezó a tener más contracciones. En los controles le habían dicho que debía
              respirar profundo, pero en la clínica le prohibieron quitarse el tapabocas por los protocolos de Covid, y
              le restringieron moverse e ir al baño. Como era primeriza, todas estas cosas la hacían sentir muy tensa,
              nerviosa y asustada, y era terrible no poder quitarse el tapabocas para respirar mejor. No dilató lo
              suficiente y la pasaron a cesárea, pero tuvo que esperar su turno porque había antes otras mujeres
              programadas. Estuvo esperando desde las 5:00 a.m. del 1 de octubre hasta las 2:00 a.m. del 2 de octubre.
              En medio del procedimiento tuvo ganas de vomitar, le pusieron una bolsa en la cabeza y le dijeron de podía
              vomitar allí.
            </p>
            <div class="botonCerrar"><a href="#historiaMadres" @click="abrirHistoria()">***cerrar***</a></div>
          </div>
          <div v-if="historiaAbierta === 'raquel'" class="historiaMujer" id="raquel">
            <h3>Raquel</h3>
            <p>
              Raquel lleva cuatro años en Colombia, llegó por la costa a Santa Marta, donde logró regularizarse y
              afiliarse al sistema de salud. Cuando se trasladó a Bogotá no le dio mayor importancia a la EPS, hasta que
              supo que estaba embarazada y se dio cuenta de que necesitaba hacer la portabilidad, porque su EPS no tenía
              cobertura en la ciudad. Al no tener servicios de salud disponible, tuvo que pagar controles prenatales de
              forma particular. Al llegar a la semana 32 un médico le dijo que tenía preclamsia, pero ella no le prestó
              mucha atención, pues no sabía con claridad qué era.
            </p>

            <p>
              Empezó a hacer el proceso de portabilidad cuando tenía 6 meses de embarazo y se hizo efectiva cuando ella
              estaba en la sala de parto. A finales de julio de 2020 (semana 37 de su embarazo) fue a urgencias al
              hospital de Suba. Llegó a medio día, le hicieron un ecograma y a las 9 p.m. la ingresaron, le pusieron una
              sonda y le indujeron el parto. Pasaron varias veces a hacerle tacto, pero solo dilató hasta 3 cm. A las
              7:00 a.m. del siguiente día había llegado a 5 cm de dilatación y rompió fuente hacia medio día, pero los
              médicos no hicieron nada. A las 4:00 p.m. la pasaron para hacerle la cesárea porque ya se sentía muy débil
              y su hija estaba sin líquido. En medio del procedimiento tuvo ganas de vomitar y recurrió a las
              enfermeras, pero nadie hizo nada, entonces Raquel se retiró el tapabocas y vomitó ahí, en medio de la
              sala. El tema de la preclamsia tuvo efectos renales por lo que la hospitalizaron cuatro días en UCI, donde
              nunca la iban a ver médicos, solo practicantes. Ella decía que la herida le dolía mucho pero la ignoraron,
              hasta que vino un médico que se dio cuenta que estaba infectada, tenía el cuerpo hinchado y había que
              drenarle la herida. Por esta situación, estuvo más días hospitalizada y sin ver a su hija.
            </p>
            <div class="botonCerrar"><a href="#historiaMadres" @click="abrirHistoria()">***cerrar***</a></div>
          </div>
          <div v-if="historiaAbierta === 'camila'" class="historiaMujer" id="camila">
            <h3>Camila</h3>
            <p>
              Camila tiene dos hijos, el mayor nació antes de la pandemia en la clínica Simón Bolívar, donde recibió una
              buena atención médica. Con su segunda hija la historia fue distinta. Durante la pandemia comenzó a
              trabajar y un mes después supo que estaba embarazada. La atención para sus controles prenatales fue buena,
              y la ginecóloga le programó una cesárea.
            </p>
            <p>
              Al llegar a las 36 semanas empezaron las contracciones; era un martes y ella fue a urgencias, donde le
              dijeron que eran falsas contracciones y que debía volver a casa, porque a las 36 semanas no le podían
              sacar el bebé, aunque el jueves se cumplía la semana 37. El jueves las contracciones se hicieron más
              seguidas, y en algún momento del día hizo una fuerza que le sacó sangre, así que se fue de urgencias para
              el hospital porque tenía mucho dolor. La ingresaron y solo había dilatado hasta uno y medio, aún no era
              suficiente. A las 3:00 a.m. las contracciones aumentaron. A las 5:00 a.m. vino una médica y, como había
              roto fuente, la alistaron para ingresar a cesárea. En el proceso de ingreso a cirugía casi no la pudieron
              anestesiar porque las contracciones eran muy seguidas. Cuando sacaron la niña, ella notó que no lloraba,
              le preguntó al médico y este solo le respondió que estuvo cerca de perderlas (a ella y su hija). Después
              de la cesárea le hicieron la ligadura de trompas, aún no le daban razón de su hija. A las 11:00 p.m. un
              médico le comentó que había tenido un desprendimiento de placenta del 80%, a la niña le faltó oxígeno y
              tuvieron que trasladarla a la clínica Cardioinfantil. Llegó el domingo y Camila aún no tenía información
              extra de su hija, sin embargo, le dieron salida del hospital.
            </p>
            <p>
              Cuando fue a la Cardioinfantil a preguntar por su hija le dijeron que la niña debía estar 15 días
              hospitalizada, y le informaron sobre los procedimientos que le realizarían. Todo salió bien. Después,
              cuando tuvo cita con la ginecóloga, le contó toda la experiencia. Según los médicos del Simón Bolívar las
              complicaciones surgieron durante la cirugía, pero la ginecóloga le dijo que había tenido que ver con los 3
              días que la hicieron esperar cuando la devolvieron a casa.
            </p>
            <div class="botonCerrar"><a href="#historiaMadres" @click="abrirHistoria()">***cerrar***</a></div>
          </div>
          <div v-if="historiaAbierta === 'adriana'" class="historiaMujer" id="adriana">
            <h3>Adriana</h3>
            <p>
              Adriana es una mujer de 21 años, viene de Maracaibo, Venezuela. El día que migró salió de su casa a las
              3:00 a.m. Llegó a las 3:00 p.m. a Maicao y desde allí tomó un jeep que la dejó en Venero, Magdalena.
              Después de estar 10 meses donde su abuela, viajó en bus hasta Bogotá con sus hijas y ha vivido en el mismo
              barrio desde que llegó. Su mamá y su papá son colombianos y viven en Bogotá. En la época de la entrevista
              se encontraba haciendo los trámites para la regularización de su situación en Colombia.
            </p>
            <p>
              Estaba en embarazo cuando empezó la pandemia. Su hija menor nació en la costa. Cumplió con todos los
              controles prenatales hasta los seis meses y medio, cuando dio a luz en un parto prematuro. Pasó gran parte
              de su embarazo hospitalizada o con visitas regulares porque era de alto riesgo. Sin embargo, los controles
              eran complicados porque en el pueblo no había un centro de salud y tenía que desplazarse hasta San
              Sebastián de Buenavista (Magdalena) en donde está el hospital. Debido al Covid hubo muchos protocolos para
              el ingreso y para ella fue tenso, ya que no tenía aseguramiento ni citas programadas para justificar su
              visita. Al final logró que la atendieran. En una oportunidad tuvo dolores y sangrado, fue al hospital y le
              dijeron que estaba embarazada, que tenía el cuello uterino abierto y era posible que su hija no
              sobreviviera. Entonces tenía dos meses de embarazo.
            </p>
            <p>
              Estuvo hospitalizada varios meses, cuando le dieron de alta, fue a la casa de su abuela y a los pocos días
              presentó dolores nuevamente y volvió al hospital. Después de esta segunda vez, tuvo que ir de manera
              constante para controlar el embarazo. El cuello uterino seguía abierto, tenía dolores de cabeza y una
              infección vaginal. El 8 de octubre, fecha en la que cumplía 5 meses, se levantó con dolores. En la tarde
              estaba hinchada y fue al hospital. De San Sebastián la trasladaron a El Banco (Magdalena), donde le
              dijeron que no podía tener a la bebé por el Covid y aunque había otra clínica particular, no la recibieron
              por no estar regularizada. Luego la trasladaron a Santa Marta, donde la rechazaron porque era venezolana
              sin papeles. Le programaron traslado a Valledupar, pero ella no podía ir sola y su esposo no podía dejar
              de trabajar, entonces, le dieron medicamentos para retener a la bebé y que naciera en la semana 36. Volvió
              a su casa.
            </p>
            <p>
              Cuando cumplió 36 semanas se levantó con muchos dolores y se fue en moto para San Sebastián. En el
              hospital le preguntaron si iba a control, Adriana no quería decir que le dolía porque esto implicaba que
              le hicieran un tacto y le resultaba incómodo. Fue al baño y se asustó porque sentía que tenía algo afuera.
              Cuando la médica la revisó, se dio cuenta de que la bebé tenía la cabeza afuera. Adriana no quería revivir
              el parto de su hija mayor, que duró 3 días y tuvo preclamsia. La pasaron a la sala de parto y en 3 pujes
              la bebé nació. Luego, a ella y a su hija las pasaron para cuarto, las atendieron muy bien, pese a que ella
              había escuchado de otras mujeres que por ser venezolana la trataban mal. La niña nació bien, lloró bien,
              todo estuvo bien a pesar de nacer de 6 meses y medio.
            </p>
            <div class="botonCerrar"><a href="#historiaMadres" @click="abrirHistoria()">***cerrar***</a></div>
          </div>
          <div id="separador"></div>
          <div id="nota">*Los nombres fueron cambiados para mantener el anonimato</div>
        </div>
      </div>
    </div>

    <div class="historia" id="conclusiones">
      <div class="columnaIzquierda"></div>
      <div class="columnaDerecha">
        <div class="titulo">
          <h2>3. Algunas conclusiones de la investigación cualitativa</h2>
        </div>
        <div class="contenido">
          <h3>Regularización y acceso</h3>
          <p>
            Para las mujeres venezolanas, en particular, y también para las colombianas que no comprenden el
            funcionamiento del sistema de salud, la forma de informarse es por medio de lo que dicen otras mujeres. Así
            sucedió en el caso de una de las mujeres que, sin estar regularizada y sin tener acceso a los servicios de
            salud, conoció a otra mujer que le dijo que podía ir a Profamilia donde la podían asesorar.
          </p>
          <p>
            Aunque las experiencias en el sistema de salud colombiano son variadas, las mujeres venezolanas no
            regularizadas enfrentan el problema de no estar aseguradas. Sus hijos, que nacen colombianos, vinculados a
            los sistemas públicos, pero ellas siguen sin aseguramiento. Consultar por urgencias es una forma que han
            encontrado para acceder a los sistemas de salud.
          </p>

          <h3>Planificación</h3>
          <p>
            El tema de la planificación es complejo porque, según las narrativas de las mujeres, son procedimientos
            estandarizados que se deben realizar sobre sus cuerpos después del parto. Como ellas señalan, en los centros
            de salud públicos o en la atención a población vulnerable, para el personal de salud es claro que deben
            salir con planificación. Sin embargo, no sabemos si haya la posibilidad de decir que no quieren planificar.
          </p>
          <p>
            Esta conversación suscitó una participación colectiva. En general, para ellas fue tensionante el momento en
            el que los médicos vinieron a decirles que debían planificar. Los médicos son insistentes y las mujeres se
            sienten obligadas a decir que quieren planificar. Después de procedimientos invasivos en donde quedan
            desnudas y con dolor, son presionadas a salir del hospital con algún método de planificación.
          </p>
          <p>
            No parece haber discusión médica sobre qué método es mejor según el historial clínico de cada mujer o sobre
            su fisiología. No todos los dispositivos funcionan igual en todos los cuerpos y rondan las sanciones morales
            del personal de la salud en caso de que estas mujeres se nieguen a planificar.
          </p>
          <p>
            Para varias mujeres estos métodos de planificación tienen efectos negativos en sus cuerpos o asocian ciertos
            síntomas a los implantes y métodos hormonales (dolores de cabeza, dolores en el cuerpo, cargas hormonales).
            También encuentran una fuerte resistencia en el personal de salud cuando ellas solicitan retirarse los
            dispositivos.
          </p>

          <h3>Experiencias</h3>
          <p>
            Varias mujeres hablan del momento en el que sintieron ganas de vomitar o vomitaron en medio de la cesárea.
            También cuentan que les tocó controlar esta sensación o vomitaron a escondidas porque, en teoría, ellas no
            podían moverse ni incomodar al personal de salud en su espacio de trabajo.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/constantes.scss';

#cuali {
  width: 100vw;
  padding: 6em 5em;
  background-color: $colorBlanco;
  font-size: 1.1em;
  overflow-x: clip;

  color: #0041bf;

  h1,
  h2 {
    color: #8686be;
  }

  h3 {
    padding: 1.5em 0em 0.5em 0em;
    color: #8686be;
  }

  #intro {
    width: 100vw;
    padding-left: 26vw;
    z-index: 2;
    position: relative;
    background: radial-gradient(#f2f2f2, #f2f2f200);
    padding-right: 31vw;
    padding-top: 2em;

    p {
      padding-left: 10em;
      padding-bottom: 2em;
    }

    .titulo {
      font-size: 2.2em;
      color: #0041bf;
    }

    .subtitulo {
      margin-bottom: 1em;
    }

    #menuHistorias {
      display: flex;
      margin: 2em 2em 2em 8em;
      justify-content: space-around;
    }

    .botonHistoria {
      cursor: pointer;
      color: #0041bf;
      font-size: 0.9em;
      text-align: center;
      width: 140px;
      height: 140px;
    }

    a {
      color: #0041bf;
    }

    a:hover {
      color: #8686be;
    }

    a:visited {
      color: #0041bf;
    }
  }

  .historia {
    display: grid;
    grid-template-columns: 39vw 30vw;

    .columnaIzquierda {
      padding: 19em;
      margin: 10em 2em;

      #imagenesComida {
        opacity: 0;

        &.animado {
          animation-name: animacionAparecer;
          animation-duration: 5s;
          @keyframes animacionAparecer {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        }
      }

      #imagenMadres {
        opacity: 0;
      }

      .imagen {
        width: 38vw;
        position: fixed;
        bottom: 0;
        left: 0vw;

        &.aparecer {
          animation-name: animacionAparecer;
          animation-duration: 5s;
          @keyframes animacionAparecer {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        }

        &.desaparecer {
          animation-name: animacionDesaparecer;
          animation-duration: 4s;
          @keyframes animacionDesaparecer {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        }
      }
    }
    .columnaDerecha {
      width: 42vw;
      margin: 6em 4em;
      padding-bottom: 4em;
      background-color: #e5eeed;
    }

    .titulo {
      margin-bottom: -1em;
      color: #8686be;
      font-size: 1.2em;
      padding: 2em 3em;

      &.animado {
        animation-name: animacionTitulo;
        animation-duration: 2s;
        @keyframes animacionTitulo {
          0% {
            margin-left: -8vw;
          }
          100% {
            margin-left: 0vw;
          }
        }
      }

      .subtitulo {
        font-size: 1em;
      }

      h2 {
        font-style: italic;
        color: #8686be;
      }

      h3,
      h4 {
        color: #8686be;
      }
    }

    p {
      margin-block: 1em;
    }

    #menuMadres {
      display: flex;
      justify-content: space-between;
      margin: 4em 0em 2em -6em;
    }
    .botonMadres {
      cursor: pointer;
      background-color: #0041bf;
      color: white;
      padding: 0.7em;
      margin: 5px;
    }

    .contenido {
      width: 28vw;
      margin-left: 10em;
      font-size: 1.1em;
      padding-right: 2em;

      .historiaMujer {
        width: 100%;
      }
      h3 {
        color: #8686be;
      }

      .botonCerrar {
        font-size: 0.8em;
        margin-bottom: 2em;
      }
    }

    .testimonio {
      font-style: italic;
      color: #8686be;
      margin: 2em;
    }

    #separador {
      height: 1px;
      width: 100%;
      background-color: #0041bf;
    }

    #nota {
      font-size: 0.6em;
      margin: 2em 0em;
    }
  }
}
</style>

export default [
  {
    nombreTabla: 'NACIDOS VIVOS BAJO PESO',
    nombreArchivo: 'nacidos-bajo-peso',
    nombreIndicador: 'Proporción de nacidos vivos a término con bajo peso al nacer',
    definicion:
      'Indica la proporción de nacidos vivos a término (37 semanas o más) que nacieron con peso inferior a 2.500 gramos en un momento y territorio específicos, con respecto al total de nacidos vivos en el mismo periodo y lugar.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'proporción',
    calculo:
      'Número de nacidos vivos a término (37 semanas o más) que pesaron menos de 2.500 gramos / Total de nacidos vivos en el mismo periodo y territorio',
    fuenteNumerador: 'CUBO INDICADORES EEVV: Nacidos vivos a término que pesaron menos de 2499 gramos',
    fuenteDenominador: 'CUBO INDICADORES EEVV: Nacidos vivos',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud'],
    serieDisponible: [],
    interpretacion:
      'El bajo peso al nacer es un serio problema de salud pública ya que expresa las condiciones de salud durante la gestación. Se asocia a complicaciones durante los primeros meses de vida, por ejemplo, mortalidad, deficiencias en el desarrollo cognitivo, e incluso puede aumentar el riesgo de padecer enfermedades no transmisibles como la diabetes durante la adultez. Un valor de 8% significa que existen 8 nacidos a término con bajo peso al nacer por cada 100 nacidos vivos en un territorio y momento específicos. Más información sobre la importancia del adecuado peso al nacer: https://apps.who.int/iris/bitstream/handle/10665/255733/WHO_NMH_NHD_14.5_spa.pdf',
    meta: { umbral: 10, descripcion: 'No debe superar el 10% según la meta a 2021 del Plan Decenal de Salud Pública.' },
    limitacion: '',
  },
  {
    nombreTabla: 'NACIDOS VIVOS 4 CONS PRENATAL',
    nombreArchivo: 'nacidos-4-controles-prenatales',
    nombreIndicador: 'Proporción de nacidos vivos con 4 o más controles prenatales',
    definicion:
      'Indica la proporción de nacidos vivos cuyas madres asistieron a 4 o más controles prenatales en un momento y territorio específicos.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'proporción',
    calculo:
      'Número de nacidos vivos cuyas gestantes asistieron a 4 o más controles prenatales / Total de nacidos vivos',
    fuenteNumerador: 'CUBO INDICADORES EEVV: Nacidos vivos cuyas madres tuvieron 4 o más controles prenatales',
    fuenteDenominador: 'CUBO INDICADORES EEVV: Total de nacidos vivos',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud', 'Edad de la madre'],
    serieDisponible: [],
    interpretacion:
      'La atención prenatal es fundamental para reducir el riesgo de muertes en los recién nacidos y en las gestantes. Es un indicador que expresa el acceso a los servicios de salud durante el embarazo, puesto que en la medida en que exista un mayor número de contactos de calidad entre las embarazadas y el personal de salud, se podrán reducir las complicaciones y riesgos durante esta etapa de la vida. Un valor de 7.4% indica que 7,4 de cada 100 nacidos vivos tuvieron 4 o más controles prenatales en un momento y territorio específicos. La Organización Mundial de la Salud recomienda un mínimo de 8 contactos entre las gestantes y el personal de salud para reducir la mortalidad perinatal y mejorar la experiencia de la atención en salud. Más información: https://www.who.int/es/news/item/07-11-2016-pregnant-women-must-be-able-to-access-the-right-care-at-the-right-time-says-who',
    meta: {
      umbral: 95,
      descripcion:
        'Según el Plan decenal de salud pública el 95% de las mujeres gestantes deben tener 4 o más controles prenatales. Según la meta de ODS para 2030, el 93% de las gestantes deben tener 4 o más controles prenatales.',
    },
    limitacion: '',
  },
  {
    nombreTabla: 'NACIDOS VIVOS <15 PAPA 4',
    nombreArchivo: 'nacidos-menores15-padre4',
    nombreIndicador: 'Proporción de nacidos vivos de madres menores de 15 años cuyo padre es mayor 4 años o más',
    definicion:
      'Indica la proporción de nacidos vivos de madres menores de 15 años cuyo padre es mayor 4 años o más, con respecto al total de nacimientos en un periodo y territorio definidos.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'proporción',
    calculo:
      'Número de nacidos vivos de madres menores de 15 años cuyo padre es mayor 4 años o más / Total de nacidos vivos para el mismo periodo de tiempo y territorio',
    fuenteNumerador:
      'CUBO INDICADORES EEVV: Nacidos vivos de madres menores de 15 años cuyo padre es mayor 4 años o más',
    fuenteDenominador: 'CUBO INDICADORES EEVV: Nacidos vivos',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud', 'Edad de la madre'],
    serieDisponible: [],
    interpretacion:
      'Cuando existe un embarazo en una niña menor de 14 años se considera delito de acceso carnal abusivo, según el artículo 208 de la Ley 1236 de 2008. Usualmente la edad de los padres es mayor que la de las madres lo cual sugiere que estos embarazos se asocian a abuso. Las relaciones sexuales con menores de 14 años son un delito, el reporte ante las autoridades competentes es un deber ciudadano para garantizar la atención y acompañamientos oportunos de la menor.',
    meta: { umbral: 0, descripcion: 'No existe meta, pero cualquier valor es inadmisible.' },
    limitacion: '',
  },
  {
    nombreTabla: 'PARTOS INSTITUCIONALES',
    nombreArchivo: 'partos-institucionales',
    nombreIndicador: 'Proporción de partos institucionales',
    definicion:
      'Indica la proporción de nacidos vivos que nacieron en instituciones de salud en un momento y territorio específicos, con respecto al total de nacidos vivos.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'proporción',
    calculo:
      'Número de nacidos vivos que nacieron en una institución de salud / Total de nacidos vivos para el mismo periodo de tiempo y territorio',
    fuenteNumerador: 'CUBO INDICADORES EEVV: Nacidos vivos que nacieron en instituciones de salud',
    fuenteDenominador: 'CUBO INDICADORES EEVV: Nacidos vivos',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud', 'Edad de la madre'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 98% indica que 98 partos de cada 100 nacimientos en un lugar y momento específico ocurren en instituciones de salud. La atención institucional del parto es una de las medidas básicas para disminuir la mortalidad materna y perinatal. No obstante, el parto debe ser atendido en condiciones de calidad y con personal entrenado para que se disminuya la posibilidad de complicaciones en el momento del alumbramiento. Las 24 horas posteriores al nacimiento son vitales tanto para la madre como para el bebé, por ello, es importante que durante esas horas reciban seguimiento y atención médica. Recientemente la Corte Constitucional reconoció la partería como un saber ancestral y patrimonial. Existe un deber constitucional y legal de integrar la partería como forma de medicina ancestral al Sistema General de Seguridad Social en Salud. Las parteras constituyen una fuente de educación sexual y planificación familiar en zonas en donde el acceso a los servicios de salud es muy limitado. Mas información: Sentencia T-128-22 https://www.corteconstitucional.gov.co/noticia.php?Corte-Constitucional-reconoce-la-parter%C3%ADa-como-saber-ancestral-y-patrimonio-cultural-de-la-Naci%C3%B3n,-exhorta-al-Ministerio-de-Salud-a-integrar-a-las-parteras-al-Sistema-de-Seguridad-Social-en-Salud-y-al-Congreso-a-legislar-sobre-este-tema-9274 ',
    meta: { umbral: null, descripcion: 'No existe una meta definida' },
    limitacion: '',
  },
  {
    nombreTabla: 'PARTOS POR CESAREA',
    nombreArchivo: 'partos-cesarea',
    nombreIndicador: 'Proporción de partos por cesárea',
    definicion:
      'Indica la proporción de nacidos vivos que nacieron por cesárea en un momento y territorio específicos, con respecto al total de nacidos vivos.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'proporción',
    calculo:
      'Número de nacidos vivos que nacieron por cesárea / Total de nacidos vivos para el mismo periodo de tiempo y territorio',
    fuenteNumerador: 'CUBO INDICADORES EEVV: Nacidos vivos que nacieron por cesárea',
    fuenteDenominador: 'CUBO INDICADORES EEVV: Total de nacidos vivos',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud', 'Edad de la madre'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 17% indica que 17 de cada 100 nacidos vivos han sido partos atendidos por cesárea, en un momento y territorio determinados. La cesárea solo debe ocurrir cuando se encuentra justificada desde el punto de vista médico para disminuir el riesgo de complicaciones y muerte de la gestante y el recién nacido. En situaciones como el parto prolongado o el sufrimiento fetal está recomendada la cesárea. Un informe de la Organización Mundial de la Salud reportó que 1 de cada 5 partos se realiza por cesárea. La cesárea es un procedimiento quirúrgico que puede conllevar a riesgos como todos los procedimientos de este tipo, y más si no es necesario. Mayor información: https://www.who.int/news/item/16-06-2021-caesarean-section-rates-continue-to-rise-amid-growing-inequalities-in-access Epidemia de cesáreas en Colombia: https://repositorio.uniandes.edu.co/bitstream/handle/1992/59067/Trabajo%20de%20grado_Epidemia%20de%20ces%c3%a1reas%20en%20Colombia_A%20De%20la%20Torre_FINAL.pdf?sequence=3&isAllowed=y',
    meta: { umbral: null, descripcion: 'No existe una meta clara, ya que depende de situaciones particulares' },
    limitacion: '',
  },
  {
    nombreTabla: 'NACIDOS DE <14 AÑOS',
    nombreArchivo: 'nacidos-menores14',
    nombreIndicador: 'Proporción de nacidos vivos hijos de niñas menores de 14 años',
    definicion:
      'Indica la proporción de nacidos vivos en niñas menores de 14 años con respecto a todos los nacidos vivos en un momento y territorio específico.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'proporción',
    calculo:
      'Número de nacidos vivos en niñas menores de 14 años o menos / Total de nacidos vivos en el mismo periodo de tiempo y territorio',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud', 'Grupos de edad'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 15% indica que ocurrieron 15 nacimientos en madres menores de 14 años por cada 100 nacidos vivos, en un territorio y momento específicos. Este indicador se relaciona con la “Proporción de nacidos vivos en mujeres menores de 15 años cuyo padre es mayor 4 o más años”. Las relaciones sexuales con menores de 14 años son un delito, el reporte ante las autoridades competentes es un deber ciudadano para garantizar la atención y acompañamientos oportunos de la menor.',
    meta: {
      umbral: 15,
      descripcion: 'La meta según PDSP es reducir la proporción de gestantes adolescentes al 15% al nivel nacional.',
    },
    limitacion: '',
  },
  {
    nombreTabla: 'PROP NACIDOS DE MUJ 14 A 17',
    nombreArchivo: 'nacidos-mujeres14-17',
    nombreIndicador: 'Proporción de nacidos vivos hijos de mujeres de 14 a 17 años',
    definicion:
      'Indica la proporción de nacidos vivos en mujeres de entre 14 y 17 años con respecto a todos los nacidos vivos.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'proporción',
    calculo:
      'Número de nacidos vivos en niñas de 14 a 17 años / Total de nacidos vivos en el mismo periodo de tiempo y territorio',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud', 'Grupos de edad'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 15% indica que ocurrieron 15 nacimientos en madres menores de 14 años por cada 100 nacidos vivos, en un territorio y momento específicos. La prevención del embarazo en la adolescencia es una responsabilidad compartida. En primer lugar, la educación sexual y reproductiva es fundamental, no solamente para que los adolescentes tengan relaciones sexuales seguras y accedan a métodos de planificación, sino para que puedan tomar decisiones informadas y consientes sobre sus propios cuerpos. En segundo lugar, una educación sexual con enfoque de género puede garantizar que se ejerzan menos violencias dentro de las relaciones sexuales y sentimentales y que las personas que son violentadas de alguna forma, puedan identificar con más facilidad los canales de atención, apoyo y denuncia. Tanto las instituciones educativas, como los centros de salud y las familias, deben fomentar la creación de redes de apoyo y comunicación para que las niñas y adolescentes en estado de embarazo no sean revictimizadas. Además, las redes de apoyo pueden aumentar la probabilidad de que esas niñas y adolescentes permanezcan en lugares seguros y lejos de los círculos de violencia. Las relaciones sexuales con menores de 14 años son un delito, el reporte ante las autoridades competentes es un deber ciudadano para garantizar la atención y acompañamientos oportunos de la menor. ',
    meta: { umbral: 15, descripcion: 'La meta según PDSP es reducir la proporción de gestantes adolescentes al 15%' },
    limitacion: '',
  },
  {
    nombreTabla: 'RAZON MORT MATERNA 1 AÑO',
    nombreArchivo: 'mortalidad-materna1',
    nombreIndicador: 'Razón de mortalidad materna a 1 año',
    definicion:
      'Indica el número de muertes de mujeres durante el embarazo parto o puerperio (incluye las muertes ocurridas durante el periodo de embarazo, hasta 365 días después de la terminación del embarazo) por cualquier causa relacionada o agravada por el embarazo, parto o puerperio, respecto a los nacidos vivos en el mismo periodo y territorio.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'razón',
    calculo: 'Muertes maternas durante un año / Nacidos vivos durante el mismo periodo',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 100000, descripcion: 'Por 100.000 nacidos vivos' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud', 'Grupos de edad'],
    serieDisponible: [],
    interpretacion:
      'Una razón de 3 significa que hubo 3 muertes maternas por cada 100.000 nacidos vivos en un momento y territorio determinados. Este es un indicador trazador de la calidad de vida y expresa una mortalidad evitable e injustificada. Se relaciona con otros indicadores como el control prenatal y la atención del parto institucional y con calidad. La mortalidad materna es más frecuente en las regiones apartadas y de difícil acceso a los servicios sanitarios.Los determinantes sociales de la mortalidad materna se encuentran relacionados con el área geográfica, existiendo una diferencia sustancial entre áreas rurales y urbanas y, con la pertenencia étnica. Según el informe del Instituto de Salud Pública sobre mortalidad materna de 2019, las razones más altas se encuentran en áreas geográficas asociadas a grupos poblacionales étnicos. Adicionalmente, los mayores casos se presentan en el régimen subsidiado de salud. Lo anterior, hace un llamado a prestar especial atención a factores sociales que influyen en las condiciones de vida de las madres; como la educación, la situación económica y el acceso a servicios de salud. Fuente: Informe de evento. Mortalidad materna, Colombia 2019. Instituto Nacional de Salud.',
    meta: {
      umbral: 150,
      descripcion:
        'Ninguna muerte materna es aceptable, sin embargo, de acuerdo con el Plan Decenal de Salud pública, los casos anuales no deben superar 150 muertes en el país. Meta ODS: A 2030 se reducirá a 32 la mortalidad materna por cada 100.000 nacidos vivos',
    },
    limitacion: '',
  },
  {
    nombreTabla: 'FECUNDIDAD 10 A 14 AÑOS',
    nombreArchivo: 'fecundidad-10-14',
    nombreIndicador: 'Tasa específica de fecundidad en mujeres de 10 a 14 años',
    definicion:
      'Indica el número de nacidos vivos de madres entre 10 a 14 años en un periodo y territorio específicos, por cada 1.000 mujeres de la misma edad en el mismo periodo y un territorio.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'tasa',
    calculo:
      'Número de nacidos vivos en mujeres de 10 a 14 años / Total de mujeres entre 10 y 14 años en un periodo y territorio específicos',
    fuenteNumerador: '',
    fuenteDenominador: '',
    unidadDeMedida: { valor: 1000, descripcion: 'Por 1000 mujeres' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Deparftamental y Municipal', 'Etnia', 'Régimen de aseguramiento en salud'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 20 indica que hubo 20 nacimientos por cada 1.000 mujeres de 10 a 14 años en un momento y territorio dado. Este grupo de indicadores miden de forma indirecta el acceso a los servicios de salud, en especial de los servicios de salud sexual y reproductiva en estos grupos de edad. Un embarazo a temprana edad trae consecuencias sociales y biológicas para la madre y el recién nacido ya que puede aumentar el riesgo de complicaciones e incluso la muerte ya sea de la madre o el recién nacido. Para entender y actuar sobre el embarazo adolescente se deben identificar las brechas territoriales, socioeconómicas y poblacionales, así como las asimetrías en el acceso y la calidad de la información. Adicionalmente, es importante construir infraestructuras que fortalezcan los procesos de visibilidad de casos para poder tener una estimación real de las dimensiones del embarazo en la niñez y la adolescencia, así como mejorar el acceso y la calidad de la educación sexual. *Fuente: UNFPA. Fecundidad en la niñez y la adolescencia en Colombia, 2022. Mayor información: https://colombia.unfpa.org/sites/default/files/pub-pdf/fecundidad_en_la_ninez_y_adolescencia_cesar_cristancho_dane_unfpa.pdf',
    meta: {
      umbral: 61,
      descripcion:
        'Debería estar por debajo de 61 nacimientos por cada 1.000 mujeres de 15-19 años para Colombia. ODS A 2030 A 46 por 1.000 mujeres de 15 a 19 ',
    },
    limitacion: '',
  },
  {
    nombreTabla: 'FECUNDIDAD 10 A 19 AÑOS',
    nombreArchivo: 'fecundidad-10-19',
    nombreIndicador: 'Tasa específica de fecundidad en mujeres de 10 a 19 años',
    definicion:
      'Indica el número de nacidos vivos de madres entre 10 a 19 años en un periodo y territorio específicos, por cada 1.000 mujeres de la misma edad en el mismo periodo y territorio.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'tasa',
    calculo:
      'Número de nacidos vivos en mujeres de 10 a 19 años / Total de mujeres entre 10 y 19 años en un periodo y territorio específicos',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 1000, descripcion: 'Por 1000 mujeres' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de aseguramiento en salud'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 20 indica que hubo 20 nacimientos por cada 1.000 mujeres de 10 a 14 años en un momento y territorio dado. Este grupo de indicadores miden de forma indirecta el acceso a los servicios de salud, en especial de los servicios de salud sexual y reproductiva en estos grupos de edad. Un embarazo a temprana edad trae consecuencias sociales y biológicas para la madre y el recién nacido ya que puede aumentar el riesgo de complicaciones e incluso la muerte ya sea de la madre o el recién nacido. Para entender y actuar sobre el embarazo adolescente se deben identificar las brechas territoriales, socioeconómicas y poblacionales, así como las asimetrías en el acceso y la calidad de la información. Adicionalmente, es importante construir infraestructuras que fortalezcan los procesos de visibilidad de casos para poder tener una estimación real de las dimensiones del embarazo en la niñez y la adolescencia, así como mejorar el acceso y la calidad de la educación sexual. *Fuente: UNFPA. Fecundidad en la niñez y la adolescencia en Colombia, 2022. Mayor información: https://colombia.unfpa.org/sites/default/files/pub-pdf/fecundidad_en_la_ninez_y_adolescencia_cesar_cristancho_dane_unfpa.pdf',
    meta: {
      umbral: 61,
      descripcion:
        'Debería estar por debajo de 61 nacimientos por cada 1.000 mujeres de 15-19 años para Colombia. ODS A 2030 A 46 por 1.000 mujeres de 15 a 19 ',
    },
    limitacion: '',
  },
  {
    nombreTabla: 'FECUNDIDAD 15 A 19 AÑOS',
    nombreArchivo: 'fecundidad-15-19',
    nombreIndicador: 'Tasa específica de fecundidad en mujeres de 15 a 19 años',
    definicion:
      'Indica el número de nacidos vivos de madres entre 15 a 19 años en un periodo y territorio específicos, por cada 1.000 mujeres de la misma edad en el mismo periodo y territorio.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'tasa',
    calculo:
      'Número de nacidos vivos en mujeres de 15 a 19 años / Total de mujeres entre 15 y 19 años en un periodo y territorio específicos',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 1000, descripcion: 'Por 1000 mujeres' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 20 indica que hubo 20 nacimientos por cada 1.000 mujeres de 10 a 14 años en un momento y territorio dado. Este grupo de indicadores miden de forma indirecta el acceso a los servicios de salud, en especial de los servicios de salud sexual y reproductiva en estos grupos de edad. Un embarazo a temprana edad trae consecuencias sociales y biológicas para la madre y el recién nacido ya que puede aumentar el riesgo de complicaciones e incluso la muerte ya sea de la madre o el recién nacido. Para entender y actuar sobre el embarazo adolescente se deben identificar las brechas territoriales, socioeconómicas y poblacionales, así como las asimetrías en el acceso y la calidad de la información. Adicionalmente, es importante construir infraestructuras que fortalezcan los procesos de visibilidad de casos para poder tener una estimación real de las dimensiones del embarazo en la niñez y la adolescencia, así como mejorar el acceso y la calidad de la educación sexual. *Fuente: UNFPA. Fecundidad en la niñez y la adolescencia en Colombia, 2022. Mayor información: https://colombia.unfpa.org/sites/default/files/pub-pdf/fecundidad_en_la_ninez_y_adolescencia_cesar_cristancho_dane_unfpa.pdf',
    meta: {
      umbral: 61,
      descripcion:
        'Debería estar por debajo de 61 nacimientos por cada 1000 mujeres de 15 a 19 años para Colombia. ODS A 2030 por debajo de 46 nacimientos por 1.000 mujeres de 15 a 19',
    },
    limitacion: '',
  },
  {
    nombreTabla: 'MORTALIDAD EN LA NIÑEZ',
    nombreArchivo: 'mortalidad-ninez',
    nombreIndicador: 'Tasa de mortalidad en menores de 5 años',
    definicion:
      'Indica el número de defunciones ocurridas en niños menores de 5 años por cada 1000 nacidos vivos en un periodo y territorio determinados.',
    grupo: 'Infantil',
    tipo: 'tasa',
    calculo:
      'Número de muertes de menores de 5 años en un periodo y territorio específicos / Número de nacidos vivos en el mismo periodo y territorio',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 1000, descripcion: 'Por 1000 nacimientos' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 60, indica que murieron 60 niños menores de 5 años por cada 1.000 nacidos vivos en un momento y territorio específico. La mortalidad en menores de 5 años es un reflejo directo de las desigualdades sociales y económicas de un país. Por ejemplo, en países como Honduras o Haití los niños del 20% de la población más pobre tienen al menos el doble de probabilidad de morir antes de los 5 años, en comparación con los niños cuyas familias tienen mayores niveles de ingresos. Esto tiene que ver con la calidad de vida y el acceso afectivos a servicios de salud de calidad, así como también los niveles educativos de las personas cuidadoras.',
    meta: {
      umbral: 15,
      descripcion:
        'A 2021 se habrá disminuido la mortalidad nacional en la niñez a 15 por 1000 nacidos vivos o menos. ODS: A 2030 A 15 por 1000',
    },
    limitacion: '',
  },
  {
    nombreTabla: 'MORTALIDAD EN < 1 AÑO',
    nombreArchivo: 'mortalidad-menor1',
    nombreIndicador: 'Tasa de mortalidad en menores de 1 año (mortalidad infantil)',
    definicion:
      'Indica el número de defunciones ocurridas en niños menores de 1 año por cada 1000 nacidos vivos en un periodo y territorio determinados.',
    grupo: 'Infantil',
    tipo: 'tasa',
    calculo:
      'Número de muertes de menores de 1 año en un periodo y territorio específicos / Número de nacidos vivos en el mismo periodo y territorio',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 1000, descripcion: 'Por 1000 nacimientos' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud'],
    serieDisponible: [],
    interpretacion:
      'Este es quizás uno de los indicadores más sensibles respecto al estado de salud de una población porque hace referencia a la mortalidad en los recién nacidos hasta el primer año de edad. Un valor de 12, indica que murieron 12 menores de 1 año por cada 1.000 nacidos vivos en un momentos y territorio específicos. La mortalidad en el primer año de vida está asociado a factores biológicos, ambientales, socioeconómicos, de los servicios de salud, así como, de las condiciones de salud durante el embarazo. También se asocia con la pobreza, la exclusión social y el limitado acceso al saneamiento básico, acceso al agua potable, alcantarillado.',
    meta: {
      umbral: 12,
      descripcion:
        'A 2021 se habrá disminuido la mortalidad infantil nacional ajustada a 12 o menos por cada 1000 nacidos vivos. ODS 2030 a 14 por cada 1000',
    },
    limitacion: '',
  },
  {
    nombreTabla: 'MORTALIDAD < 5IRA',
    nombreArchivo: 'mortalidad-5ira',
    nombreIndicador: 'Tasa de mortalidad por Infección Respiratoria Aguda (IRA) en menores de 5 años',
    definicion:
      'Indica el número de defunciones en niños menores de 5 años por infecciones respiratorias agudas con respecto a la población de niños menores de 5 años en un momento y territorio determinado',
    grupo: 'Infantil',
    tipo: 'tasa',
    calculo: 'Número de muertes por IRA en menores de 5 años / Número total de menores de 5 años',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 100000, descripcion: 'Por 100.000 menores de 5 años' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 3 indica que murieron 3 niños por infección respiratoria aguda por cada 100.000 niños menores de 5 años en un momento y territorio dados.Las infecciones respiratorias agudas son causa de muerte en niños y niñas menores de 5 años alrededor del mundo, especialmente en aquellas regiones apartadas y con limitado acceso a educación, saneamiento y servicios de salud de calidad. Las infecciones del tracto respiratorio (alto y bajo) son causadas por diferentes microorganismos, pudiendo causar desde resfriados comunes hasta neumonías que pueden comprometer la vida. Una adecuada nutrición, contar con el esquema de vacunación completo y conocer los signos de alarma de una infección respiratoria, son elementos básicos para evitar la mortalidad por esta causa, que en la mayoría de los casos es completamente prevenible. Información sobre mensajes clave: https://www.minsalud.gov.co/CC/Campanas/plegable-ira.pdf',
    meta: {
      umbral: 8.9,
      descripcion:
        'A 2021, se logra la reducción progresiva de la mortalidad por Infección Respiratoria Aguda (incluida Neumonía), buscando llegar a una mortalidad por Neumonía de menos de 8,9 casos por cada 100.000 menores de cinco años.',
    },
    limitacion: '',
  },
  {
    nombreTabla: 'MORTALIDAD < 5EDA',
    nombreArchivo: 'mortalidad-5eda',
    nombreIndicador: 'Tasa de mortalidad por Enfermedad Diarreica Aguda (EDA) en menores de 5 años',
    definicion:
      'Indica el número de defunciones en niños menores de 5 años por enfermedad diarreica aguda con respecto a la población de niños menores de 5 años.',
    grupo: 'Infantil',
    tipo: 'tasa',
    calculo: 'Número de muertes por EDA en menores de 5 años / Número total de menores de 5 años',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 100000, descripcion: 'Por 100.000 menores de 5 años' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 11 indica que ocurrieron 11 muertes por diarrea por cada 100.000 niños menores de 5 años en un momento y territorio determinados. La mortalidad por enfermedades diarreicas es la segunda causa de muerte a nivel mundial en los niños y niñas y es una causa de mortalidad prevenible. Durante 2019 ocurrieron más de 319.000 defunciones en niños y niñas por esta causa en el mundo. Las condiciones de vida, saneamiento básico y el acceso al agua potable son claves para evitar la propagación de estas enfermedades muchas veces transmitidas por el agua o alimentos contaminados. La desnutrición y la inmunosupresión también aumentan el riesgo de padecer enfermedades diarreicas. La lactancia materna exclusiva, el acceso al agua potable, adecuado lavado de manos, vacunación contra rotavirus son algunas de las formas de prevención. Más información en: https://www.who.int/es/news-room/fact-sheets/detail/diarrhoeal-disease',
    meta: {
      umbral: null,
      descripcion:
        'No existe una meta definida como tal. A 2021, se cuenta con el diseño, implementación y desarrollo progresivo de planes y programas territoriales de promoción y prevención de las enfermedades transmitidas por agua, suelo y alimentos',
    },
    limitacion: '',
  },
  {
    nombreTabla: 'MORTALIDAD PERINATAL',
    nombreArchivo: 'mortalidad-perinatal',
    nombreIndicador: 'Tasa de mortalidad perinatal',
    definicion:
      'Corresponde al número de muertes fetales con 22 semanas completas (154 días) de gestación o con 500 gramos o más de peso fetal y los siete días completos después del nacimiento, con respecto a los nacidos vivos más el número de muertes fetales con 22 semanas completas (154 días) de gestación o con 500 gramos o más de peso.',
    grupo: 'Ruta materno perinatal (Infantil)',
    tipo: 'tasa',
    calculo:
      'Número de casos de muerte perinatal en un periodo de tiempo / Total de nacidos vivos + muertes fetales en el mismo periodo de tiempo',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 1000, descripcion: 'Por 1000 nacimientos' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Edad', 'Sexo', 'Régimen de Salud'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 12 indica que ocurrieron 12 muertes perinatales por cada 1000 nacimientos. La mortalidad perinatal se relaciona con la atención prenatal, el acceso a los servicios de salud, las condiciones sociales y biológicas de la persona gestante. Además, es uno de los indicadores que más afecta la mortalidad en menores de 1 año. Una de las causas más frecuentes es un inadecuado desarrollo del feto, infecciones recurrentes durante el embarazo, diabetes gestacional, preeclampsia. Mayor información: https://cdn.who.int/media/docs/default-source/mca-documents/poner-fin-a-las-muertes-neonatales-y-fetales-prevenibles-para-2030d1b0f0d3-2c1c-49fa-a042-4960fe7029db.pdf?sfvrsn=6125b499_1',
    meta: {
      umbral: 12,
      descripcion:
        'De acuerdo con las metas de los Objetivos de Desarrollo Sostenible se espera que a 2030 se reduzca en los países a menos de 12 muertes por cada 1000 nacidos vivos.',
    },
    limitacion: '',
  },
  {
    nombreTabla: 'MORTALIDAD DESNUTRICI< 5',
    nombreArchivo: 'mortalidad-desnutricion',
    nombreIndicador: 'Tasa de mortalidad en menores de 5 años por desnutrición',
    definicion:
      'Número de muertes por desnutrición en menores de 5 años con respecto a la población de niños menores de 5 años en un momento y territorio determinado',
    grupo: 'Infantil',
    tipo: 'tasa',
    calculo: 'Número de muertes por desnutrición en menores de 5 años / Número total de menores de 5 años',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 100000, descripcion: 'Por 100.000 menores de 5 años' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 7 quiere decir que ocurrieron 7 defunciones por desnutrición por cada 100.000 niños menores de 5 años. La Convención sobre los Derechos del Niño protege el derecho del niño a la alimentación en el contexto del derecho a la vida, la supervivencia y el desarrollo, a la salud, a la nutrición y a un nivel adecuado de vida. En este sentido, no deberían ocurrir muertes por esta causa en ningún lugar del mundo, no obstante, es una de las primeras causas de mortalidad entre los niños y niñas menores de 5 años. Dentro de las causas más comunes de la desnutrición en menores de 5 años están las condiciones de vida, acceso insuficiente a fuentes de agua potable, familias en condiciones de pobreza y con amplias barreras de acceso a servicios de salud. El bajo peso de la madre durante el embarazo, el bajo peso al nacer, la ausencia o interrupción de la lactancia materna exclusiva y las infecciones parasitarias son factores que se relacionan con la desnutrición en la infancia. Mayor información: Convención sobre los derechos del niño https://www.unicef.org/lac/media/9731/file/PDF%20Convenci%C3%B3n%20sobre%20los%20Derechos%20del%20Ni%C3%B1o.pdf Desnutrición infantil en Colombia: https://blog.fundacionexito.org/desnutricion-infantil-en-colombia-tipos-y-consecuencias ',
    meta: {
      umbral: 0,
      descripcion:
        'Según el PDSP se esperaba reducir la mortalidad infantil evitable por desnutrición en forma progresiva el 30% en el 2013, 50% en el 2015 y 100% en 2020.',
    },
    limitacion: '',
  },
  {
    nombreTabla: '',
    nombreArchivo: '',
    nombreIndicador: 'Proporción de población menor de 5 años que es atendida para controles de rutina del niño o niña',
    definicion:
      'Indica la proporción de niños menores de 5 años que se atendieron por controles de rutina con respecto al total de niños atendidos en un momento y territorio determinado.',
    grupo: 'Salud Infantil',
    tipo: 'proporción',
    calculo:
      'Número de niños-niñas atendidos por controles de rutina /Total de niños-niñas atendidos en un momento y territorio definido.',
    fuenteNumerador:
      'CUBOS SISPRO RIPS: Número de personas atendidas para las atenciones de salud definidas según CIE-10',
    fuenteDenominador: 'CUBOS SISPRO RIPS: Total de niños menores de 5 años atendidos.',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: {
      descripcion: 'Atenciones por consulta para los códigos CIE-10: ',
      parametros: [
        'Z00: EXAMEN MÉDICO GENERAL',
        'Z001: CONTROL DE SALUD DE RUTINA DEL NIÑO',
        'Z002: EXAMEN DURANTE EL PERIODO DE CRECIMIENTO RÁPIDO EN LA INFANCIA',
      ],
    },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de Salud'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 35% indica que 35 de cada 100 niños y niñas menores de 5 años han consultado a los servicios de control de rutina. Identificar tempranamente las alteraciones que afectan el desarrollo de los niños y niñas es muy importante, puesto que permite llevar a cabo un conjunto de intervenciones para la gestión del riesgo y el cuidado de la salud en este momento tan importante de la vida. Los primeros 5 años de vida son cruciales para el desarrollo de una vida saludable durante la adultez. Para incrementar la proporción de población menor de 5 años que es atendida por controles de rutina, es necesario dirigir los esfuerzos para ampliar el acceso a información no tecnificada a las personas responsables del cuidado. Esto quiere decir, que es fundamental que las y los cuidadores puedan acceder a información clave sobre los controles necesarios rutinarios, los signos de alarma y el desarrollo esperado según los grupos de edad. Adicionalmente, es fundamental la creación de estrategias para que los grupos poblacionales más vulnerables; que viven en condiciones de pobreza, viven en áreas geográficas rurales a grandes distancias de centros de salud y con dificultades de acceso o grupos étnicos, puedan acceder a los servicios de salud necesarios.',
    meta: {
      umbral: null,
      descripcion:
        'De acuerdo con la Resolución 3280 de 2018, a partir del año hasta los 5 años, se debe consultar una vez al año.',
    },
    limitacion: 'Con la información disponible no es posible conocer cuántas veces asistió al año una misma persona.',
  },
  {
    nombreTabla: '',
    nombreArchivo: '',
    nombreIndicador: 'Proporción de gestantes atendidas por sífilis gestacional',
    definicion:
      'Indica la proporción de gestantes con diagnóstico de sífilis gestacional que se atendieron con respecto al total de gestantes en un momento y territorio determinado.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'proporción',
    calculo:
      'Número de gestantes con diagnóstico de sífilis gestacional/Total de gestantes atendidas en un momento y territorio definido.',
    fuenteNumerador:
      'CUBOS SISPRO RIPS: Número de personas atendidas para las atenciones de salud definidas según CIE-10',
    fuenteDenominador: 'CUBOS SISPRO RIPS: Total de gestantes atendidas.',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: {
      descripcion: 'Atenciones por consulta para los códigos CIE-10: ',
      parametros: ['O981: SÍFILIS QUE COMPLICA EL EMBARAZO, EL PARTO Y EL PUERPERIO'],
    },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de Salud'],
    serieDisponible: [],
    interpretacion:
      'La sífilis es una infección de transmisión predominantemente sexual. Se transmite de la madre al feto y puede llevar al aborto o complicaciones durante el embarazo en un 80% de las veces. Un valor de 5% indica de 5 de cada 100 gestantes han tenido el diagnóstico de sífilis gestacional en un momento y territorio específicos. Este indicador hace referencia a la detección temprana durante el embarazo (control prenatal), incluso desde la atención preconcepcional (Resolución 3280/ 2016). La importancia de la detección temprana de la sífilis gestacional radica en la disminución de los riesgos en salud para la madre y para el feto. Las complicaciones van desde la muerte perinatal y aborto espontáneo, hasta secuelas en salud de los recién nacidos. Los esfuerzos deben ir dirigidos a la prevención de la transmisión vertical de la gestante al feto a partir de la detección temprana y tratamiento de la infección en la etapa prenatal. Adicionalmente, se deben aumentar los esfuerzos en educación sexual basada en derechos, para en un primer momento, prevenir el contagio de infecciones de transmisión sexual y, en un segundo momento, fomentar sin estigmas el acceso a servicios de salud oportunos.',
    meta: {
      umbral: 1.0,
      descripcion:
        'La Organización Panamericana de la Salud (OPS) ha propuesto la meta de eliminar la sífilis congénita como problema de salud pública llevando la incidencia a 0,5 casos o menos, incluidos los mortinatos, por 1.000 nacidos. Para lograr esta meta, es necesario que se detecten y traten más de 95% de las gestantes infectadas, con lo que se logrará reducir la prevalencia de sífilis durante la gestación a menos de 1,0%',
    },
    limitacion:
      'Esta información depende de la especificidad con la cual el personal de salud diligencia los RIPS. En este caso puntual se analiza la información del código O981 y no se incluyeron otros como O983 otras infecciones con un modo de transmisión predominantemente sexual que complican el embarazo, parto y puerperio.',
  },
  {
    nombreTabla: '',
    nombreArchivo: '',
    nombreIndicador: 'Proporción de personas por infecciones predominantemente sexual',
    definicion:
      'Se refiere a la proporción de personas que fueron atendidas en consulta por infecciones de transmisión sexual en un momento y territorio específico.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'proporción',
    calculo:
      'Número de personas atendidas en consulta por enfermedades de transmisión sexual / Total de personas atendidas para el mismo periodo y territorio.',
    fuenteNumerador:
      'CUBOS SISPRO RIPS: Número de personas atendidas para las atenciones de salud definidas según CIE-10',
    fuenteDenominador: 'CUBOS SISPRO RIPS: Total de personas atendidas.',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: {
      descripcion: 'Atenciones por consulta para los códigos CIE-10:(Excluye VIH y sífilis congénita)',
      parametros: [
        'A51.0-A51.9: Sífilis precoz',
        'A52.0-A52.9: Sífilis tardía',
        'A53.0-A53.9 Sífilis no especificada',
        'A54.0-A54.9: Infección gonocócica no especificada',
        'A55-A56-A56.8: Infecciones por Clamidias',
        'A57-A58-A59: Chancro blando, granuloma inguinal, tricomoniasis.',
        'A60-A60.9: ',
        'A63.0-A63.8-A64: Otras enfermedades de transmisión sexual y las no especificadas',
      ],
    },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de Salud'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 15% indica que 15 de cada 100 personas ha sido atendida por alguna infección de este tipo. Según la información de la que se dispone actualmente, más de 30 bacterias, virus y parásitos diferentes se transmiten por contacto sexual. De acuerdo con la OMS los preservativos utilizados de manera correcta y sistemática protegen eficazmente estas infecciones y el VIH, siendo la educación sexual el primer paso para prevenirlas. Estas infecciones de transmisión predominantemente sexual pueden tener consecuencias para la salud en las personas, pueden generar complicaciones durante el embarazo, llevar a la infertilidad, aumentar la probabilidad de transmisión del VIH. En Colombia, la sexualidad es considerada como “una dimensión prioritaria en el curso de vida de las personas”. En razón a lo anterior, el esfuerzo institucional debe ir encaminado a que las personas experimenten esta dimensión desde un enfoque de derechos sexuales y reproductivos, garantizando no solo el acceso a servicios de salud de manera oportuna, sino a educación sexual no estigmatizante, con enfoque de género, diferencial y de reconocimiento de la diversidad. Para que los individuos, plenamente informados, gocen de una sexualidad sana, segura, digna y responsable. Fuente: Sexualidad, derechos sexuales y derechos reproductivos. Minsalud. Páginas - Sexualidad, derechos sexuales y derechos reproductivos (minsalud.gov.co) Más información en: https://www.who.int/es/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)',
    meta: {
      umbral: null,
      descripcion: 'No existe una meta específica sobre este tipo de infecciones excepto para VIH y sífilis congénita.',
    },
    limitacion: '',
  },
  {
    nombreTabla: '',
    nombreArchivo: '',
    nombreIndicador: 'Proporción de personas que fueron atendidas por síndromes de maltrato.',
    definicion:
      'Indica la proporción de personas que fueron atendidas por maltrato (abandono, abuso físico, abuso sexual, abuso psicológico, otros síndromes de maltrato) con respecto al total de personas atendidas en un momento y territorio específico',
    grupo: 'Salud Mental',
    tipo: 'proporción',
    calculo:
      'Número de personas atendidas por maltrato para cada año y territorio / Total de personas atendidas para el mismo año y territorio.',
    fuenteNumerador:
      'CUBOS SISPRO RIPS: Número de personas atendidas para las atenciones de salud definidas según CIE-10',
    fuenteDenominador: 'CUBOS SISPRO RIPS: Total de personas atendidas. ',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: {
      descripcion: 'Atenciones por consulta para los códigos CIE-10',
      parametros: ['T74.0: Negligencia o abandono, confirmados ', 'T74.9: Malos tratos no especificados, confirmados '],
    },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 5% significa que 5 de cada 100 personas en un territorio y momento específico fueron atendidas por maltrato. Es importante identificar en la población este tipo de conductas y prevenir la violencia en todas sus formas. Toda persona en quien se documente violencia interpersonal, basada en género y/o en el marco del conflicto armado, deberá ser tamizada para identificar problemas mentales, trastornos mentales, consumo de sustancias psicoactivas y epilepsia. Las personas víctimas de violencias deberán ser consideradas como una población priorizada para las intervenciones ofrecidas en el marco de esta Ruta Integral de Atención en Salud (Lineamientos RIA Salud Mental https://www.minsalud.gov.co/Anexos_Normatividad_Nuevo/Anexo%20t%C3%A9cnico%2001%20Lineamientos%20Salud%20Mental.pdf).',
    meta: {
      umbral: 100,
      descripcion:
        'Ninguna persona debe ser víctima del maltrato. Según el Plan decenal de salud pública, para el año 2022, el 100% de las víctimas de violencias de género y violencias sexuales identificadas deben recibir una atención integral de los sectores de salud, protección y justicia para la restitución de los derechos que les han sido vulnerados. Para el año 2022, el 100% de las EAPB en coordinación con las Secretarías Departamentales y Municipales de Salud, deben contar con una red integrada de servicios para víctimas de violencias de género y violencias sexuales.',
    },
    limitacion:
      'Este es un indicador que puede estar sub-registrado en la medida en que no siempre se relacionan este tipo de diagnósticos durante una consulta de servicios de salud.',
  },
  {
    nombreTabla: '',
    nombreArchivo: '',
    nombreIndicador: 'Proporción de personas que consultaron por servicios de anticoncepción',
    definicion:
      'Indica la proporción de personas atendidas anualmente por servicios de anticoncepción con respecto al total de personas atendidas en el mismo periodo y territorio.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'proporción',
    calculo:
      'Número de personas atendidas por servicios de anticoncepción / Total de personas atendidas para el mismo periodo y territorio.',
    fuenteNumerador:
      'CUBOS SISPRO RIPS: Número de personas atendidas para las atenciones de salud definidas según CIE-10',
    fuenteDenominador: 'CUBOS SISPRO RIPS: Total de personas atendidas',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: { descripcion: 'Atenciones por consulta para los códigos CIE-10', parametros: ['', '', ''] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 20% indica que 20 de cada 100 personas fueron atendidas por servicios de salud relacionados con la anticoncepción en un momento y territorio específicos. En Colombia, se garantiza el derecho de las personas a la información y una atención de calidad que incluya la consulta de anticoncepción, consejería y entrega de anticonceptivos modernos. Las instituciones administradoras y prestadoras de servicios de salud deberán garantizar el derecho a la anticoncepción sin barreras, gratis y con calidad.',
    meta: {
      umbral: 80,
      descripcion:
        'De acuerdo con el Plan Decenal de Salud Pública 2012-2021, el 80% de las mujeres entre 15-19 años deberán hacer uso de métodos anticonceptivos modernos. Es importante anotar que en la meta no se hace referencia a los hombres quienes también hacen uso de los métodos anticonceptivos. La encuesta nacional de demografía y salud del año 2015 indicó que: “Solo el 10.5 % de hombres independientemente de su estatus conyugal y actividad sexual reportan haber hablado sobre anticoncepción con un profesional de salud". De allí la importancia de repensar las intervenciones para que también se incluyan a los hombres en temas de salud sexual y reproductiva. Meta ODS: De aquí a 2030, garantizar el acceso universal a los servicios de salud sexual y reproductiva, incluidos los de planificación familiar, información y educación, y la integración de la salud reproductiva en las estrategias y los programas nacionales',
    },
    limitacion:
      'Este indicador incluye información sobre toda la población (mujeres y hombres) y la meta se encuentra enfocada únicamente en las mujeres.',
  },
];

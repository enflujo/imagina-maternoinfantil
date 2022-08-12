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
      'El bajo peso al nacer es un serio problema de salud pública ya que expresa las condiciones de salud durante la gestación. Se asocia a complicaciones durante los primeros meses de vida, por ejemplo, mortalidad, deficiencias en el desarrollo cognitivo, e incluso puede aumentar el riesgo de padecer enfermedades no transmisibles como la diabetes durante la adultez. Un valor de 8% significa que existen 8 nacidos a término con bajo peso al nacer por cada 100 nacidos vivos en un territorio y momento específicos. Más información sobre la importancia del adecuado peso al nacer:  https://apps.who.int/iris/bitstream/handle/10665/255733/WHO_NMH_NHD_14.5_spa.pdf',
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
      'Cuando existe un embarazo en una niña menor de 14 años en Colombia se considera delito de acceso carnal abusivo, según el artículo 208 de la Ley 1236 de 2008. Usualmente la edad de los padres es mayor que la de las madres, lo cual sugiere que estos embarazos se asocian a abuso. En realidad es una situación que no debería ocurrir, cualquier valor positivo es inadmisible.',
    meta: { umbral: 0, descripcion: '' },
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
      'Un valor de 98% indica que 98 partos de cada 100 nacimientos en un lugar y momento específico ocurren en instituciones de salud. La atención institucional del parto es una de las medidas básicas para disminuir la mortalidad materna y perinatal. No obstante, el parto debe ser atendido en condiciones de calidad y con personal entrenado para que se disminuya la posibilidad de complicaciones en el momento del alumbramiento. La situación ideal es que los partos se den en espacios institucionales y sean atendidos por personal calificado, sin embargo, recientemente la Corte Constitucional reconoció la partería como un saber ancestral y patrimonial. Existe un deber constitucional y legal de integrar la partería como forma de medicina ancestral al Sistema General de Seguridad Social en Salud.',
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
      'Un valor de 17% indica que 17 de cada 100 nacidos vivos han sido partos atendidos por cesárea, en un momento y territorio determinados. La cesárea solo debe ocurrir cuando se encuentra justificada desde el punto de vista médico para disminuir el riesgo de complicaciones y muerte de la gestante y el recién nacido. En situaciones como el parto prolongado o el sufrimiento fetal está recomendada la cesárea. Un informe de la Organización Mundial de la Salud reportó que 1 de cada 5 partos se realiza por cesárea. La cesárea es un procedimiento quirúrgico que puede conllevar a riesgos como todos los procedimientos de este tipo, y más si no es necesario. Mayor información: https://www.who.int/news/item/16-06-2021-caesarean-section-rates-continue-to-rise-amid-growing-inequalities-in-access',
    meta: { umbral: null, descripcion: 'No existe una meta clara, ya que depende de situaciones particulares' },
    limitacion: '',
  },
  {
    nombreTabla: 'NACIDOS DE <14 AÑOS',
    nombreArchivo: 'nacidos-menores14',
    nombreIndicador: 'Proporción de nacidos vivos hijos de niñas menores de 14 años',
    definicion:
      'Indica la proporción de nacidos vivos en niñas menores de 14 años con respecto a todos los nacidos vivos.',
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
      'Un valor de 15% indica que ocurrieron 15 nacimientos en madres menores de 14 años por cada 100 nacidos vivos, en un territorio y momento específicos.',
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
      'Número de nacidos vivos en mujeres de entre 14 y 17 años / Total de nacidos vivos en el mismo periodo de tiempo y territorio',
    fuenteNumerador: 'CUBO INDICADORES EEVV',
    fuenteDenominador: 'CUBO INDICADORES EEVV',
    unidadDeMedida: { valor: 100, descripcion: 'Por 100 (%)' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: ['Departamental y Municipal', 'Etnia', 'Régimen de salud', 'Grupos de edad'],
    serieDisponible: [],
    interpretacion:
      'Un valor de 15% indica que ocurrieron 15 nacimientos en madres menores de 14 años por cada 100 nacidos vivos, en un territorio y momento específicos',
    meta: { umbral: 15, descripcion: 'La meta según PDSP es reducir la proporción de gestantes adolescentes al 15%' },
    limitacion: '',
  },
  {
    nombreTabla: 'RAZON MORT MATERNA 1 AÑO',
    nombreArchivo: 'mortalidad-materna1',
    nombreIndicador: 'Razón de mortalidad materna a 1 año',
    definicion:
      'Indica el número de muertes de mujeres durante el embarazo parto o puerperio (después de los 42 días después del parto, pero antes de un año de la terminación del embarazo) por cualquier causa relacionada o agravada por el embarazo, parto o puerperio.',
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
      'Una razón de 3 significa que hubo 3 muertes maternas por cada 100.000 nacidos vivos en un momento y territorio determinados. Este es un indicador trazador de la calidad de vida y expresa una mortalidad evitable e injustificada. Se relaciona con otros indicadores como el control prenatal y la atención del parto institucional y con calidad. La mortalidad materna es más frecuente en las regiones apartadas y de difícil acceso a los servicios sanitarios.',
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
      'Indica el número de nacidos vivos de madres entre 10 a 14 años en un periodo y territorio específicos, por cada 1.000 mujeres de la misma edad en el mismo periodo y territorio.',
    grupo: 'Salud sexual y reproductiva',
    tipo: 'tasa',
    calculo:
      'Número de nacidos vivos en mujeres de 10 a 14 años / Total de mujeres entre 10 y 14 años en un periodo y territorio específicos',
    fuenteNumerador: '',
    fuenteDenominador: '',
    unidadDeMedida: { valor: 1000, descripcion: 'Por 1000 mujeres' },
    fichaTecnica: { descripcion: '', parametros: [] },
    nivelDesagregacion: [],
    serieDisponible: [],
    interpretacion:
      'Un valor de 20 indica que hubo 20 nacimientos por cada 1.000 mujeres de 10 a 14 años en un momento y territorio dado.',
    meta: { umbral: null, descripcion: '' },
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
    nivelDesagregacion: [],
    serieDisponible: [],
    interpretacion:
      'Un valor de 20 indica que hubo 20 nacimientos por cada 1.000 mujeres de 15 a 19 años en un momento y territorio dado.',
    meta: {
      umbral: null,
      descripcion: '',
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
      'Un valor de 20 indica, que hubo 20 nacimientos por cada 1000 mujeres de 15 a 19 años en un momento y territorio dado.',
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
    interpretacion: '',
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
    interpretacion: '',
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
      'Indica el número de defunciones en niños menores de 5 años por infecciones respiratorias agudas con respecto a la población de niños menores de 5 años.',
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
      'Un valor de 3 indica que murieron 3 niños por infección respiratoria aguda por cada 100.000 niños menores de 5 años en un momento y territorio dados.',
    meta: { umbral: null, descripcion: '' },
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
    meta: { umbral: null, descripcion: 'No existe una meta definida como tal' },
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
    nivelDesagregacion: ['Departamental y Municipal'],
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
      'Número de muertes por desnutrición en menores de 5 años con respecto a la población de niños menores de 5 años.',
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
      'Un valor de 7 quiere decir que ocurrieron 7 defunciones por desnutrición por cada 100.000 niños menores de 5 años.',
    meta: {
      umbral: 0,
      descripcion:
        'Según el PDSP se esperaba reducir la mortalidad infantil evitable por desnutrición en forma progresiva el 30% en el 2013, 50% en el 2015 y 100% en 2020.',
    },
    limitacion: '',
  },
];

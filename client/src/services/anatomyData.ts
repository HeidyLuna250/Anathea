// ═══════════════════════════════════════════
// ANATHEA — Repositorio Médico de Datos Clínicos & Anatómicos
// Información de alta precisión para estructuras anatómicas
// ═══════════════════════════════════════════

export interface StructureMedicalInfo {
  name: string;
  nameEs: string;
  nameLa: string;
  system: string;
  category: string;
  general: {
    description: string;
    classification: string;
    location: string;
    development: string;
  };
  function: {
    primary: string;
    biomechanics: string;
    physiology: string;
  };
  features: {
    morphology: string;
    vascularization: string;
    innervation: string;
    dimensions: string;
  };
  relations: {
    superior?: string;
    inferior?: string;
    anterior?: string;
    posterior?: string;
    articulations?: string[];
    insertions?: string[];
  };
  clinical: {
    conditions: { name: string; description: string; severity: 'leve' | 'moderada' | 'critica' }[];
    surgicalConsiderations: string;
  };
  references: {
    title: string;
    author: string;
    edition: string;
    year: number;
  }[];
}

export const ANATOMICAL_DETAILS: Record<string, StructureMedicalInfo> = {
  cráneo: {
    name: 'Cráneo',
    nameEs: 'Cráneo (Neurocráneo y Viscerocráneo)',
    nameLa: 'Cranium humanum',
    system: 'Sistema Esquelético',
    category: 'Esqueleto Axial',
    general: {
      description:
        'Estructura ósea compleja que rodea y protege el encéfalo y los órganos de los sentidos superiores, proporcionando inserción a los músculos faciales y de la masticación.',
      classification: 'Conjunto óseo sinartrodial (suturas) y diartrodial (ATM)',
      location: 'Porción superior del esqueleto axial, articulado inferiormente con el atlas (C1)',
      development: 'Osificación intramembranosa (bóveda) y endocondral (base craneal)',
    },
    function: {
      primary: 'Protección rígida del encéfalo, meninges y paquetes neurovasculares encefálicos.',
      biomechanics: 'Distribución de cargas oclusales hacia las columnas de resistencia del macizo facial.',
      physiology: 'Contención de las cavidades orbitaria, nasal, oral y del aparato estatoacústico.',
    },
    features: {
      morphology: 'Compuesto por 22 huesos (8 del neurocráneo y 14 del viscerocráneo)',
      vascularization: 'Arterias meníngeas anterior, media y posterior; ramas de la arteria carótida externa e interna',
      innervation: 'Nervio trigémino (V par craneal) y ramas de nervios cervicales C1-C3',
      dimensions: 'Capacidad craneal promedio: 1.350 a 1.450 cm³',
    },
    relations: {
      superior: 'Bóveda craneal y galea aponeurótica',
      inferior: 'Columna cervical a través de los cóndilos occipitales con el atlas',
      anterior: 'Macizo facial y órbitas',
      posterior: 'Músculos suboccipitales y ligamento de la nuca',
      articulations: ['Articulación temporomandibular (bicondílea)', 'Articulaciones atlanto-occipitales', 'Suturas craneales'],
      insertions: ['Músculo temporal', 'Músculo masetero', 'Músculos esternocleidomastoideo y trapecio'],
    },
    clinical: {
      conditions: [
        { name: 'Traumatismo Craneoencefálico (TCE)', description: 'Lesión estructural o funcional del encéfalo provocada por fuerzas biomecánicas externas.', severity: 'critica' },
        { name: 'Craneosinostosis', description: 'Cierre prematuro de una o más suturas craneales infantiles que altera la morfología cefálica normal.', severity: 'moderada' },
        { name: 'Cefalea Tensional / Migraña', description: 'Trastornos neurovasculares y miofasciales de la musculatura pericraneal.', severity: 'leve' },
      ],
      surgicalConsiderations:
        'Precaución con los senos venosos durales durante craneotomías y respeto de los orificios de la base del cráneo para prevenir fístulas de LCR.',
    },
    references: [
      { title: "Gray's Anatomy: The Anatomical Basis of Clinical Practice", author: 'Standring, S.', edition: '42.ª Edición', year: 2020 },
      { title: 'Anatomía con Orientación Clínica', author: 'Moore, K. L., Dalley, A. F., Agur, A. M.', edition: '9.ª Edición', year: 2022 },
      { title: 'Atlas de Anatomía Humana', author: 'Netter, F. H.', edition: '8.ª Edición', year: 2023 },
    ],
  },
  fémur: {
    name: 'Fémur',
    nameEs: 'Fémur (Hueso del Muslo)',
    nameLa: 'Os femoris',
    system: 'Sistema Esquelético',
    category: 'Esqueleto Apendicular Inferior',
    general: {
      description:
        'Hueso más largo, fuerte y pesado del cuerpo humano. Transmite el peso corporal desde el hueso coxal hacia la tibia durante la bipedestación y la locomoción.',
      classification: 'Hueso largo (epífisis proximal, diáfisis y epífisis distal)',
      location: 'Región femoral (muslo), entre la cadera y la rodilla',
      development: 'Osificación endocondral con un centro primario diafisario y cuatro secundarios',
    },
    function: {
      primary: 'Soporte de carga axial y palanca biomecánica fundamental para la marcha, carrera y salto.',
      biomechanics: 'Ángulo de inclinación cervicodiafisario promedio de 125°-126° que optimiza la eficacia del glúteo medio.',
      physiology: 'Reserva mineral ósea (calcio y fósforo) y hematopoyesis en la cavidad medular durante etapas tempranas.',
    },
    features: {
      morphology: 'Cuerpo cilíndrico prismático triangular ligeramente curvado hacia adelante',
      vascularization: 'Arteria circunfleja femoral medial y lateral; ramas perforantes de la arteria femoral profunda',
      innervation: 'Ramas periósticas de los nervios femoral, obturador y ciático',
      dimensions: 'Longitud promedio: 45 a 50 cm en adultos (representa aprox. el 26% de la estatura total)',
    },
    relations: {
      superior: 'Articulación coxofemoral (acetábulo del hueso coxal)',
      inferior: 'Articulación de la rodilla con la tibia y la rótula',
      anterior: 'Músculo cuádriceps femoral (recto femoral, vastos intermedio, medial y lateral)',
      posterior: 'Músculos isquiotibiales (bíceps femoral, semitendinoso, semimembranoso)',
      articulations: ['Articulación coxofemoral (enartrosis)', 'Articulación femorotibial (bicondílea)', 'Articulación femoropatelar (troclear)'],
      insertions: ['Músculo psoas mayor (trocánter menor)', 'Glúteo medio y menor (trocánter mayor)', 'Músculo aductor mayor (línea áspera)'],
    },
    clinical: {
      conditions: [
        { name: 'Fractura de Cuello Femoral', description: 'Muy prevalente en pacientes geriátricos osteoporóticos con riesgo de necrosis avascular de la cabeza femoral.', severity: 'critica' },
        { name: 'Coxartrosis (Artrosis de Cadera)', description: 'Degeneración progresiva del cartílago articular hialino con formación de osteofitos.', severity: 'moderada' },
        { name: 'Síndrome de Fricción de la Cintilla Iliotibial', description: 'Irritación por rozamiento sobre el epicóndilo femoral lateral en corredores.', severity: 'leve' },
      ],
      surgicalConsiderations:
        'En artroplastias de cadera o enclavado intramedular, preservar el suministro vascular retrógrado de los vasos retinaculares para prevenir la osteonecrosis.',
    },
    references: [
      { title: 'Anatomía con Orientación Clínica', author: 'Moore, K. L., Dalley, A. F., Agur, A. M.', edition: '9.ª Edición', year: 2022 },
      { title: 'Biomecánica Clínica del Aparato Locomotor', author: 'Nordin, M., Frankel, V. H.', edition: '4.ª Edición', year: 2018 },
      { title: "Gray's Anatomy for Students", author: 'Drake, R. L., Vogl, A. W., Mitchell, A. W. M.', edition: '4.ª Edición', year: 2020 },
    ],
  },
  tronco: {
    name: 'Tronco y Caja Torácica',
    nameEs: 'Caja Torácica y Columna Vertebral',
    nameLa: 'Thorax et columna vertebralis',
    system: 'Sistema Esquelético',
    category: 'Esqueleto Axial',
    general: {
      description:
        'Armazón osteocartilaginoso que protege los órganos vitales cardiorrespiratorios y mediastínicos, proporcionando soporte mecánico al tronco y anclaje a las cinturas escapular y pélvica.',
      classification: 'Estructura osteocartilaginosa articulada semi-móvil',
      location: 'Región medial del tórax y abdomen',
      development: 'Segmentación de los somitas embrionarios (esclerotomos)',
    },
    function: {
      primary: 'Protección del corazón, pulmones y grandes vasos; mecánica de la ventilación pulmonar.',
      biomechanics: 'Expansión tridimensional (diámetros anteroposterior, transversal y vertical) mediante movimientos en asa de cubo y brazo de bomba.',
      physiology: 'Hematopoyesis activa continua en el esternón, costillas y cuerpos vertebrales.',
    },
    features: {
      morphology: '12 pares de costillas (7 verdaderas, 3 falsas, 2 flotantes), esternón y 12 vértebras torácicas',
      vascularization: 'Arterias intercostales posteriores (aorta torácica) y anteriores (arteria torácica interna)',
      innervation: 'Nervios intercostales (ramos ventrales de T1 a T11) y nervio subcostal (T12)',
      dimensions: 'Volumen torácico dinámico dependiente del ciclo inspiratorio y espiratorio',
    },
    relations: {
      superior: 'Abertura torácica superior hacia la base del cuello',
      inferior: 'Músculo diafragma que separa la cavidad torácica de la abdominal',
      anterior: 'Pared torácica anterior y esternón',
      posterior: 'Columna vertebral torácica y musculatura paravertebral',
      articulations: ['Articulaciones costovertebrales', 'Articulaciones costotransversas', 'Articulaciones esternocostales'],
      insertions: ['Músculo diafragma', 'Músculos intercostales (externos, internos e íntimos)', 'Músculo pectoral mayor y menor'],
    },
    clinical: {
      conditions: [
        { name: 'Neumotórax a Tensión', description: 'Acúmulo patológico de aire a presión en el espacio pleural con colapso pulmonar y compromiso hemodinámico.', severity: 'critica' },
        { name: 'Fractura Costal Múltiple / Tórax Inestable', description: 'Pérdida de la continuidad parietal que genera respiración paradójica.', severity: 'critica' },
        { name: 'Costocondritis', description: 'Inflamación benigna pero dolorosa de las uniones costocondrales esternales.', severity: 'leve' },
      ],
      surgicalConsiderations:
        'Las punciones o toracocentesis deben realizarse siempre sobre el borde superior de la costilla inferior para evitar lesionar el paquete vasculonervioso intercostal.',
    },
    references: [
      { title: "Gray's Anatomy", author: 'Standring, S.', edition: '42.ª Edición', year: 2020 },
      { title: 'Atlas de Anatomía Humana', author: 'Netter, F. H.', edition: '8.ª Edición', year: 2023 },
    ],
  },
  brazo: {
    name: 'Extremidad Superior',
    nameEs: 'Extremidad Superior (Húmero, Radio y Cúbito)',
    nameLa: 'Membrum superius',
    system: 'Sistema Esquelético',
    category: 'Esqueleto Apendicular Superior',
    general: {
      description:
        'Conjunto osteomuscular de máxima movilidad diseñado para la manipulación precisa de objetos, alcance espacial y prensión fina.',
      classification: 'Cadena cinemática abierta poliarticular',
      location: 'Unido al esqueleto axial mediante la cintura escapular (clavícula y escápula)',
      development: 'Brote de la extremidad a partir del mesodermo lateral durante la 4.ª semana gestacional',
    },
    function: {
      primary: 'Posicionamiento espacial de la mano y ejecución de tareas motoras complejas.',
      biomechanics: 'Coordinación del ritmo escapulohumeral (2:1) y movimientos de pronosupinación del antebrazo.',
      physiology: 'Sensibilidad táctil discriminativa y propioceptiva de alta densidad.',
    },
    features: {
      morphology: 'Segmentado en hombro, brazo (húmero), codo, antebrazo (radio y cúbito), carpo y mano',
      vascularization: 'Arteria axilar que continúa como arteria braquial, bifurcándose en radial y cubital',
      innervation: 'Plexo braquial (raíces C5-T1) dando origen a los nervios mediano, radial, cubital, musculocutáneo y axilar',
      dimensions: 'Rango de abducción escapulohumeral de hasta 180°',
    },
    relations: {
      superior: 'Articulación glenohumeral con la cavidad glenoidea de la escápula',
      inferior: 'Articulación radiocarpiana con el cóndilo carpiano',
      anterior: 'Músculo bíceps braquial, braquial anterior y coracobraquial',
      posterior: 'Músculo tríceps braquial',
      articulations: ['Articulación glenohumeral (esferoidea)', 'Articulación del codo (tróclea y cóndilo)', 'Articulación radiocubital distal (trocoide)'],
      insertions: ['Músculo deltoides (tuberosidad deltoidea)', 'Músculo pectoral mayor', 'Músculo dorsal ancho'],
    },
    clinical: {
      conditions: [
        { name: 'Luxación Glenohumeral Anterior', description: 'Desplazamiento traumático de la cabeza humeral fuera de la fosa glenoidea.', severity: 'moderada' },
        { name: 'Fractura Diafisaria de Húmero con Lesión del Nervio Radial', description: 'Provoca incapacidad para extender la muñeca ("mano caída").', severity: 'critica' },
        { name: 'Epicondilitis Lateral (Codo de Tenista)', description: 'Tendinopatía insercional de los extensores radiales del carpo.', severity: 'leve' },
      ],
      surgicalConsiderations:
        'Cuidar el trayecto espiral del nervio radial a lo largo del canal de torsión humeral en abordajes posteriores del brazo.',
    },
    references: [
      { title: 'Anatomía con Orientación Clínica', author: 'Moore, K. L., Dalley, A. F.', edition: '9.ª Edición', year: 2022 },
      { title: 'Cirugía Ortopédica y Traumatología', author: 'Campbell', edition: '14.ª Edición', year: 2021 },
    ],
  },
};

export function getMedicalInfoForSelection(selectedName: string | null): StructureMedicalInfo {
  if (!selectedName) {
    return ANATOMICAL_DETAILS.cráneo;
  }

  const normalized = selectedName.toLowerCase();

  if (normalized.includes('cráneo') || normalized.includes('craneo') || normalized.includes('cabeza')) {
    return ANATOMICAL_DETAILS.cráneo;
  }
  if (normalized.includes('fémur') || normalized.includes('femur') || normalized.includes('pierna')) {
    return ANATOMICAL_DETAILS.fémur;
  }
  if (normalized.includes('tronco') || normalized.includes('torax') || normalized.includes('tórax') || normalized.includes('caja')) {
    return ANATOMICAL_DETAILS.tronco;
  }
  if (normalized.includes('brazo') || normalized.includes('extremidad') || normalized.includes('mano') || normalized.includes('húmero')) {
    return ANATOMICAL_DETAILS.brazo;
  }

  // Devolver Cráneo por defecto
  return {
    ...ANATOMICAL_DETAILS.cráneo,
    name: selectedName.replace(/_/g, ' '),
    nameEs: selectedName.replace(/_/g, ' '),
  };
}

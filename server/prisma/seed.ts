// ═══════════════════════════════════════════
// ANATHEA — Seed de datos iniciales
// Ejecutar: npm run db:seed -w server
// ═══════════════════════════════════════════

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧬 ANATHEA — Iniciando seed de datos...\n');

  // ═══════════════════════════════════════════
  // ROLES
  // ═══════════════════════════════════════════
  console.log('👤 Creando roles...');
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
        description: 'Administrador con acceso completo',
        permissions: { canEdit: true, canDelete: true, canManageUsers: true, canManageContent: true },
      },
    }),
    prisma.role.upsert({
      where: { name: 'editor' },
      update: {},
      create: {
        name: 'editor',
        description: 'Editor de contenido anatómico',
        permissions: { canEdit: true, canDelete: false, canManageUsers: false, canManageContent: true },
      },
    }),
    prisma.role.upsert({
      where: { name: 'student' },
      update: {},
      create: {
        name: 'student',
        description: 'Estudiante con acceso de lectura',
        permissions: { canEdit: false, canDelete: false, canManageUsers: false, canManageContent: false },
      },
    }),
    prisma.role.upsert({
      where: { name: 'viewer' },
      update: {},
      create: {
        name: 'viewer',
        description: 'Visitante con acceso limitado',
        permissions: { canEdit: false, canDelete: false, canManageUsers: false, canManageContent: false },
      },
    }),
  ]);
  console.log(`   ✅ ${roles.length} roles creados\n`);

  // ═══════════════════════════════════════════
  // 12 SISTEMAS ANATÓMICOS
  // ═══════════════════════════════════════════
  console.log('🦴 Creando sistemas anatómicos...');
  const systems = [
    {
      name: 'Skeletal System',
      nameEs: 'Sistema Esquelético',
      nameLa: 'Systema skeletale',
      description: 'El sistema esquelético proporciona soporte estructural al cuerpo, protege los órganos internos, permite el movimiento mediante la articulación con los músculos, almacena minerales como calcio y fósforo, y alberga la médula ósea donde se producen las células sanguíneas.',
      slug: 'esqueletico',
      sortOrder: 1,
      color: '#E8D44D',
      icon: 'bone',
      isActive: true,
    },
    {
      name: 'Muscular System',
      nameEs: 'Sistema Muscular',
      nameLa: 'Systema musculare',
      description: 'El sistema muscular está compuesto por más de 600 músculos esqueléticos que permiten el movimiento voluntario del cuerpo, mantienen la postura y generan calor. Incluye también músculo liso (involuntario) y músculo cardíaco.',
      slug: 'muscular',
      sortOrder: 2,
      color: '#E74C3C',
      icon: 'biceps-flexed',
      isActive: true,
    },
    {
      name: 'Nervous System',
      nameEs: 'Sistema Nervioso',
      nameLa: 'Systema nervosum',
      description: 'El sistema nervioso coordina las acciones del cuerpo transmitiendo señales eléctricas y químicas. Se divide en sistema nervioso central (encéfalo y médula espinal) y sistema nervioso periférico (nervios craneales y espinales).',
      slug: 'nervioso',
      sortOrder: 3,
      color: '#F1C40F',
      icon: 'brain',
      isActive: true,
    },
    {
      name: 'Cardiovascular System',
      nameEs: 'Sistema Cardiovascular',
      nameLa: 'Systema cardiovasculare',
      description: 'El sistema cardiovascular transporta sangre oxigenada, nutrientes, hormonas y productos de desecho a través del cuerpo mediante el corazón y una red de vasos sanguíneos (arterias, venas y capilares).',
      slug: 'cardiovascular',
      sortOrder: 4,
      color: '#C0392B',
      icon: 'heart-pulse',
      isActive: true,
    },
    {
      name: 'Respiratory System',
      nameEs: 'Sistema Respiratorio',
      nameLa: 'Systema respiratorium',
      description: 'El sistema respiratorio facilita el intercambio de gases entre el cuerpo y el ambiente: oxígeno del aire inspirado hacia la sangre y dióxido de carbono de la sangre hacia el aire espirado. Incluye las vías aéreas superiores e inferiores y los pulmones.',
      slug: 'respiratorio',
      sortOrder: 5,
      color: '#3498DB',
      icon: 'wind',
      isActive: true,
    },
    {
      name: 'Digestive System',
      nameEs: 'Sistema Digestivo',
      nameLa: 'Systema digestorium',
      description: 'El sistema digestivo transforma los alimentos en nutrientes absorbibles y elimina los residuos no aprovechables. Comprende el tubo digestivo (boca, esófago, estómago, intestinos) y los órganos accesorios (hígado, páncreas, vesícula biliar).',
      slug: 'digestivo',
      sortOrder: 6,
      color: '#E67E22',
      icon: 'apple',
      isActive: true,
    },
    {
      name: 'Urinary System',
      nameEs: 'Sistema Urinario',
      nameLa: 'Systema urinarium',
      description: 'El sistema urinario filtra la sangre para eliminar desechos metabólicos, regula el equilibrio hídrico, electrolítico y ácido-base del organismo. Está compuesto por los riñones, uréteres, vejiga urinaria y uretra.',
      slug: 'urinario',
      sortOrder: 7,
      color: '#9B59B6',
      icon: 'droplets',
      isActive: true,
    },
    {
      name: 'Endocrine System',
      nameEs: 'Sistema Endocrino',
      nameLa: 'Systema endocrinum',
      description: 'El sistema endocrino regula funciones corporales mediante hormonas secretadas por glándulas como la hipófisis, tiroides, suprarrenales, páncreas y gónadas. Controla el metabolismo, crecimiento, reproducción y respuesta al estrés.',
      slug: 'endocrino',
      sortOrder: 8,
      color: '#1ABC9C',
      icon: 'activity',
      isActive: true,
    },
    {
      name: 'Lymphatic System',
      nameEs: 'Sistema Linfático',
      nameLa: 'Systema lymphoideum',
      description: 'El sistema linfático drena el exceso de líquido intersticial, transporta lípidos absorbidos en el intestino y participa en la defensa inmunológica. Incluye vasos linfáticos, ganglios linfáticos, bazo, timo y amígdalas.',
      slug: 'linfatico',
      sortOrder: 9,
      color: '#2ECC71',
      icon: 'shield',
      isActive: true,
    },
    {
      name: 'Immune System',
      nameEs: 'Sistema Inmunológico',
      nameLa: 'Systema immunologicum',
      description: 'El sistema inmunológico defiende al organismo contra agentes patógenos (bacterias, virus, parásitos) y células anómalas. Comprende la inmunidad innata y la adaptativa, mediada por células y moléculas especializadas.',
      slug: 'inmunologico',
      sortOrder: 10,
      color: '#27AE60',
      icon: 'shield-check',
      isActive: true,
    },
    {
      name: 'Integumentary System',
      nameEs: 'Sistema Tegumentario',
      nameLa: 'Systema integumentale',
      description: 'El sistema tegumentario constituye la barrera protectora externa del cuerpo. Incluye la piel (el órgano más extenso), el cabello, las uñas, y las glándulas cutáneas. Protege contra lesiones, patógenos y radiación ultravioleta, y participa en la termorregulación.',
      slug: 'tegumentario',
      sortOrder: 11,
      color: '#D4A574',
      icon: 'hand',
      isActive: true,
    },
    {
      name: 'Reproductive System',
      nameEs: 'Sistema Reproductor',
      nameLa: 'Systema genitale',
      description: 'El sistema reproductor produce gametos (óvulos y espermatozoides), facilita la fecundación y, en el caso femenino, sustenta el desarrollo embrionario y fetal. Incluye gónadas, conductos reproductivos y glándulas accesorias.',
      slug: 'reproductor',
      sortOrder: 12,
      color: '#E91E90',
      icon: 'baby',
      isActive: true,
    },
  ];

  for (const system of systems) {
    await prisma.anatomicalSystem.upsert({
      where: { slug: system.slug },
      update: {},
      create: system,
    });
  }
  console.log(`   ✅ ${systems.length} sistemas anatómicos creados\n`);

  // ═══════════════════════════════════════════
  // CAPAS ANATÓMICAS
  // ═══════════════════════════════════════════
  console.log('📐 Creando capas anatómicas...');
  const layersData = [
    { name: 'Skin', nameEs: 'Piel', depth: 0, color: '#D4A574', opacity: 0.9 },
    { name: 'Subcutaneous Tissue', nameEs: 'Tejido Subcutáneo', depth: 1, color: '#F0C987', opacity: 0.7 },
    { name: 'Fascia', nameEs: 'Fascia', depth: 2, color: '#CCCCCC', opacity: 0.6 },
    { name: 'Muscles', nameEs: 'Músculos', depth: 3, color: '#E74C3C', opacity: 0.8 },
    { name: 'Blood Vessels', nameEs: 'Vasos Sanguíneos', depth: 4, color: '#C0392B', opacity: 0.7 },
    { name: 'Nerves', nameEs: 'Nervios', depth: 5, color: '#F1C40F', opacity: 0.7 },
    { name: 'Bones', nameEs: 'Huesos', depth: 6, color: '#E8D44D', opacity: 1.0 },
    { name: 'Organs', nameEs: 'Órganos', depth: 7, color: '#E67E22', opacity: 0.8 },
    { name: 'Deep Structures', nameEs: 'Estructuras Profundas', depth: 8, color: '#9B59B6', opacity: 0.6 },
  ];

  for (const layer of layersData) {
    await prisma.layer.create({ data: layer });
  }
  console.log(`   ✅ ${layersData.length} capas anatómicas creadas\n`);

  // ═══════════════════════════════════════════
  // REFERENCIAS BIBLIOGRÁFICAS BASE
  // ═══════════════════════════════════════════
  console.log('📚 Creando referencias bibliográficas base...');
  const references = [
    {
      title: "Gray's Anatomy: The Anatomical Basis of Clinical Practice",
      authors: 'Standring S.',
      source: 'Elsevier',
      year: 2021,
      edition: '42nd Edition',
      isbn: '978-0702077050',
      type: 'book',
    },
    {
      title: 'Anatomía Humana',
      authors: 'Latarjet M., Ruiz Liard A.',
      source: 'Editorial Médica Panamericana',
      year: 2019,
      edition: '5ta Edición',
      isbn: '978-9500695411',
      type: 'book',
    },
    {
      title: 'Atlas de Anatomía Humana',
      authors: 'Netter F.H.',
      source: 'Elsevier',
      year: 2019,
      edition: '7th Edition',
      isbn: '978-0323393225',
      type: 'atlas',
    },
    {
      title: 'Prometheus: Texto y Atlas de Anatomía',
      authors: 'Schünke M., Schulte E., Schumacher U.',
      source: 'Editorial Médica Panamericana',
      year: 2015,
      edition: '3ra Edición',
      isbn: '978-8498357950',
      type: 'atlas',
    },
    {
      title: 'Terminologia Anatomica',
      authors: 'Federative International Programme for Anatomical Terminology (FIPAT)',
      source: 'Thieme',
      year: 2019,
      edition: '2nd Edition',
      isbn: '978-3132420687',
      url: 'https://fipat.library.dal.ca/',
      type: 'book',
    },
  ];

  for (const ref of references) {
    await prisma.bibliographicReference.create({ data: ref });
  }
  console.log(`   ✅ ${references.length} referencias bibliográficas creadas\n`);

  // ═══════════════════════════════════════════
  // RESUMEN FINAL
  // ═══════════════════════════════════════════
  const systemCount = await prisma.anatomicalSystem.count();
  const roleCount = await prisma.role.count();
  const layerCount = await prisma.layer.count();
  const refCount = await prisma.bibliographicReference.count();

  console.log('═══════════════════════════════════════════');
  console.log('🧬 ANATHEA — Seed completado exitosamente');
  console.log('═══════════════════════════════════════════');
  console.log(`   Sistemas anatómicos: ${systemCount}`);
  console.log(`   Roles:               ${roleCount}`);
  console.log(`   Capas:               ${layerCount}`);
  console.log(`   Referencias:         ${refCount}`);
  console.log('═══════════════════════════════════════════\n');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

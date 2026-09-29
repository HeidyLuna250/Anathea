-- CreateTable
CREATE TABLE "anatomical_systems" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_es" TEXT NOT NULL,
    "name_la" TEXT,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "color" TEXT,
    "icon" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "anatomical_systems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_es" TEXT NOT NULL,
    "name_la" TEXT,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "parent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_es" TEXT NOT NULL,
    "name_la" TEXT,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "system_id" TEXT NOT NULL,
    "region_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "structures" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_es" TEXT NOT NULL,
    "name_la" TEXT,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "tissue_type" TEXT,
    "organ_id" TEXT,
    "region_id" TEXT,
    "parent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "structures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anatomical_relations" (
    "id" TEXT NOT NULL,
    "relation_type" TEXT NOT NULL,
    "description" TEXT,
    "from_structure_id" TEXT NOT NULL,
    "to_structure_id" TEXT NOT NULL,

    CONSTRAINT "anatomical_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "layers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_es" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "color" TEXT,
    "opacity" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "system_id" TEXT,

    CONSTRAINT "layers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "layer_structures" (
    "id" TEXT NOT NULL,
    "layer_id" TEXT NOT NULL,
    "structure_id" TEXT NOT NULL,

    CONSTRAINT "layer_structures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinical_conditions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_es" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "severity" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clinical_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organ_conditions" (
    "organ_id" TEXT NOT NULL,
    "condition_id" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "organ_conditions_pkey" PRIMARY KEY ("organ_id","condition_id")
);

-- CreateTable
CREATE TABLE "structure_conditions" (
    "structure_id" TEXT NOT NULL,
    "condition_id" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "structure_conditions_pkey" PRIMARY KEY ("structure_id","condition_id")
);

-- CreateTable
CREATE TABLE "bibliographic_references" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT,
    "source" TEXT NOT NULL,
    "year" INTEGER,
    "edition" TEXT,
    "isbn" TEXT,
    "doi" TEXT,
    "url" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "bibliographic_references_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organ_references" (
    "organ_id" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "page_range" TEXT,
    "notes" TEXT,

    CONSTRAINT "organ_references_pkey" PRIMARY KEY ("organ_id","reference_id")
);

-- CreateTable
CREATE TABLE "condition_references" (
    "condition_id" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,

    CONSTRAINT "condition_references_pkey" PRIMARY KEY ("condition_id","reference_id")
);

-- CreateTable
CREATE TABLE "models_3d" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "file_size" INTEGER,
    "author" TEXT,
    "source" TEXT,
    "license" TEXT,
    "version" TEXT,
    "metadata" JSONB,
    "organ_id" TEXT,
    "structure_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "models_3d_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anatomy_images" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "alt_text" TEXT,
    "caption" TEXT,
    "author" TEXT,
    "source" TEXT,
    "license" TEXT,
    "organ_id" TEXT,
    "structure_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anatomy_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "permissions" JSONB NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_history" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "metadata" JSONB,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anatomical_systems_name_key" ON "anatomical_systems"("name");

-- CreateIndex
CREATE UNIQUE INDEX "anatomical_systems_slug_key" ON "anatomical_systems"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "regions_slug_key" ON "regions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "organs_slug_key" ON "organs"("slug");

-- CreateIndex
CREATE INDEX "organs_system_id_idx" ON "organs"("system_id");

-- CreateIndex
CREATE INDEX "organs_region_id_idx" ON "organs"("region_id");

-- CreateIndex
CREATE UNIQUE INDEX "structures_slug_key" ON "structures"("slug");

-- CreateIndex
CREATE INDEX "structures_organ_id_idx" ON "structures"("organ_id");

-- CreateIndex
CREATE INDEX "structures_region_id_idx" ON "structures"("region_id");

-- CreateIndex
CREATE INDEX "structures_parent_id_idx" ON "structures"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "anatomical_relations_from_structure_id_to_structure_id_rela_key" ON "anatomical_relations"("from_structure_id", "to_structure_id", "relation_type");

-- CreateIndex
CREATE UNIQUE INDEX "layer_structures_layer_id_structure_id_key" ON "layer_structures"("layer_id", "structure_id");

-- CreateIndex
CREATE INDEX "models_3d_organ_id_idx" ON "models_3d"("organ_id");

-- CreateIndex
CREATE INDEX "models_3d_structure_id_idx" ON "models_3d"("structure_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_entity_type_entity_id_key" ON "favorites"("user_id", "entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "user_history_user_id_created_at_idx" ON "user_history"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "regions" ADD CONSTRAINT "regions_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "regions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organs" ADD CONSTRAINT "organs_system_id_fkey" FOREIGN KEY ("system_id") REFERENCES "anatomical_systems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organs" ADD CONSTRAINT "organs_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "structures" ADD CONSTRAINT "structures_organ_id_fkey" FOREIGN KEY ("organ_id") REFERENCES "organs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "structures" ADD CONSTRAINT "structures_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "structures" ADD CONSTRAINT "structures_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "structures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anatomical_relations" ADD CONSTRAINT "anatomical_relations_from_structure_id_fkey" FOREIGN KEY ("from_structure_id") REFERENCES "structures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anatomical_relations" ADD CONSTRAINT "anatomical_relations_to_structure_id_fkey" FOREIGN KEY ("to_structure_id") REFERENCES "structures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layers" ADD CONSTRAINT "layers_system_id_fkey" FOREIGN KEY ("system_id") REFERENCES "anatomical_systems"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layer_structures" ADD CONSTRAINT "layer_structures_layer_id_fkey" FOREIGN KEY ("layer_id") REFERENCES "layers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layer_structures" ADD CONSTRAINT "layer_structures_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organ_conditions" ADD CONSTRAINT "organ_conditions_organ_id_fkey" FOREIGN KEY ("organ_id") REFERENCES "organs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organ_conditions" ADD CONSTRAINT "organ_conditions_condition_id_fkey" FOREIGN KEY ("condition_id") REFERENCES "clinical_conditions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "structure_conditions" ADD CONSTRAINT "structure_conditions_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "structure_conditions" ADD CONSTRAINT "structure_conditions_condition_id_fkey" FOREIGN KEY ("condition_id") REFERENCES "clinical_conditions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organ_references" ADD CONSTRAINT "organ_references_organ_id_fkey" FOREIGN KEY ("organ_id") REFERENCES "organs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organ_references" ADD CONSTRAINT "organ_references_reference_id_fkey" FOREIGN KEY ("reference_id") REFERENCES "bibliographic_references"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "condition_references" ADD CONSTRAINT "condition_references_condition_id_fkey" FOREIGN KEY ("condition_id") REFERENCES "clinical_conditions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "condition_references" ADD CONSTRAINT "condition_references_reference_id_fkey" FOREIGN KEY ("reference_id") REFERENCES "bibliographic_references"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "models_3d" ADD CONSTRAINT "models_3d_organ_id_fkey" FOREIGN KEY ("organ_id") REFERENCES "organs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "models_3d" ADD CONSTRAINT "models_3d_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anatomy_images" ADD CONSTRAINT "anatomy_images_organ_id_fkey" FOREIGN KEY ("organ_id") REFERENCES "organs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anatomy_images" ADD CONSTRAINT "anatomy_images_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_history" ADD CONSTRAINT "user_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

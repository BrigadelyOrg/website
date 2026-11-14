import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_glossary_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_glossary_category" AS ENUM('payroll-tax', 'statutory-compliance', 'cross-border-fx', 'finance-accounting');
  CREATE TABLE "glossary_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "glossary" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"term" varchar NOT NULL,
  	"short_definition" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"slug" varchar NOT NULL,
  	"status" "enum_glossary_status" DEFAULT 'draft' NOT NULL,
  	"category" "enum_glossary_category" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "glossary_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"glossary_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "glossary_id" integer;
  ALTER TABLE "glossary_faqs" ADD CONSTRAINT "glossary_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."glossary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "glossary" ADD CONSTRAINT "glossary_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "glossary_rels" ADD CONSTRAINT "glossary_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."glossary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "glossary_rels" ADD CONSTRAINT "glossary_rels_glossary_fk" FOREIGN KEY ("glossary_id") REFERENCES "public"."glossary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "glossary_rels" ADD CONSTRAINT "glossary_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "glossary_faqs_order_idx" ON "glossary_faqs" USING btree ("_order");
  CREATE INDEX "glossary_faqs_parent_id_idx" ON "glossary_faqs" USING btree ("_parent_id");
  CREATE INDEX "glossary_meta_meta_image_idx" ON "glossary" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "glossary_slug_idx" ON "glossary" USING btree ("slug");
  CREATE INDEX "glossary_status_idx" ON "glossary" USING btree ("status");
  CREATE INDEX "glossary_updated_at_idx" ON "glossary" USING btree ("updated_at");
  CREATE INDEX "glossary_created_at_idx" ON "glossary" USING btree ("created_at");
  CREATE INDEX "glossary_rels_order_idx" ON "glossary_rels" USING btree ("order");
  CREATE INDEX "glossary_rels_parent_idx" ON "glossary_rels" USING btree ("parent_id");
  CREATE INDEX "glossary_rels_path_idx" ON "glossary_rels" USING btree ("path");
  CREATE INDEX "glossary_rels_glossary_id_idx" ON "glossary_rels" USING btree ("glossary_id");
  CREATE INDEX "glossary_rels_posts_id_idx" ON "glossary_rels" USING btree ("posts_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_glossary_fk" FOREIGN KEY ("glossary_id") REFERENCES "public"."glossary"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_glossary_id_idx" ON "payload_locked_documents_rels" USING btree ("glossary_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "glossary_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "glossary" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "glossary_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "glossary_faqs" CASCADE;
  DROP TABLE "glossary" CASCADE;
  DROP TABLE "glossary_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_glossary_fk";
  
  DROP INDEX "payload_locked_documents_rels_glossary_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "glossary_id";
  DROP TYPE "public"."enum_glossary_status";
  DROP TYPE "public"."enum_glossary_category";`)
}

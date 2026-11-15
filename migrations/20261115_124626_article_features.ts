import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_promos_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_promos_theme" AS ENUM('bone', 'mint', 'dark');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'writer');
  CREATE TABLE "posts_key_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "posts_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "promos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"button_label" varchar DEFAULT 'Learn more' NOT NULL,
  	"button_url" varchar DEFAULT 'https://app.brigadely.com/signup' NOT NULL,
  	"image_id" integer,
  	"status" "enum_promos_status" DEFAULT 'draft' NOT NULL,
  	"theme" "enum_promos_theme" DEFAULT 'bone' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "content_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toc_button_label" varchar DEFAULT 'Try Brigadely' NOT NULL,
  	"toc_button_url" varchar DEFAULT 'https://app.brigadely.com/signup' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users" ADD COLUMN "bio" varchar;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'writer' NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "promos_id" integer;
  ALTER TABLE "posts_key_takeaways" ADD CONSTRAINT "posts_key_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_faqs" ADD CONSTRAINT "posts_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "promos" ADD CONSTRAINT "promos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_key_takeaways_order_idx" ON "posts_key_takeaways" USING btree ("_order");
  CREATE INDEX "posts_key_takeaways_parent_id_idx" ON "posts_key_takeaways" USING btree ("_parent_id");
  CREATE INDEX "posts_faqs_order_idx" ON "posts_faqs" USING btree ("_order");
  CREATE INDEX "posts_faqs_parent_id_idx" ON "posts_faqs" USING btree ("_parent_id");
  CREATE INDEX "promos_image_idx" ON "promos" USING btree ("image_id");
  CREATE INDEX "promos_status_idx" ON "promos" USING btree ("status");
  CREATE INDEX "promos_updated_at_idx" ON "promos" USING btree ("updated_at");
  CREATE INDEX "promos_created_at_idx" ON "promos" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_promos_fk" FOREIGN KEY ("promos_id") REFERENCES "public"."promos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_promos_id_idx" ON "payload_locked_documents_rels" USING btree ("promos_id");`)

  // Added by hand: every account that exists today could manage everything
  // before roles existed, so they all start as admins. New accounts default to writer.
  await db.execute(sql`UPDATE "users" SET "role" = 'admin';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_key_takeaways" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "promos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_key_takeaways" CASCADE;
  DROP TABLE "posts_faqs" CASCADE;
  DROP TABLE "promos" CASCADE;
  DROP TABLE "content_settings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_promos_fk";
  
  DROP INDEX "payload_locked_documents_rels_promos_id_idx";
  ALTER TABLE "users" DROP COLUMN "bio";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "promos_id";
  DROP TYPE "public"."enum_promos_status";
  DROP TYPE "public"."enum_promos_theme";
  DROP TYPE "public"."enum_users_role";`)
}

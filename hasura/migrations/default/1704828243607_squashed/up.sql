
alter table "public"."app" add column "category" varchar
 null;

alter table "public"."app" add column "link" varchar
 null;

alter table "public"."app" add column "is_developer_allow_listing" bool
 not null default 'false';

alter table "public"."app" add column "is_reviewer_app_store_approve" bool
 not null default 'false';

alter table "public"."app" add column "is_reviewer_world_app_approve" bool
 not null default 'false';

alter table "public"."app" add column "world_app_description" varchar
 null;

alter table "public"."app" add column "approved_by" varchar
 null;

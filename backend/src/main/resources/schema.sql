DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "role" CASCADE;
DROP TABLE IF EXISTS "user_role" CASCADE;
DROP TABLE IF EXISTS "oauth_access_token" CASCADE;
DROP TABLE IF EXISTS "oauth_refresh_token" CASCADE;
DROP TABLE IF EXISTS "user_role_view" CASCADE;
DROP TABLE IF EXISTS "position" CASCADE;
DROP TABLE IF EXISTS "language" CASCADE;
DROP TABLE IF EXISTS "test" CASCADE;
DROP TABLE IF EXISTS "test_version" CASCADE;
DROP TABLE IF EXISTS "candidate" CASCADE;
DROP TABLE IF EXISTS "candidate_token" CASCADE;
DROP TABLE IF EXISTS "resolved_test" CASCADE;

create table "user"
(
	id bigserial primary key,
	first_name varchar(32) not null,
	last_name varchar(32) not null,
	email varchar(64) not null CONSTRAINT user_email_unique UNIQUE,
	password varchar(64) not null,
	is_deleted boolean not null default false,
	version bigint not null default 0
);

create index "user_email"
on "user"(email);

create table "role"
(
	id bigserial primary key,
	name varchar(32) not null CONSTRAINT role_name_unique UNIQUE,
	version bigint not null default 0
);

create index "role_name"
on "role"(name);

create table "user_role"
(
	id bigserial primary key,
	user_id bigint not null references "user"(id),
	role_id bigint not null references "role"(id),
	version bigint not null default 0,
	CONSTRAINT user_and_role_unique UNIQUE(user_id, role_id)
);

create table "oauth_access_token"
(
	authentication_id varchar(255) primary key,
	token bytea,
	token_id varchar(255),
	user_name varchar(255),
	client_id varchar(255),
	authentication bytea,
	refresh_token varchar(255)
);

create table "oauth_refresh_token"
(
	token bytea,
	token_id varchar(255),
	authentication bytea
);

create view "user_role_view" as
select u.email, r.name AS role, u.is_deleted, u.password
from "user" as u right join user_role as ur
on u.id = ur.user_id
left join role as r
on ur.role_id = r.id;

create table "position"
(
	id bigserial primary key,
	name varchar(32) not null CONSTRAINT position_name_unique UNIQUE,
	is_active boolean not null default true,
	version bigint not null default 0
);

create index "position_name"
on position(name);

create table "language"
(
	id bigserial primary key,
	name varchar(32) not null CONSTRAINT language_name_unique UNIQUE,
	version bigint not null default 0
);

create index "language_name"
on language(name);

create table "test"
(
	id bigserial primary key,
	owner_id bigint not null references "user"(id),
	position_id bigint references "position"(id),
	is_active boolean not null default true,
	is_deleted boolean not null default false,
	version bigint not null default 0
);

create table "test_version"
(
	id bigserial primary key,
	test_id bigint not null references test(id),
	language_id bigint not null references "language"(id),
	test json not null,
	is_active boolean not null default true,
	is_deleted boolean not null default false,
	version bigint not null default 0
);

create table "candidate"
(
	id bigserial primary key,
	first_name varchar(32) not null,
	last_name varchar(32) not null,
	email varchar(64) not null,
	language_id bigint not null references "language"(id),
	position_id bigint not null references "position"(id),
	version bigint not null default 0
);

create index "candidate_email"
on candidate(email);

create table "candidate_token"
(
	id bigserial primary key,
	candidate_id bigint not null references candidate(id),
	token varchar(128) not null,
	is_active boolean not null default true,
	expire_date timestamp not null default now(),
	version bigint not null default 0
);

create table "resolved_test"
(
	id bigserial primary key,
	owner_id bigint not null references "user"(id),
	candidate_id bigint not null references candidate(id),
	position_id bigint not null references "position"(id),
	language_id bigint not null references "language"(id),
	test json not null,
	answer json not null,
	mark json,
	points_sum bigint,
	points_max bigint not null,
	version bigint not null default 0
);
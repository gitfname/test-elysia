CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(255),
	"firstName" varchar(255),
	"lastName" varchar(255),
	"phone" varchar(100),
	"isPhoneVerified" boolean DEFAULT false,
	"createdAt" varchar(255),
	"updatedAt" varchar(255)
);

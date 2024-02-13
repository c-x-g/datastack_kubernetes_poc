CREATE table if not EXISTS public.container_metadata (
	id serial4 NOT NULL,
	pod_id varchar NULL,
	node varchar NULL,
	"namespace" varchar NULL,
	ip_address varchar NULL,
	service_account varchar NULL,
	"timestamp" timestamp NULL,
	CONSTRAINT "PK_5e45ac48a957e132b388edc17a9" PRIMARY KEY (id)
);

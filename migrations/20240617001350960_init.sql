--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- migrate:up
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: itdo
--

CREATE TABLE public.jobs (
    id integer NOT NULL,
    title text,
    description text,
    summary text,
    photo text,
    salary text
);


ALTER TABLE public.jobs OWNER TO itdo;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: itdo
--

CREATE TABLE public.projects (-- migrate:up
    id integer NOT NULL,
    title text,
    description text,
    summary text,
    photo text[],
    color text
);


ALTER TABLE public.projects OWNER TO itdo;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: itdo
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_id_seq OWNER TO itdo;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: itdo
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: table_name_id_seq; Type: SEQUENCE; Schema: public; Owner: itdo
--

CREATE SEQUENCE public.table_name_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.table_name_id_seq OWNER TO itdo;

--
-- Name: table_name_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: itdo
--

ALTER SEQUENCE public.table_name_id_seq OWNED BY public.jobs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: itdo
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    role integer NOT NULL
);


ALTER TABLE public.users OWNER TO itdo;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: itdo
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO itdo;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: itdo
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: itdo
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.table_name_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: itdo
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: itdo
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: itdo

INSERT INTO public.jobs (id, title, description, summary, photo, salary) VALUES
(1, 'wordpress developer', 'Разработчик wordpress', 'Разработчик wordpress', '/fef.jpg', '60000');

-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: itdo

INSERT INTO public.projects (id, title, description, summary, photo, color) VALUES
(1, 'Просто пироги', 'Проект калосальных размеров', 'Проект что-то там', NULL, NULL);

-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: itdo

INSERT INTO public.users (id, login, password, role) VALUES
(1, 'test', 'test', 1),
(2, 'leo', '$2b$12$rbOMYSBHNOkrI15.2SnWn.2ZFj3rFba0Y8.wKhv5QM6l08hbTQTxO', 1),
(3, 'Dinara', '$2b$12$hQEmdvCXziRlcCxgPrlwPO9Zs5fxb/tJ/UlXD2ZtZkqJxPbqhH86G', 1),
(5, 'Ruslan', '$2b$12$NjaelLwcLRVr5oV6VN23ieOF72tDeVrAy7HL9s9cIzDInNQflAd7u', 1);


SELECT pg_catalog.setval('public.projects_id_seq', 1, true);


--
-- Name: table_name_id_seq; Type: SEQUENCE SET; Schema: public; Owner: itdo
--

SELECT pg_catalog.setval('public.table_name_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: itdo
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: projects projects_pk; Type: CONSTRAINT; Schema: public; Owner: itdo
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pk PRIMARY KEY (id);


--
-- Name: jobs table_name_pk; Type: CONSTRAINT; Schema: public; Owner: itdo
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT table_name_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: itdo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: users users_pk_2; Type: CONSTRAINT; Schema: public; Owner: itdo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk_2 UNIQUE (login);


--
-- Name: users_login_index; Type: INDEX; Schema: public; Owner: itdo
--

CREATE INDEX users_login_index ON public.users USING btree (login);


--
-- PostgreSQL database dump complete
--

-- migrate:down
DROP TABLE IF EXISTS public.jobs CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP SEQUENCE IF EXISTS public.projects_id_seq CASCADE;
DROP SEQUENCE IF EXISTS public.table_name_id_seq CASCADE;
DROP SEQUENCE IF EXISTS public.users_id_seq CASCADE;

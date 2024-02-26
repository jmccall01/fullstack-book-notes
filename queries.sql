--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-02-24 21:17:11

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
-- TOC entry 216 (class 1259 OID 16439)
-- Name: bookinfo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookinfo (
    id integer NOT NULL,
    rating double precision,
    author text,
    title text,
    olid text,
    content text,
    dateread date
);


ALTER TABLE public.bookinfo OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16438)
-- Name: bookinfo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookinfo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookinfo_id_seq OWNER TO postgres;

--
-- TOC entry 4839 (class 0 OID 0)
-- Dependencies: 215
-- Name: bookinfo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookinfo_id_seq OWNED BY public.bookinfo.id;


--
-- TOC entry 4688 (class 2604 OID 16442)
-- Name: bookinfo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookinfo ALTER COLUMN id SET DEFAULT nextval('public.bookinfo_id_seq'::regclass);


--
-- TOC entry 4690 (class 2606 OID 16446)
-- Name: bookinfo bookinfo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookinfo
    ADD CONSTRAINT bookinfo_pkey PRIMARY KEY (id);


-- Completed on 2024-02-24 21:17:11

--
-- PostgreSQL database dump complete
--


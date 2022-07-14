CREATE TABLE public.users (
    username VARCHAR unique NOT NULL primary key,
    password CHAR(60)
);

CREATE TABLE public.posts (
    id SERIAL primary key,
    name VARCHAR NOT NULL,
    publisher VARCHAR,
    content VARCHAR,
    photo VARCHAR
);



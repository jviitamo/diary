CREATE TABLE public.users (
    username VARCHAR unique NOT NULL primary key,
    password CHAR(60),
    location VARCHAR DEFAULT NULL
);

CREATE TABLE public.locations (
    locationName VARCHAR unique primary key,
    address VARCHAR NOT NULL,
    locationAdmin VARCHAR NOT NULL REFERENCES users(username)
);

CREATE TABLE public.posts (
    id SERIAL primary key,
    name VARCHAR NOT NULL,
    publisher VARCHAR,
    content VARCHAR,
    photo VARCHAR,
    creator VARCHAR REFERENCES users(username),
    location VARCHAR REFERENCES locations(locationName)
);



CREATE TABLE users (
    id       SERIAL       PRIMARY KEY,
    username VARCHAR (128),
    password VARCHAR (128),
    role    VARCHAR (64)
);

CREATE TABLE tests (
    id              SERIAL      PRIMARY KEY,
    question        VARCHAR(256)
);

CREATE TABLE variants (
    id              SERIAL      PRIMARY KEY,
    test_id         SERIAL,
    content         VARCHAR(256),
    is_right        BOOLEAN
);

CREATE TABLE tokens (
    id              SERIAL      PRIMARY KEY,
    user_id         SERIAL,
    app             VARCHAR(256),
    token           VARCHAR(512)
);

-- create results table from results class
CREATE TABLE results (
    id              SERIAL      PRIMARY KEY,
    user_id         SERIAL,
    username        VARCHAR(128),
    count           INTEGER,
    of              INTEGER,
    date            TIMESTAMP
);
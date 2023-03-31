CREATE TABLE public."videogame1"
(
    game_id serial NOT NULL,
    game_name character varying NOT NULL,
    game_genre character varying NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."videogame1"
    OWNER to postgres;
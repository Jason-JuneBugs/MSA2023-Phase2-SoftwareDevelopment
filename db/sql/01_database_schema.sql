-- BEGIN TRANSACTION;
 ------------ Create Tables -------------

CREATE TABLE planets(id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                      keplerName varchar(255) NOT NULL);


CREATE TABLE launches(id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                       flightNumber INTEGER NOT NULL,
                                                                            launchDate DATE NOT NULL,
                                                                                            mission VARCHAR NOT NULL,
                                                                                                            rocket VARCHAR NOT NULL,
                                                                                                                           target VARCHAR,customers VARCHAR ARRAY,upcoming BOOLEAN NOT NULL,
                                                                                                                                                                                   success BOOLEAN NOT NULL) -- COMMIT
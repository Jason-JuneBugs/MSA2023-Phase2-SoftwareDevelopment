BEGIN TRANSACTION;

---------- Create Tables -------------

CREATE TABLE planets(id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                      keplerName VARCHAR(255) NOT NULL,
                                                                              planet_id INTEGER NOT NULL);


CREATE TABLE launches (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                        flightNumber INTEGER , launchDate TIMESTAMP WITH TIME ZONE NOT NULL,
                                                                                                                   mission VARCHAR NOT NULL,
                                                                                                                                   rocket VARCHAR NOT NULL,
                                                                                                                                                  target_id INTEGER, customers VARCHAR[], upcoming BOOLEAN , success BOOLEAN DEFAULT NULL);


COMMIT
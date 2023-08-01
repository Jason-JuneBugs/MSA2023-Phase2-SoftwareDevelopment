-- BEGIN TRANSACTION;
 ------------ Create Tables -------------

CREATE TABLE planets(id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                      keplerName VARCHAR(255) NOT NULL);

-- CREATE TABLE launches(id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--                                                        flightNumber INTEGER NOT NULL,
--                                                                             launchDate DATE NOT NULL,
--                                                                                             mission VARCHAR NOT NULL,
--                                                                                                             rocket VARCHAR NOT NULL,
--                                                                                                                            target VARCHAR,customers VARCHAR ARRAY,upcoming BOOLEAN NOT NULL,
--                                                                                                                                                                                    success BOOLEAN NOT NULL)

CREATE TABLE launches (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                        flightNumber INTEGER NOT NULL,
                                                                             launchDate TIMESTAMP WITH TIME ZONE NOT NULL,
                                                                                                                 mission VARCHAR NOT NULL,
                                                                                                                                 rocket VARCHAR NOT NULL,
                                                                                                                                                target VARCHAR, customers VARCHAR[], upcoming BOOLEAN , success BOOLEAN);

-- COMMIT
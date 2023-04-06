DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS equipment_type;
CREATE TABLE equipment_type (
    type_id serial PRIMARY KEY
);
CREATE TABLE equipment (
    equipment_id serial PRIMARY KEY,
    type int NOT NULL,
    admin_number varchar(255),
    equipment_status varchar(10),
    FOREIGN KEY (type) REFERENCES equipment_type(type_id)
);
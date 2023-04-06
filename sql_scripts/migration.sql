DROP TABLE IF EXISTS equipment;
CREATE TABLE equipment (
    equipment_id serial PRIMARY KEY,
    type varchar(3) NOT NULL,
    admin_number varchar(255) NOT NULL,
    equipment_status varchar(10) NOT NULL
);
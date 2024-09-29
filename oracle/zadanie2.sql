CREATE TABLE LW1_client
(
    id    NUMBER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name  VARCHAR2(255)  NOT NULL,
    phone VARCHAR2(255) NOT NULL,
    email VARCHAR2(255) NOT NULL,
    CONSTRAINT pk_lw1_client PRIMARY KEY (id)
);

CREATE TABLE LW1_team
(
    id      NUMBER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name    VARCHAR2(255) NOT NULL,
    members NUMBER NOT NULL,
    CONSTRAINT pk_lw1_team PRIMARY KEY (id)
);

CREATE TABLE LW1_supplier
(
    id   NUMBER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name VARCHAR2(255) NOT NULL,
    CONSTRAINT pk_lw1_supplier PRIMARY KEY (id)
);

CREATE TABLE LW1_material
(
    id NUMBER    GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name         VARCHAR2(255) NOT NULL,
    quantity     NUMBER NOT NULL,
    unit         VARCHAR2(255) NOT NULL,
    supplier_id  NUMBER NOT NULL,

    CONSTRAINT pk_lw1_material PRIMARY KEY (id),
    CONSTRAINT fk_lw1_material_on_supplier FOREIGN KEY (supplier_id) REFERENCES LW1_supplier (id)
);

CREATE TABLE LW1_tech
(
    id NUMBER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name VARCHAR2(255) NOT NULL,
    supplier_id NUMBER NOT NULL,

    CONSTRAINT pk_lw1_tech PRIMARY KEY (id),
    CONSTRAINT fk_lw1_tech_on_supplier FOREIGN KEY (supplier_id) REFERENCES LW1_supplier (id)
);

CREATE TABLE LW1_project
(
    id NUMBER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    client_id NUMBER NOT NULL,
    team_id NUMBER NOT NULL,
    type VARCHAR2(255) NOT NULL,
    price NUMBER NOT NULL,
    start_date DATE NOT NULL,
    "DATE" DATE NOT NULL,

    CONSTRAINT pk_lw1_project PRIMARY KEY (id),
    CONSTRAINT fk_lw1_project_on_client FOREIGN KEY (client_id) REFERENCES LW1_client (id),
    CONSTRAINT fk_lw1_project_on_team FOREIGN KEY (team_id) REFERENCES LW1_team (id)
);

CREATE TABLE LW1_material_for_project
(
    material_id NUMBER NOT NULL,
    project_id NUMBER NOT NULL,
    quantity NUMBER NOT NULL,

    CONSTRAINT pk_lw1_mfp PRIMARY KEY (material_id, project_id),
    CONSTRAINT fk_lw1_mfp_on_material FOREIGN KEY (material_id) REFERENCES LW1_material (id),
    CONSTRAINT fk_lw1_mfp_on_project FOREIGN KEY (project_id) REFERENCES LW1_project (id)
);

CREATE TABLE LW1_tech_for_project
(
    tech_id NUMBER NOT NULL,
    project_id NUMBER NOT NULL,
    quantity NUMBER NOT NULL,

    CONSTRAINT pk_lw1_tfp PRIMARY KEY (tech_id, project_id),
    CONSTRAINT fk_lw1_tfp_on_tech FOREIGN KEY (tech_id) REFERENCES LW1_tech (id),
    CONSTRAINT fk_lw1_tfp_on_project FOREIGN KEY (project_id) REFERENCES LW1_project (id)
);

begin
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'AquaTech Supplies Ltd.');
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'Cascade Pools and Spas JLLC');
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'Crystal Clear Waters Limited');
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'Sunrise Aquatics GmbH');
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'Elite Pool Solutions Inc.');
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'Aquatic Innovations LLC');
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'Paradise Pool Products Pty. Ltd.');
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'Aquascape Technologies Ltd.');
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'Bluewater Pool Supplies GmbH');
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'AquaLux Materials Limited');
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'Oceanic Pool Systems Inc.');
    INSERT INTO LW1_supplier(id, name) VALUES (DEFAULT, 'Aquatic Edge Technologies Ltd.');
end;

begin
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Pool Pumps', 1);
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Pool Filters', 2);
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Pool Heaters', 3);
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Pool Cleaners', 4);
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Pool Lighting', 5);
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Pool Covers', 6);
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Pool Automation Systems', 7);
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Water Treatment Systems', 8);
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Pool Safety Equipment', 9);
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Pool Maintenance Tools', 10);
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Pool Chemicals', 11);
    INSERT INTO LW1_tech (name, supplier_id) VALUES ('Pool Test Kits', 12);
end;

begin
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('Concrete', 100, 'cubic yards', 1);
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('Steel Reinforcement Bars', 500, 'pieces', 2);
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('Tile', 2000, 'square feet', 3);
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('Gravel', 500, 'tons', 4);
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('PVC Pipes', 1000, 'feet', 5);
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('Fiberglass', 50, 'rolls', 6);
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('Cement', 100, 'bags', 7);
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('Sand', 200, 'tons', 8);
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('Adhesive', 20, 'gallons', 9);
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('Waterproofing Membrane', 100, 'rolls', 10);
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('Chemical Resistant Paint', 10, 'gallons', 11);
    INSERT INTO LW1_material (name, quantity, unit, supplier_id) VALUES ('Sealant', 50, 'tubes', 12);
end;

begin
    INSERT INTO LW1_client (name, phone, email) VALUES ('John Doe', '123-456-7890', 'johndoe@example.com');
    INSERT INTO LW1_client (name, phone, email) VALUES ('Jane Smith', '987-654-3210', 'janesmith@example.com');
    INSERT INTO LW1_client (name, phone, email) VALUES ('ABC Company', '555-123-4567', 'info@abccompany.com');
    INSERT INTO LW1_client (name, phone, email) VALUES ('XYZ Corporation', '111-222-3333', 'contact@xyzcorp.com');
    INSERT INTO LW1_client (name, phone, email) VALUES ('Robert Johnson', '444-555-6666', 'robertjohnson@example.com');
    INSERT INTO LW1_client (name, phone, email) VALUES ('Sarah Williams', '777-888-9999', 'sarahwilliams@example.com');
    INSERT INTO LW1_client (name, phone, email) VALUES ('123 Pool Builders', '222-333-4444', 'info@123poolbuilders.com');
    INSERT INTO LW1_client (name, phone, email) VALUES ('ABC Pool Services', '999-888-7777', 'contact@abcpoolservices.com');
    INSERT INTO LW1_client (name, phone, email) VALUES ('Mark Davis', '777-111-2222', 'markdavis@example.com');
    INSERT INTO LW1_client (name, phone, email) VALUES ('Emily Thompson', '888-444-5555', 'emilythompson@example.com');
    INSERT INTO LW1_client (name, phone, email) VALUES ('Smith & Sons Construction', '555-777-9999', 'info@smithandsons.com');
    INSERT INTO LW1_client (name, phone, email) VALUES ('Johnson Enterprises', '111-999-3333', 'contact@johnsonenterprises.com');
end;

begin
    INSERT INTO LW1_team (name, members) VALUES ('Team Alpha', 5);
    INSERT INTO LW1_team (name, members) VALUES ('Team Bravo', 3);
    INSERT INTO LW1_team (name, members) VALUES ('Team Charlie', 4);
    INSERT INTO LW1_team (name, members) VALUES ('Team Delta', 6);
    INSERT INTO LW1_team (name, members) VALUES ('Team Echo', 4);
    INSERT INTO LW1_team (name, members) VALUES ('Team Foxtrot', 5);
    INSERT INTO LW1_team (name, members) VALUES ('Team Golf', 4);
    INSERT INTO LW1_team (name, members) VALUES ('Team Hotel', 2);
    INSERT INTO LW1_team (name, members) VALUES ('Team India', 3);
    INSERT INTO LW1_team (name, members) VALUES ('Team Juliet', 5);
    INSERT INTO LW1_team (name, members) VALUES ('Team Kilo', 3);
    INSERT INTO LW1_team (name, members) VALUES ('Team Lima', 4);
end;

begin
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (1, 1, 'Concrete', 5000, TO_DATE('2023-12-05', 'YYYY-MM-DD'), TO_DATE('2024-01-05', 'YYYY-MM-DD'));
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (2, 1, 'Composite', 3000, TO_DATE('2024-01-24', 'YYYY-MM-DD'), TO_DATE('2024-02-10', 'YYYY-MM-DD'));
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (3, 2, 'Propylene', 1000, TO_DATE('2024-02-22', 'YYYY-MM-DD'), TO_DATE('2024-03-15', 'YYYY-MM-DD'));
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (4, 3, 'Concrete', 7000, TO_DATE('2024-03-20', 'YYYY-MM-DD'), TO_DATE('2024-04-20', 'YYYY-MM-DD'));
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (5, 3, 'Composite', 4000, TO_DATE('2024-04-11', 'YYYY-MM-DD'), TO_DATE('2024-05-25', 'YYYY-MM-DD'));
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (6, 4, 'Propylene', 1500, TO_DATE('2024-05-07', 'YYYY-MM-DD'), TO_DATE('2024-06-30', 'YYYY-MM-DD'));
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (7, 4, 'Concrete', 5500, TO_DATE('2024-06-05', 'YYYY-MM-DD'), TO_DATE('2024-07-05', 'YYYY-MM-DD'));
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (8, 5, 'Composite', 3200, TO_DATE('2024-07-24', 'YYYY-MM-DD'), TO_DATE('2024-08-10', 'YYYY-MM-DD'));
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (9, 5, 'Propylene', 1200, TO_DATE('2024-08-22', 'YYYY-MM-DD'), TO_DATE('2024-09-15', 'YYYY-MM-DD'));
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (10, 6, 'Concrete', 6000, TO_DATE('2024-09-20', 'YYYY-MM-DD'), TO_DATE('2024-10-20', 'YYYY-MM-DD'));
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (11, 6, 'Composite', 3500, TO_DATE('2024-10-11', 'YYYY-MM-DD'), TO_DATE('2024-11-25', 'YYYY-MM-DD'));
    INSERT INTO LW1_project (client_id, team_id, type, price, start_date, "DATE") VALUES (12, 7, 'Propylene', 1300, TO_DATE('2024-04-01', 'YYYY-MM-DD'), TO_DATE('2024-05-30', 'YYYY-MM-DD'));
end;

begin
    INSERT INTO LW1_material_for_project (material_id, project_id, quantity) VALUES (1, 1, 10);
    INSERT INTO LW1_material_for_project (material_id, project_id, quantity) VALUES (2, 1, 5);
    INSERT INTO LW1_material_for_project (material_id, project_id, quantity) VALUES (3, 1, 3);
    INSERT INTO LW1_material_for_project (material_id, project_id, quantity) VALUES (4, 2, 8);
    INSERT INTO LW1_material_for_project (material_id, project_id, quantity) VALUES (5, 2, 4);
    INSERT INTO LW1_material_for_project (material_id, project_id, quantity) VALUES (6, 2, 2);
    INSERT INTO LW1_material_for_project (material_id, project_id, quantity) VALUES (7, 3, 6);
    INSERT INTO LW1_material_for_project (material_id, project_id, quantity) VALUES (8, 3, 3);
    INSERT INTO LW1_material_for_project (material_id, project_id, quantity) VALUES (9, 3, 2);
    INSERT INTO LW1_material_for_project (material_id, project_id, quantity) VALUES (10, 4, 12);
end;

begin
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (1, 1, 2);
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (2, 1, 1);
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (3, 1, 1);
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (4, 2, 2);
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (5, 2, 1);
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (6, 2, 1);
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (7, 3, 2);
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (8, 3, 1);
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (9, 3, 1);
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (10, 4, 3);
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (11, 4, 2);
    INSERT INTO LW1_tech_for_project (tech_id, project_id, quantity) VALUES (12, 4, 2);
end;

ALTER TABLE LW1_project
    ADD description CLOB;

UPDATE LW1_project SET description = 'This project involves the construction of a new pool using high-quality concrete materials.' WHERE id = 1;
UPDATE LW1_project SET description = 'This project is focused on renovating an existing pool and upgrading it with composite materials.' WHERE id = 2;
UPDATE LW1_project SET description = 'This project entails regular maintenance tasks for a pool, including cleaning and water treatment.' WHERE id = 3;
UPDATE LW1_project SET description = 'A new pool construction project that utilizes durable concrete materials and advanced design techniques.' WHERE id = 4;
UPDATE LW1_project SET description = 'Renovation project aimed at transforming an outdated pool into a modern and stylish swimming area.' WHERE id = 5;
UPDATE LW1_project SET description = 'Routine pool maintenance project involving cleaning, equipment inspection, and water quality testing.' WHERE id = 6;
UPDATE LW1_project SET description = 'A new pool construction project using top-grade concrete and customized design features.' WHERE id = 7;
UPDATE LW1_project SET description = 'Pool renovation project that includes upgrading the pool''s structure and adding composite elements.' WHERE id = 8;
UPDATE LW1_project SET description = 'Regular pool maintenance tasks such as cleaning, chemical balancing, and equipment maintenance.' WHERE id = 9;
UPDATE LW1_project SET description = 'Construction of a new pool with concrete materials, designed to meet specific client requirements.' WHERE id = 10;
UPDATE LW1_project SET description = 'Renovation project to enhance the pool''s aesthetics and functionality using composite materials.' WHERE id = 11;
UPDATE LW1_project SET description = 'Ongoing pool maintenance project focused on ensuring the pool remains clean, safe, and operational.' WHERE id = 12;
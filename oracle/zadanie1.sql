CREATE TABLE branch
(
    bno    INTEGER,
    street VARCHAR2(30) NOT NULL,
    city   VARCHAR2(15) NOT NULL,
    tel_no CHAR(17),
    PRIMARY KEY (bno),
    CONSTRAINT ch_telno_branch
        CHECK (REGEXP_LIKE(tel_no, '^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$')),
    CONSTRAINT uni_telno_branch UNIQUE (tel_no)
);

CREATE TABLE staff
(
    sno      INTEGER generated by default as identity (nocache),
    fname    VARCHAR2(20) NOT NULL,
    lname    VARCHAR2(20) NOT NULL,
    address  VARCHAR2(60) NOT NULL,
    tel_no   CHAR(17)     NOT NULL,
    position VARCHAR2(40) NOT NULL,
    sex      VARCHAR2(6),
    dob      DATE,
    salary   NUMBER(8, 2),
    bno      INTEGER,
    PRIMARY KEY (sno),
    CONSTRAINT ch_telno_staff
        CHECK (REGEXP_LIKE(tel_no, '^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$')),
    CONSTRAINT uni_telno_staff
        UNIQUE (tel_no),
    CONSTRAINT ch_sex
        CHECK (sex IN ('male', 'female')),
    CONSTRAINT bno_fk_staff
        FOREIGN KEY (bno)
            REFERENCES branch
);

CREATE TABLE property_for_rent
(
    pno      INTEGER generated by default as identity,
    street   VARCHAR2(30) NOT NULL,
    city     VARCHAR2(15) NOT NULL,
    type_obj CHAR(1)      NOT NULL,
    rooms    INTEGER,
    rent     NUMBER(8, 2),
    ono      INTEGER,
    sno      INTEGER,
    bno      INTEGER,
    PRIMARY KEY (pno),
    CONSTRAINT ch_obj_type
        CHECK (type_obj IN ('h', 'f')),
    CONSTRAINT sno_fk_pfrent
        FOREIGN KEY (sno)
            REFERENCES staff,
    CONSTRAINT bno_fk_pfrent
        FOREIGN KEY (bno)
            REFERENCES branch
);

CREATE SYNONYM obj for property_for_rent;

CREATE TABLE renter
(
    rno       INTEGER,
    fname     VARCHAR2(20) NOT NULL,
    lname     VARCHAR2(20),
    address   VARCHAR2(60),
    tel_no    CHAR(17),
    pref_type CHAR(1),
    max_rent  NUMBER(8, 2),
    bno       INTEGER,
    PRIMARY KEY (rno),
    CONSTRAINT ch_pref_type
        CHECK (pref_type IN ('h', 'f')),
    CONSTRAINT ch_telno_renter
        CHECK (REGEXP_LIKE(tel_no, '^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$')),
    CONSTRAINT uni_telno_renter
        UNIQUE (tel_no),
    CONSTRAINT bno_fk_renter
        FOREIGN KEY (bno)
            REFERENCES branch
);

CREATE TABLE owner
(
    ono     INTEGER,
    fname   VARCHAR2(20),
    lname   VARCHAR2(20),
    address VARCHAR2(60),
    tel_no  CHAR(17),
    PRIMARY KEY (ono),
    CONSTRAINT ch_telno_owner
        CHECK (REGEXP_LIKE(tel_no, '^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$')),
    CONSTRAINT uni_telno_owner
        UNIQUE (tel_no)
);

ALTER TABLE property_for_rent
    ADD CONSTRAINT ono_fk1
        FOREIGN KEY (ono)
            REFERENCES owner;

CREATE TABLE viewing
(
    rno      INTEGER,
    pno      INTEGER,
    date1    DATE NOT NULL,
    comment1 CLOB,
    PRIMARY KEY (rno, pno),
    CONSTRAINT rno_fk_viewing
        FOREIGN KEY (rno)
            REFERENCES renter,
    CONSTRAINT pno_fk_viewing
        FOREIGN KEY (pno)
            REFERENCES property_for_rent
);

CREATE SEQUENCE branch_seq
    START WITH 1
    INCREMENT BY 1
    nocache;

CREATE SEQUENCE staff_seq
    START WITH 1
    INCREMENT BY 1
    nocache;

CREATE SEQUENCE property_for_rent_seq
    START WITH 1
    INCREMENT BY 1
    nocache;

CREATE SEQUENCE renter_seq
    START WITH 1
    INCREMENT BY 1
    nocache;

begin
    insert into branch values (branch_seq.nextval, 'Ленина 42', 'Минск', '+375(29)221-11-71');
    insert into branch values (branch_seq.nextval, 'Якуба Коласа 13', 'Минск', '+375(33)222-11-71');
    insert into branch values (branch_seq.nextval, 'Пролетарская 17', 'Брест', '+375(25)223-11-71');
    insert into branch values (branch_seq.nextval, 'Советская', 'Брест', '+375(29)224-11-71');
    insert into branch
    values (branch_seq.nextval, 'Комсомольская 764', 'Витебск', '+375(29)225-11-71');
    insert into branch
    values (branch_seq.nextval, 'Янки Купалы 123', 'Гомель', '+375(29)226-11-71');
    insert into branch
    values (branch_seq.nextval, 'Максима Танка 64', 'Гродно', '+375(29)227-11-71');
    insert into branch values (branch_seq.nextval, 'Ленина 88', 'Могилев', '+375(29)228-11-71');
    insert into branch values (branch_seq.nextval, 'Машерова 44', 'Могилев', '+375(33)229-11-71');
    insert into branch
    values (branch_seq.nextval, 'Октябрьская 58', 'Витебск', '+375(29)230-11-71');
end;
/

begin
    insert into staff
    values (1, 'Якубов', 'Виктор', 'Минск, Горького 19', '+375(25)225-11-71', 'director',
            'male', to_date('17.03.86', 'dd.mm.rr'), 300, 1);
    insert into staff
    values (2, 'Якубова', 'Анна', 'Брест, Горького 19', '+375(29)225-11-71', 'manager',
            'female', to_date('22.09.87', 'dd.mm.rr'), 250, 1);
    insert into staff
    values (3, 'Шевцов', 'Дмитрий', 'Гомель, Красноармейская 14', '+375(33)225-11-71', 'seller',
            'male', to_date('17.03.90', 'dd.mm.rr'), 800, 2);
    insert into staff
    values (4, 'Карпеш', 'Елизавета', 'Гродно, Притыцкого 33', '+375(29)221-11-71', 'manager',
            'female', to_date('23.04.91', 'dd.mm.rr'), 200, 3);
    insert into staff
    values (5, 'Самсонова', 'Дарья', 'Могилев, Советская 12', '+375(29)225-12-71', 'manager',
            'female', to_date('30.08.78', 'dd.mm.rr'), 280, 5);
    insert into staff
    values (6, 'Шостак', 'Руслан', 'Минск, Ленина 13', '+375(29)225-31-71', 'manager',
            'male', to_date('04.05.96', 'dd.mm.rr'), 190, 6);
    insert into staff
    values (7, 'Минич', 'Виктор', 'Гродно, Хлебобулочная 33', '+375(29)225-41-71', 'seller',
            'male', to_date('12.08.88', 'dd.mm.rr'), 700, 6);
    insert into staff
    values (8, 'Потапенко', 'Макси', 'Минск, Беспощадня 19', '+375(29)225-51-71', 'seller',
            'male', to_date('25.06.80', 'dd.mm.rr'), 900, 7);
    insert into staff
    values (9, 'Кенда', 'Яна', 'Витебск, Пролетарская 73', '+375(29)225-22-71', 'seeller',
            'male', to_date('17.03.01', 'dd.mm.yy'), 300, 8);
end;
/

insert into owner(ono, fname, lname, address, tel_no)
select sno, fname, lname, address, tel_no
from staff;

begin
    insert into obj values (1, 'Якуба Коласа 43', 'Минск', 'h', 2, 600, 1, 1, 1);
    insert into obj values (2, 'Пролетарская 13', 'Минск', 'f', 3, 500, 2, 5, 1);
    insert into obj values (3, 'Совецкая 77', 'Брест', 'f', 4, 100, 3, 3, 3);
    insert into obj values (4, 'Янки Купалы 105', 'Гомель', 'h', 4, 400, 4, 6, 6);
    insert into obj (street, city, type_obj, rooms, rent, ono, sno, bno)
    values ('Крупской,105', 'Минск', 'h', 4, 4000.58, 4, 6, 6);

end;
/

begin
    insert into renter
    values (renter_seq.nextval, 'Иванов', 'Иван', 'Минск, Минина 5', '+375(29)225-11-71', 'h', 500,
            1);
    insert into renter
    values (renter_seq.nextval, 'Петров', 'Петр', 'Брест, Малорийская 76', '+375(29)225-11-72', 'f',
            400, 1);
    insert into renter
    values (renter_seq.nextval, 'Козяк', 'Инокентий', 'Гродно, Пролетарская 666',
            '+375(29)225-11-73', 'h', 900, 3);
    insert into renter
    values (renter_seq.nextval, 'Алексеев', 'Максим', 'Могилев, Болотная 9', '+375(29)225-11-74',
            'f', 700, 3);
    insert into renter
    values (renter_seq.nextval, 'Романов', 'Роман', 'Гомель, Советская 73', '+375(29)225-11-75',
            'h', 500, 6);
end;
/

begin
    insert into viewing values (1, 2, to_date('23.11.19', 'dd.mm.yy'), 'ok');
    insert into viewing values (1, 3, to_date('17.03.21', 'dd.mm.yy'), 'good');
    insert into viewing values (2, 3, to_date('17.09.22', 'dd.mm.yy'), '');
    insert into viewing values (3, 3, to_date('10.06.22', 'dd.mm.yy'), 'bad');
    insert into viewing values (5, 4, to_date('17.03.21', 'dd.mm.yy'), '');
end;
/

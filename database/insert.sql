use coworking;

insert into Users (Name,Email,Password) values('test1','test1@gmail.com','1223456');
insert into Users (Name,Email,Password,Membership) values('Luis Abinader','abinader@gmail','elpresi','Premiun'),('Darian vargas','vargas@gmail.com','123456','Enterprise');
select *from Users

INSERT INTO Spaces (Spaces_Name, Spaces_Types, Capacity, price_per_hour, Location, Premiun) 
VALUES
    -- Escritorios individuales
    ('Desk_A1', 'Escritorio_Individual', 1, 310.00, 1, FALSE),
    ('Desk_A2', 'Escritorio_Individual', 1, 315.00, 2, FALSE),
    ('Desk_A3', 'Escritorio_Individual', 1, 320.00, 3, FALSE),
    ('Desk_B1', 'Escritorio_Individual', 1, 350.00, 1, TRUE),
    ('Desk_B2', 'Escritorio_Individual', 1, 360.00, 2, TRUE),

    -- Escritorios premium extra
    ('Desk_P1', 'Escritorio_Individual', 1, 400.00, 1, TRUE),
    ('Desk_P2', 'Escritorio_Individual', 1, 410.00, 2, TRUE),
    ('Desk_P3', 'Escritorio_Individual', 1, 420.00, 3, TRUE),

    -- Salas de reuniones pequeñas
    ('Small_Meet_01', 'Sala_de_reuniones_pequeña', 4, 640.00, 1, FALSE),
    ('Small_Meet_02', 'Sala_de_reuniones_pequeña', 5, 670.00, 2, FALSE),
    ('Small_Meet_03', 'Sala_de_reuniones_pequeña', 6, 690.00, 3, FALSE),
    ('Small_Meet_P1', 'Sala_de_reuniones_pequeña', 5, 800.00, 1, TRUE),
    ('Small_Meet_P2', 'Sala_de_reuniones_pequeña', 6, 830.00, 2, TRUE),

    -- Salas de reuniones grandes
    ('Big_Meet_01', 'Sala_de_reuniones_grande', 20, 2150.00, 1, FALSE),
    ('Big_Meet_02', 'Sala_de_reuniones_grande', 25, 2450.00, 2, FALSE),
    ('Big_Meet_03', 'Sala_de_reuniones_grande', 30, 2750.00, 3, FALSE),
    ('Big_Meet_P1', 'Sala_de_reuniones_grande', 30, 2900.00, 1, TRUE),
    ('Big_Meet_P2', 'Sala_de_reuniones_grande', 35, 3200.00, 2, TRUE),

    -- Cabinas privadas
    ('Cabina_A1', 'Cabina_Privada', 1, 410.00, 1, FALSE),
    ('Cabina_A2', 'Cabina_Privada', 1, 420.00, 2, FALSE),
    ('Cabina_A3', 'Cabina_Privada', 2, 470.00, 3, FALSE),
    ('Cabina_P1', 'Cabina_Privada', 1, 540.00, 1, TRUE),
    ('Cabina_P2', 'Cabina_Privada', 2, 590.00, 2, TRUE),
    ('Cabina_P3', 'Cabina_Privada', 2, 610.00, 3, TRUE);

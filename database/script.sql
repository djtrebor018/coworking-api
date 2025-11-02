create database coworking;
use coworking;



create table Users(
ID_User int auto_increment primary key,
Name varchar(50) not null,
Email varchar(50) not null unique,
Password varchar(100) not null,
Membership enum('Basic','Premiun','Enterprise') default 'Basic',
Rol enum('User', 'Admin') default 'User'
);
create table Location (
ID_Location int auto_increment primary key,
Location_Name varchar(50),
Location_Adress varchar(50),
Location_city varchar(20)
);

create table Spaces(
ID_Space int auto_increment primary key,
Spaces_Types enum('Escritorio_Individual','Sala_de_reuniones_pequeña','Sala_de_reuniones_grande','Cabina_Privada') not null,
Capacity  int ,
price_per_hour decimal(10,2),
Location int,
Premiun boolean,
foreign key(Location) references Location(ID_Location)
);

create table Booking (
ID_Bokking int auto_increment primary key,
User int not null,
Space int not null,
Startat datetime not null,
EndAt datetime not null,
Booking_Status enum('Pending','Completed','Confirm','cancelled') default 'Pending',
Total decimal(10,2) default 0,
Created_At datetime default current_timestamp,
foreign key (User) references Users(ID_User),
foreign key (Space) references Spaces(ID_Space)
);
create table Payments (
ID_Payments int auto_increment primary key,
Booking int not null,
User int not null,
Amount decimal(10,2) not null,
Payment_date datetime default current_timestamp,
foreign key (User) references Users(ID_User),
foreign key (Booking) references Booking(ID_Bokking)
);
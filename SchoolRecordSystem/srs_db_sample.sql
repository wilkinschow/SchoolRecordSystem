drop table if exists Registers;
drop table if exists Teachers;
drop table if exists Students;
create table Teachers(email_t varchar(50), primary key (email_t));
create table Students(email_s varchar(50), suspended boolean default false, primary key (email_s));
create table Registers(
    email_t varchar(50), 
    email_s varchar(50), 
    primary key (email_t, email_s), 
    foreign key (email_s) references Students(email_s) on delete cascade on update cascade,
    foreign key (email_t) references Teachers(email_t) on delete cascade on update cascade
);

insert into Teachers values('teacherken@gmail.com');
insert into Teachers values('teacherjoe@gmail.com');

insert into Students values('studentjon@gmail.com', false);
insert into Students values('studenthon@gmail.com', false);
insert into Students values('commonstudent1@gmail.com', false);
insert into Students values('commonstudent2@gmail.com', false);
insert into Students values('student_only_under_teacher_ken@gmail.com', false);
insert into Students values('studentmary@gmail.com', false);
insert into Students values('studentagnes@gmail.com', false);
insert into Students values('studentmiche@gmail.com', false);
insert into Students values('studentbob@gmail.com', false);

insert into Registers values('teacherken@gmail.com', 'commonstudent1@gmail.com');
insert into Registers values('teacherken@gmail.com', 'commonstudent2@gmail.com');
insert into Registers values('teacherken@gmail.com', 'student_only_under_teacher_ken@gmail.com');
insert into Registers values('teacherjoe@gmail.com', 'commonstudent1@gmail.com');
insert into Registers values('teacherjoe@gmail.com', 'commonstudent2@gmail.com');
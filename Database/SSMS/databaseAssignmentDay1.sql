-- create database
create database EmpData2;

-- select database
use EmpData2;

-- create a table
create table Employees(
EmpId int primary key,
Name varchar(20),
Branch varchar(10) default 'Ahmedabad'
);

-- alter table
alter table Employees add age int;

-- insert values
insert into Employees (EmpId,Name,age) values (101,'Vaibhav Sharma','24');
insert into Employees (EmpId,Name,age,Branch) values (102,'MS Dhoni','24','Chennai');

-- insert multiple values
insert into Employees values (103,'Virat Kohli','Bangalore',25),(104,'Rohit Sharma','Chennai',26);

-- update value
update Employees set age=27 where EmpId=102;

-- view all records
select * from Employees;

-- select query with condition
select * from Employees where EmpId=102;

-- select distinct
select distinct Branch from Employees;

-- order by
select * from Employees order by Branch desc;

-- group by
select branch,count(*) from Employees group by branch;

-- like using '%'' wildcard
select Name from Employees where name like '%Sharma';

-- like using '_' wildcard
select Name from Employees where EmpId like '_04';

-- delete query
delete from Employees where EmpId=103;
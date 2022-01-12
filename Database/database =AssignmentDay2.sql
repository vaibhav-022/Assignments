-- Creating Database
create database Transactions;

-- Selecting Database
use transactions;

-- creating Products Table
create table Products(
ProductId int Primary Key,
ProductName varchar(20),
BuyPrice float
);

-- Creating Customer Table
create table Customer(
CustomerId int Primary Key,
CustomerName varchar(20)
);

-- creating OrderDetails Table
create table OrderDetails(
OrderId int Primary Key,
ProductId int,
CustomerId int,
BillingName varchar(20),
OrderAmt float not null,
FOREIGN KEY(ProductId) REFERENCES Products(ProductId),
FOREIGN KEY(CustomerId) REFERENCES Customer(CustomerId)
);

-- Inserting Values in the tables
insert into Customer values (101,'Vaibhav Sharma');
insert into Customer values (102,'Virat Kohli');
insert into Customer values (103,'Rohit Sharma');
insert into Customer values (104,'MS Dhoni');
insert into Customer values (105,'KL Rahul');
insert into Customer values (106,'Rishabh Pant');

select * from customer;

insert into Products values (501,'Laptop',20000),(502,'Mouse',500),(503,'RAM',7000),(504,'Monitor',17000),(505,'CPU',40000),(506,'Earphone',800),(507,'HeadPhone',2500),(508,'Charger',3000);

SELECT * FROM products;

insert into OrderDetails values (8001,501,103,'Rohit',34000),(8002,505,102,'Virat',38000),(8005,507,101,'Vaibhav',3000),(8003,507,105,'Rahul',34000),(8004,502,106,'Rishabh',550);
show tables;
select * from OrderDetails;//

-- Inner Join Query
select OrderDetails.OrderId, OrderDetails.ProductId, Products.ProductName from OrderDetails Inner Join Products on OrderDetails.ProductId=Products.ProductId;

-- Left Join Query
select Customer.CustomerId, Customer.customerName, OrderDetails.OrderId, OrderDetails.OrderAmt from Customer Left Join OrderDetails on Customer.CustomerId=OrderDetails.CustomerId;

-- Right Join Query
select Products.ProductId, Products.productName, OrderDetails.OrderId, OrderDetails.OrderAmt from Products Right Join OrderDetails on Products.ProductId=OrderDetails.ProductId;

-- Full Join Query
select Products.ProductId, Products.productName, OrderDetails.OrderId, OrderDetails.OrderAmt from Products Join OrderDetails on Products.ProductId=OrderDetails.ProductId;

Delimiter //
-- Creating Stored Procedure

CREATE PROCEDURE `getOrderPrice`(in oid int)
BEGIN
Select orderamt from OrderDetails where orderId=oid;

END
//

-- Calling Stored Procedure
call getOrderPrice(8001);

-- Creating Stored Procedure
CREATE DEFINER=`root`@`localhost` PROCEDURE `getBuyingPrice`(in pid int)
BEGIN
Select ProductName,buyPrice from Products where productId=pid;
END
//

-- Calling Stored Procedure
call getBuyingPrice(505);

-- creating view
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `transactions`.`profitview` AS
    SELECT 
        `transactions`.`orderdetails`.`OrderId` AS `OrderId`,
        `transactions`.`orderdetails`.`ProductId` AS `ProductId`,
        `transactions`.`products`.`ProductName` AS `ProductName`,
        `transactions`.`orderdetails`.`OrderAmt` AS `OrderAmt`,
        `transactions`.`products`.`BuyPrice` AS `buyPrice`
    FROM
        (`transactions`.`orderdetails`
        JOIN `transactions`.`products` ON ((`transactions`.`orderdetails`.`ProductId` = `transactions`.`products`.`ProductId`)))

-- calling view
Select *, OrderAmt-buyPrice as Profit from profitview order by Profit desc;
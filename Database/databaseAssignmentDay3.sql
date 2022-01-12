-- Selecting Database
use Transactions;

-- Transaction Control
Begin Transaction T1
	Update Customer set CustomerId=111 where CustomerName='MS Dhoni';

Begin Transaction T2
	Update Customer set CustomerId=178 where CustomerName='MS Dhoni';
	Commit

Rollback Transaction T2


-- Using Functions


select max(buyPrice) as 'Costliest Product' from Products;

Select lower(productname) as 'Products Name in Lower Cases' from products;

select reverse('India') as 'India word in reverse:';

select upper('India') as 'India Word in upper case'

select CEILING(125.89) as 'Ceiling Value'

Select PI()

select Round(113.9087,2)

Select SQUARE(4);

select CURRENT_TIMESTAMP as 'Current Time'

select year(CURRENT_TIMESTAMP) as 'Current Year'

select Month(CURRENT_TIMESTAMP) as 'Current Month'

select system_User as 'Current User'
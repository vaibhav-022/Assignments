use empdata2;

select * from employees;

-- Error Handling
Begin Try
	Insert into employees values ('A115','Rishabh Pant','Delhi',27)
End Try
Begin Catch
	Select ERROR_MESSAGE() as [Error_Message],
	ERROR_LINE() as [Line_of_Error],
	ERROR_NUMBER() as [Error_Number]
End Catch

Begin Try
	declare @a int
	select @a=15/0
	Print '15/0 is:'+@a
End try
Begin Catch
	Print 'Error occured. Error Description is: ' + error_message()
End Catch
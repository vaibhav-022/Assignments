const express=require('express');
const app=express();
const apiRouter=require('./routes');

app.use(express.json());
app.use('/api/users',apiRouter);

app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));
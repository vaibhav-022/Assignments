const mysql=require('mysql2');
const mysqlConnection= mysql.createConnection({
    connectionLimit: 10,
    password: 'admin',
    database:'nodejs',
    user:'root',
    host:'localhost',
    port:'3306'
});

let usersdb={};

//Get All Users
usersdb.all=()=>{
    return new Promise((resolve,reject)=>{
        mysqlConnection.query('Select * from users',(err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results);
        });
    });
};

//Get User as per ID
usersdb.one=(id)=>{
    return new Promise((resolve,reject)=>{
        mysqlConnection.query('Select * from users where id=?',id,(err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results[0]);
        });
    });
};

// Insert A user
usersdb.ins=(usr)=>{
    return new Promise((resolve,reject)=>{
        mysqlConnection.query('INSERT into users values(?,?,?,?,?,?,?,?)',[usr.id, usr.name, usr.password, usr.gender, usr.birthdate, usr.age, usr.country, usr.phone],(err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve("Inserted Successfully");
        });
    });
};

// Delete a user
usersdb.del=(id)=>{
    return new Promise((resolve,reject)=>{
        mysqlConnection.query('DELETE FROM users WHERE id = ?',id,(err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve("User Deleted Successfully");
        });
    });
};

// Update a user
usersdb.upd=(id,usr)=>{
    return new Promise((resolve,reject)=>{
        mysqlConnection.query("update users SET name = ?, password = ?, age = ? where id=?",[usr.name, usr.password, usr.age, id],(err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve("User Updated Successfully");
        });
    });
};

module.exports=usersdb;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_biweekly',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/Auth/login', (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const sqlAuth = "SELECT * FROM tbl_user WHERE user_username =? AND user_password =MD5(?)"
    db.query(sqlAuth,[username,password], (err,result)=>{
        if(result.length > 0){
            res.send(result);
        }
        else{
            res.send(err);
        }
    })
})

// app.get('/user/data', (req,res)=>{
//     const sqlGetUser = "SELECT * FROM tbl_user";
//     db.query(sqlGetUser, (err,result)=>{
//         if(result){
//             console.log(result);
//             res.send(result);
//         }
//         else{
//             console.log(err);
//             res.send(result);
//         }
//     })
// })

// app.post('/user/add', (req,res)=>{
//     const fullname = req.body.fullname;
//     const contact = req.body.contact;
//     const email = req.body.email;
//     const username = req.body.username;
//     const password = req.body.password;
//     const position = req.body.position;
//     const sqlInsert = "INSERT INTO tbl_user (name, contact, email, username, password, position) VALUES (?,?,?,?,?,?)";
//     db.query(sqlInsert, [fullname,contact,email,username,password,position], (err,result)=>{
//         if(result){
//             console.log(result);
//             res.send(result);
//         }
//         else{
//             console.log(err);
//             res.send(result);
//         }
//     });
// });
// app.get('/user/edit/:id', (req,res)=>{
//     const id = req.params.id;
//     const sqlGetUser = "SELECT * FROM tbl_user where userID =?";
//     db.query(sqlGetUser, id,(err,result)=>{
//         if(result){
//             console.log(result);
//             res.send(result);
//         }
//         else{
//             console.log(err);
//             res.send(result);
//         }
//     })
// })
// app.put('/user/update',(req,res)=>{
//     const fullname = req.body.fullname;
//     const contact = req.body.contact;
//     const email = req.body.email;
//     const username = req.body.username;
//     const password = req.body.password;
//     const position = req.body.position;
//     const userid = req.body.userid;
//     const sqlUpdate = "UPDATE tbl_user SET name=?, contact=?, email=?, username=?, password = ?, position = ? where userID = ?";
//     db.query(sqlUpdate, [fullname,contact,email,username,password,position,userid], (err,result)=>{
//         if(result){
//             console.log(result);
//             res.send(result);
//         }
//         else{
//             console.log(err);
//             res.send(result);
//         }
//     });
// })
// app.delete('/user/delete/:id',(req,res)=>{
//     const id = req.params.id;
//     const sqlDelete = "DELETE FROM tbl_user WHERE userID = ?";
//     db.query(sqlDelete, [id], (err,result)=>{
//         if(result){
//             console.log(result);
//             res.send(result);
//         }
//         else{
//             console.log(err);
//             res.send(result);
//         }
//     });
// })
// app.post('/client/add',(req,res)=>{
//     const clientName = req.body.clientName;
//     const clientEmail = req.body.clientEmail;
//     const clientContact = req.body.clientContact;
//     const details = req.body.details;

//     sqlClientInsert = "INSERT INTO tbl_client(clientName, clientEmail, clientContact, details) VALUES (?,?,?,?)";
//     db.query(sqlClientInsert,[clientName,clientEmail,clientContact,details],(err,result)=>{
//         if(result){
//             console.log(result);
//             res.send(result);
//         }
//         else{
//             console.log(err);
//             res.send(result);
//         }
//     });

// })
// app.get('/client/data', (req,res)=>{
//     const sqlGetClient = "SELECT * FROM tbl_client";
//     db.query(sqlGetClient, (err,result)=>{
//         if(result){
//             console.log(result);
//             res.send(result);
//         }
//         else{
//             console.log(err);
//             res.send(result);
//         }
//     })
// })
// app.get('/client/edit/:id', (req,res)=>{
//     const id = req.params.id;
//     const sqlGetClient = "SELECT * FROM tbl_client where clientID =?";
//     db.query(sqlGetClient, id,(err,result)=>{
//         if(result){
//             console.log(result);
//             res.send(result);
//         }
//         else{
//             console.log(err);
//             res.send(result);
//         }
//     })
// })

// app.put('/client/update/:id', (req,res)=>{
//     const clientName = req.body.clientName;
//     const clientEmail = req.body.clientEmail;
//     const clientContact = req.body.clientContact;
//     const details = req.body.details;
//     const clientID = req.body.clientID;
//     const sqlUpdateClient = "UPDATE tbl_client set clientName = ?, clientContact = ?, clientEmail = ?, details = ? WHERE clientID = ?";
//     db.query(sqlUpdateClient,[clientName,clientContact,clientEmail,details,clientID],(err,result)=>{
//         if(result){
//             console.log(result);
//             res.send(result);
//         }
//         else{
//             console.log(err);
//             res.send(result);
//         }
//     })
// })
// app.delete('/client/delete/:id',(req,res)=>{
//     const clientID = req.params.id;
//     const sqlDelete = "DELETE FROM tbl_client WHERE clientID = ?";
//     db.query(sqlDelete, [clientID], (err,result)=>{
//         if(result){
//             console.log(result);
//             res.send(result);
//         }
//         else{
//             console.log(err);
//             res.send(result);
//         }
//     });
// })
// app.post('/virtualassistant/add',(req,res)=>{
//     const vaName = req.body.vaName;
//     const vaEmail = req.body.vaEmail;
//     const vaContact = req.body.vaContact;
//     const vaStart = req.body.vaStart;
//     const vaDetails = req.body.vaDetails;
//     console.log(vaName+vaEmail+vaContact+vaStart+vaDetails)
//     const sqlAdd = "INSERT INTO tbl_va (vaName, vaContact, vaEmail, vaStart, vaDetails) VALUES(?,?,?,?,?)";
//     db.query(sqlAdd,[vaName,vaContact,vaEmail,vaStart,vaDetails], (err,result)=>{
//         if(result){
//             console.log(result)
//             res.send(result)
//         } 
//         else{
//             console.log(err);
//             res.send(err);
//         }
//     })
// })
// app.get('/virtualassistant/data', (req,res)=>{
//     const sqlGet = "SELECT *, DATE_FORMAT(vaStart,'%W, %M %d, %Y') as vaStart FROM tbl_va";
//     db.query(sqlGet, (err,result)=>{
//         if(result){
//             console.log(result);
//             res.send(result)
//         }
//         else{
//             console.log(err);
//             res.send(err);
//         }
//     })
// })
app.listen(3001,()=>{
    console.log('You are connected to database!');
});
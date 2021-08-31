var mysql = require('mysql');
const fs = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_biweekly"
});

var count = 0;

console.log("INITIALIZING")
const matic =[
    "created_at datetime",
    "created_by int(11)",
    "updated_at datetime",
    "updated_by int(11)",
    "deleted_at datetime",
    "deleted_by int(11)",
]
const personal_data = (type) =>{
    const info = [
        `${type}_id int auto_increment primary key`,
        `${type}_firstname varchar(55)`,
        `${type}_lastname varchar(55)`,
        `${type}_mi varchar(55)`,
        `${type}_email varchar(55)`,
        `${type}_skype varchar(55)`,
    ]
    return info;
}

const creation=async (data, table_name, type)=>{
    con.connect(function(err) {
        // parameter data is the function name!
        con.query(data(personal_data, table_name, type), function (err, result) {
            if(result){
                console.log(`${table_name} table successfully created!`);
                count = count + 1;
            }
            else {
                console.log(err)
            }
        });
    });
}
const users = (personal_data, table_name, type) =>{
    const datas = personal_data(type);
    const params = [
        `${type}_firstname`,
        `${type}_lastname`,
        `${type}_mi`,
        `${type}_email`,
        `${type}_skype`,
        `${type}_started`,
        `${type}_memberof`,
        `${type}_details`,
        `${type}_username`,
        `${type}_password`
    ]
    const parameters = [
        `${type}_started date`,
        `${type}_memberof varchar(55)`,
        `${type}_details varchar(255)`,
        `${type}_username varchar(255)`,
        `${type}_password varchar(255)`,
    ]
    GenQuery(params, table_name)
    return `CREATE TABLE ${table_name} (${datas}, ${parameters}, ${matic})`;
}
const va = (personal_data, table_name, type) =>{
    const datas = personal_data(type);
    const params = [
        `${type}_firstname`,
        `${type}_lastname`,
        `${type}_mi`,
        `${type}_email`,
        `${type}_skype`,
        `${type}_started`,
        `${type}_withclient`,
        `${type}_details`,
    ]
    const parameters =[
        `${type}_started date`,
        `${type}_withclient varchar(55)`,
        `${type}_details varchar(255)`,
    ];
    GenQuery(params, table_name)
    return `CREATE TABLE ${table_name} (${datas}, ${parameters}, ${matic})`;
}
const client = (personal_data, table_name, type) =>{
    const datas = personal_data(type);
    const params = [
        `${type}_firstname`,
        `${type}_lastname`,
        `${type}_mi`,
        `${type}_email`,
        `${type}_skype`,
        `${type}_started`,
        `${type}_isactive`,
        `${type}_details`,
    ]
    const parameters =[
        `${type}_started date`,
        `${type}_isactive boolean default 0`,
        `${type}_details varchar(255)`,
    ];
    GenQuery(params, table_name)
    return `CREATE TABLE ${table_name} (${datas}, ${parameters}, ${matic})`;
}
const contract = (personal_data, table_name, type)=>{
    const datas = personal_data(type);
    const params = [
        `${type}_clientID`,
        `${type}_userID`,
        `${type}_vaID`,
        `${type}_started`,
        `${type}_isactive`,
        `${type}_details`,
    ]
    const parameters =[
        `${type}_id int auto_increment primary key`,
        `${type}_clientID int(11)`,
        `${type}_userID int(11)`,
        `${type}_vaID int(11)`,
        `${type}_started date`,
        `${type}_isactive boolean default 0`,
        `${type}_details varchar(255)`,
    ];
    GenQuery(params, table_name)
    return `CREATE TABLE ${table_name} (${parameters}, ${matic})`;
}
const weekly = (personal_data, table_name, type)=>{
    const datas = personal_data(type);
    const params = [
        `${type}_clientID`,
        `${type}_userID`,
        `${type}_vaID`,
        `${type}_datefrom`,
        `${type}_dateto`,
        `${type}_calls`,
        `${type}_texts`,
        `${type}_leads`,
        `${type}_followup`,
        `${type}_remove`,
        `${type}_attendace`,
        `${type}_totalattendace`,
        `${type}_details`,
    ]
    const parameters =[
        `${type}_id int auto_increment primary key`,
        `${type}_clientID int(11)`,
        `${type}_userID int(11)`,
        `${type}_vaID int(11)`,
        `${type}_datefrom date`,
        `${type}_dateto date`,
        `${type}_calls varchar(55)`,
        `${type}_texts varchar(55)`,
        `${type}_leads varchar(55)`,
        `${type}_followup varchar(55)`,
        `${type}_remove varchar(55)`,
        `${type}_attendace varchar(55)`,
        `${type}_totalattendace varchar(55)`,
        `${type}_details varchar(255)`,
    ];
    GenQuery(params, table_name)
    return `CREATE TABLE ${table_name} (${parameters}, ${matic})`;
}
creation(users, "tbl_user", "user");
creation(va, "tbl_va", "va");
creation(client, "tbl_client", "client");
creation(contract, "tbl_contract", "contact")
creation(weekly, "tbl_weekly", "weekly")


const GenQuery = (queries, table) =>{
    var path = `${table}_queries.txt`;
    console.log(`${queries} ${table}`)
    let selectQ, insertQ, updateQ;
    selectQ = `SELECT * FROM ${table}`
    insertQ = Insert(queries, table);
    updateQ = Update(queries, table)
    const masterQuery = `${selectQ} \n\n${insertQ} \n\n ${updateQ}`;
    let buffer = new Buffer(masterQuery);
    fs.open(path, 'w', function(err, fd) {
        if (err) {
            throw 'could not open file: ' + err;
        }
    
        // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
        fs.write(fd, buffer, 0, buffer.length, null, function(err) {
            if (err) throw 'error writing file: ' + err;
            fs.close(fd, function() {
                console.log('wrote the file successfully');
            });
        });
    });
}

const Insert = (queries, table) =>{
    let count = queries.length;
    let paramValues ="";
    for(var a = 0; a < count; a++){
        paramValues = a+1 == count ? paramValues+"?" : paramValues+"?, ";
    }
    var ParamItem = queries;
    return `INSERT INTO ${table} (${ParamItem}) VALUES (${paramValues})`
}
const Update = (queries, table)=>{
    let count = queries.length;
    let paramItem = ""
    // for(var a = 0; a < count; a++){
    //     paramItem = a+1 == count ? paramItem+` ${queries[a]} = ?` :  paramItem+` ${queries[a]} = ?, `
    // }
    queries.forEach((param, paramLen)=>{
        paramItem =paramLen+1 == count ? paramItem+`${param} = ?` : paramItem+`${param} = ?, `;
    })
    return `UPDATE ${table} SET ${paramItem} WHERE`
}
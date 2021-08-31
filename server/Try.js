const fs = require('fs');

// specify the path to the file, and create a buffer with characters we want to write
var path = 'queries.txt';

// open the file in writing mode, adding a callback function where we do the actual writing

const letmetry = () =>{
    const parameters = [
        "1",
        "2",
        "3",
        "4"
    ]
    const asa = [
        "asd",
        "asd2",
        "asd3",
        "asd4",
    ]
    const final = parameters.concat(asa)
    const table = "tbl_user"
    GenQuery(final,table)
    // parameters.map((params)=>{
    //     GenQuery(params)
    // })
}

const GenQuery = (queries,table) =>{
    let selectQ, insertQ, updateQ;
    selectQ = `SELECT * FROM ${table}`
    insertQ = Insert(queries, table);
    updateQ = Update(queries, table)
        // return `INSERT INTO ${table} (${queries}) VALUES (${paramValues})`
    let masterQuery = `--${table} QUERIES-- \n ${selectQ}\n ${insertQ}\n ${updateQ}`
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
letmetry();
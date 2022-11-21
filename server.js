// Built-in Node.js modules
let fs = require('fs');
let path = require('path');

// NPM modules
let express = require('express');
let sqlite3 = require('sqlite3');


let db_filename = path.join(__dirname, 'db', 'stpaul_crime.sqlite3');

let app = express();
let port = 8000;

app.use(express.json());

// Open SQLite3 database (in read-only mode)
let db = new sqlite3.Database(db_filename, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log('Error opening ' + path.basename(db_filename));
    }
    else {
        console.log('Now connected to ' + path.basename(db_filename));
    }
});


// GET request handler for crime codes
app.get('/codes', (req, res) => {

    // Check query for capital letter occurence
    if(queryCheck(req.query,res)===true){return;}

    console.log(req.query); // query object (key-value pairs after the ? in the url)
    let query='SELECT code, incident_type FROM Codes';
    let clause = 'WHERE';
    let params =[];

    if(req.query.hasOwnProperty('code')){
        [query,params,clause]= addClauseParam(query,params,
            'code = ?' , req.query.code,clause,res);
            if (query===false){return; }
    }
    if(req.query.hasOwnProperty('incident_type')){
        [query,params,clause] = addClauseParam(query,params,
            'incident_type = ?',req.query.incident_num,clause,res);
        if(query===false){return; }    
    }
    query = `${query} ORDER BY code DESC`

    res.status(200).type('json').send({}); // <-- you will need to change this
});

// GET request handler for neighborhoods
app.get('/neighborhoods', (req, res) => {
    console.log(req.query); // query object (key-value pairs after the ? in the url)

    res.status(200).type('json').send({}); // <-- you will need to change this
});

// GET request handler for crime incidents
app.get('/incidents', (req, res) => {
    // Check query for capital letter occurance
    if (queryCheck(req.query, res) === true) { return; }
    // console.log(req.query); // query object (key-value pairs after the ? in the url)
    let query = `SELECT case_number, date(date_time) AS date, time(date_time) AS time, code, incident, police_grid, 
    neighborhood_number, block FROM Incidents`;
    let clause = 'WHERE';
    let params = [];
    // Checks if req.query indicates any of the following conditional 
    // statements we want to restrict our SQL query to. 
    if (req.query.hasOwnProperty('start_date')) {
        [query, params, clause] = addClauseParam(query, params,
            'date(date_time) >= ? ', req.query.start_date, clause, res);
        if (query === false) { return; }
    }
    if (req.query.hasOwnProperty('end_date')) {
        [query, params, clause] = addClauseParam(query, params,
            'date(date_time) <= ? ', req.query.end_date, clause, res);
        if (query === false) { return; }
    }
    if (req.query.hasOwnProperty('code')) {
        [query, params, clause] = addClauseParam(query, params,
            'code = ?', req.query.code, clause, res);
        if (query === false) { return; }
    }
    if (req.query.hasOwnProperty('police_grid')) {
        [query, params, clause] = addClauseParam(query, params,
            'police_grid = ? ', req.query.police_grid, clause, res);
        if (query === false) { return; }
    }
    if (req.query.hasOwnProperty('neighborhood')) {
        [query, params, clause] = addClauseParam(query, params,
            'neighborhood_number = ?', req.query.neighborhood, clause, res);
        if (query === false) { return; }
    }
    query = `${query} ORDER BY date_time DESC`
    if (req.query.hasOwnProperty('limit')) {
        query = `${query} LIMIT ?`;
        params.push(req.query.limit);
    } else {
        query = `${query} LIMIT 1000`;
    }

    // Get data
    databaseSelect(query, params)
        .then((data) => {
            // Send data as response
            res.status(200).type('json').send(data);
        })
        .catch((err) => {
            // Send database error response
            console.log(err);
            res.status(404).type('text').send(`Internal error... Please try again later.`);
        })

    // res.status(200).type('text').send(query); // <-- easier testing query building

    // res.status(200).type('json').send({}); // <-- you will need to change this
});

/**
 * This method inputs all the values below and returns an array
 * of values. The first is the edited SQL Query, the second are the 
 * parameters added based on edited SQL Query and the third is the 
 * current condition of the clause. Will return false if an error is found. 
 * @param {Current created SQLITE3 Query} sqlQuery 
 * @param {Parameters substituted for ? in SQLITE3 Query} sqlParams 
 * @param {Is part of condition that is added to end of SQL Query} condition 
 * @param {Data from user query retrieved fro URL} userQuery 
 * @param {Will either be OR, AND or WHERE} clause 
 * @param {Response sent to page} response 
 * @returns 
 */
function addClauseParam(sqlQuery, sqlParams, condition, userQuery, clause, response) {
    sqlQuery = `${sqlQuery} ${clause} ${condition}`;
    let numOfParams = userQuery.split(',');
    if (numOfParams.indexOf('') !== -1) {
        // need to determine better way of sending this message!
        response.status(406).type('text').send("Empty item in list. Please check search parameters... (e.g. ?limit=50)");
        return [false, false, false];
    }
    sqlParams.push(numOfParams[0]);
    clause = 'OR';
    for (let i = 1; i < numOfParams.length; i++) {
        sqlParams.push(numOfParams[i]);
        sqlQuery = `${sqlQuery} ${clause} ${condition}`;
    }
    clause = 'AND';
    return [sqlQuery, sqlParams, clause]
}
/**
 * Will return true if a capital letter found and false otherwise.
 * @param {Query that is received from user} userQuery 
 * @param {Response that will be sent to user} response 
 * @returns 
 */
function queryCheck(userQuery, response) {
    for (let data in userQuery) {
        for (let keyword in data) {
            if (data[keyword].toUpperCase() === data[keyword]) {
                response.status(406).type('text').send('Capital letter in query... Please reformat to (e.g. ?limit=15)')
                return true;
            }
        }
    }
    return false;
}


// PUT request handler for new crime incident
app.put('/new-incident', (req, res) => {
    // call database to retrieve database attribute names -- then 
    // compare the attribute names with the req body -- if all 
    // values to put in database are present, not null then 
    // insert into database
    console.log(req.body);
    for (let data in req.body) {
        // check if key is in query
        // check to make sure that data is not undefined
        console.log(req.body[data])
    }
    //case_number, date, time, code, incident, police_grid, neighborhood_number, block
    let incident_num = req.body.case_number;
    // need to check for all parameters
    // Question: If the value is not given as a part of the put statement should we reject or insert null or empty string '' in its place?
    // console.log(incident_num)
    if (incident_num == undefined) {
        res.status(406).type('text').send('Invalid response... Please format in JSON (e.g. { "case_number": 5 })');
        return;
    }
    incident_num = parseInt(incident_num);
    // console.log(req.body); // uploaded data
    // database case_number check
    let selectQuery = `SELECT * FROM Incidents WHERE case_number = ?`;
    let insertQuery = `INSERT INTO Incidents (case_number, date_time, code, incident, police_grid, neighborhood_number, block) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    databaseSelect(selectQuery, [incident_num])
        .then((data) => {
            if (data.length !== 0) {
                res.status(500).type('text').send('Case does exist in database... Please choose a new case number.');
                return false;
            }
            return databaseRun(insertQuery, userQueryParams); //<-- after query uncomment this
            //return databaseSelect(selectQuery, userQueryParams);
        })
        .then((data) => {
            if (data !== false) {
                res.status(200).type('txt').send('OK...The case has been inserted into the Database.');
            }
        })
        .catch((err) => {
            console.log(err);
            internalErrorMessage(res);
        });
    // console.log(req.body); // uploaded data
    // res.status(200).type('txt').send('OK'); // <-- you may need to change this
});

// DELETE request handler for new crime incident
app.delete('/remove-incident', (req, res) => {
    let incident_num = req.body.case_number;
    // console.log(incident_num)
    if (incident_num == undefined) {
        res.status(406).type('text').send('Invalid response... Please format in JSON (e.g. { "case_number": 5 })');
        return;
    }
    incident_num = parseInt(incident_num);
    // console.log(req.body); // uploaded data
    // database case_number check
    let selectQuery = `SELECT * FROM Incidents WHERE case_number = ?`;
    let deleteQuery = `DELETE FROM Incidents WHERE case_number = ?`; //<-- still need to do this

    databaseSelect(selectQuery, [incident_num])
        .then((data) => {
            if (data.length === 0) {
                res.status(500).type('text').send('Case does not exist in database... Case number range: (10000000 --> 99999999)');
                return false;
            }
            // return databaseRun(deleteQuery, [incident_num]); <-- after query uncomment this
            return databaseSelect(selectQuery, [incident_num]);
        })
        .then((data) => {
            if (data !== false) {
                res.status(200).type('txt').send('OK...The case has been deleted.');
            }
        })
        .catch((err) => {
            console.log(err);
            internalErrorMessage(res);
        });


    // curl -X DELETE "http://localhost:8000/remove-incident" -H "Content-Type: application/json" -d "{\"case_number\": 5}"
    // database removal operation -- status 500 -- mention case number being in between
    // a certain range
});


// Create Promise for SQLite3 database SELECT query 
function databaseSelect(query, params) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        })
    })
}

// Create Promise for SQLite3 database INSERT or DELETE query
function databaseRun(query, params) {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    })
}

function internalErrorMessage(response) {
    response.status(404).type('text').send('Internal Error... Try again later.');
}


// Start server - listen for client connections
app.listen(port, () => {
    console.log('Now listening on port ' + port);
});

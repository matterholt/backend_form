const express = require('express')
const { body, validationResult, query } = require('express-validator');


const app = express()
const port = 3000
app.use(express.json()); // to parse JSON data from requests


class FormData {
    constructor(id, name, email, message) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.message = message;
    }
}
const formSubmissions = [
    new FormData(1, 'John Phiri', 'john@example.com', "Need some awesome work done in the the kitchen"),
    new FormData(2, 'Jane Banda', 'jane@example.com', "Need some awesome work done in the the kitchen  work done in the the kitchen work done in the the kitchen work done in the the kitchen work done in the the kitchen work done in the the kitchen work done in the the kitchen work done in the the kitchen"),
    new FormData(3, 'Bob Mbewe', 'bob@example.com', "Need some awesome work .")
];

app.get('/submittedFormRequest', (req, res) => {
    res.json(formSubmissions);
});


// will not except an empty reques
app.post('/userForms',
    body("email").isEmail().normalizeEmail(),
    body("name").isAlphanumeric(),
    (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            return res.send(`Hello, ${req.query.person}!`);
        }


        const { name, email, message } = req.body;

        const id = formSubmissions.length + 1;
        const newUser = new FormData(id, name, email, message);
        formSubmissions.push(newUser);
        res.sendStatus(201);
        // res.json(newUser);
    });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
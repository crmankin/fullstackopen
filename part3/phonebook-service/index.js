require("dotenv").config();

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("body", (req) => {
    return (req.method === "POST" || req.method === "PUT") ? JSON.stringify(req.body) : "-";
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.get('/', (request, response) => {
    response.send('<h1>Persons DB Service</h1><p>Use REST endpoint /api/persons to retrieve full list.</p>');
});

app.get('/info', (request, response) => {
    Person.estimatedDocumentCount().then(result => {
        const dt = new Date().toISOString();
        response.send(`<p>Phonebook has info for ${result} people.</p><P>Request received: ${dt}</p>`);  
    });
});

app.get('/api/persons', (request, response) => {
    Person.find().then(result => {
        response.json(result)
    });
});

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(result => {
        if (result) {
            response.json(result);
        } else {
            response.status(404).end();
        }
    });
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(p => p.id !== id);
    response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const person = request.body;

    if (!person.name || !person.number) {
        response.status(400).json({ error: "Missing name or number." });
        return;
    } else if (persons.some(p => p.name === person.name)) {
        response.status(400).json({ error: "Name must be unique." });
        return;
    }

    const newId = Math.floor(Math.random() * 1000000 + 1);
    const newPerson = { ...person, id: newId };
    persons = persons.concat(newPerson);

    response.json(newPerson);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

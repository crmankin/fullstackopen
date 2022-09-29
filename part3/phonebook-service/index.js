const express = require("express");
const app = express();

const persons = [
    {
        "id": 1,
        "name": "Christopher Mankin",
        "number": "419-346-3470"
    },
    {
        "id": 2,
        "name": "Jack Mankin Sr",
        "number": "614-491-6636"
    },
    {
        "id": 3,
        "name": "Kevin Schultz",
        "number": "563-881-9123"
    },
    {
        "id": 4,
        "name": "Michelle Callahan",
        "number": "888-888-8888"
    }
];


app.get('/', (request, response) => {
    console.log("GET /");
    response.send('<h1>Persons DB Service</h1><p>Use REST endpoint /api/persons to retrieve full list.</p>');
});

app.get('/info', (request, response) => {
    console.log("GET /info");
    const count = persons.length;
    const dt = new Date().toISOString();
    response.send(`<p>Phonebook has info for ${count} people.</p><P>Request received: ${dt}</p>`);
});

app.get('/api/persons', (request, response) => {
    console.log("GET /api/persons")
    response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

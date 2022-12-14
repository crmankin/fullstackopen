require("dotenv").config();

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());


morgan.token("body", (req) => {
    return (req.method === "POST" || req.method === "PUT") ? JSON.stringify(req.body) : "-";
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.get("/", (_request, response) => {
    response.send("<h1>Persons DB Service</h1><p>Use REST endpoint /api/persons to retrieve full list.</p>");
});

app.get("/info", (_request, response, next) => {
    Person.estimatedDocumentCount().then(result => {
        const dt = new Date().toISOString();
        response.send(`<p>Phonebook has info for ${result} people.</p><P>Request received: ${dt}</p>`);
    }).catch(err => next(err));
});

app.get("/api/persons", (_request, response, next) => {
    Person.find().then(result => {
        response.json(result);
    }).catch(err => next(err));
});

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id).then(result => {
        if (result) {
            response.json(result);
        } else {
            response.status(404).end();
        }
    }).catch(err => next(err));
});

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(() => {
        response.status(204).end();
    }).catch(err => next(err));
});

app.post("/api/persons", (request, response, next) => {
    const body = request.body;

    Person.findOne({
        name: body.name
    }).then(result => {
        if (result) {
            response.status(400).json({ error: "Name must be unique." });
        } else {
            const person = new Person({
                name: body.name,
                number: body.number
            });

            return person.save().then(result => {
                response.json(result);
            });
        }
    }).catch(err => next(err));
});

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: "query" })
        .then(result => {
            if(result) response.json(result);
            else response.status(404).end();
        }).catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformed id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};
app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

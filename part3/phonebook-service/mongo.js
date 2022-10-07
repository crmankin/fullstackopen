const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {
    console.log('Usage: node mongo.js <password>');
    console.log('Usage: node mongo.js <password> <nametoadd> <numbertoadd>');
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb://admin:${password}@audradminsrv`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});
const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then(result => {
        console.log("connected");
        mongoose.connection.useDb("crmankin");

        if (process.argv.length == 3) {
            console.log("current DB contents:")
            return Person.find({}).then(result => {
                result.forEach(p => console.log(p));
            });
        } else {
            console.log(`adding ${process.argv[3]} to DB`);
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            });

            return person.save()
        }
    })
    .then(() => {
        console.log("closing");
        return mongoose.connection.close();
    })
    .catch((err) => console.log(err));


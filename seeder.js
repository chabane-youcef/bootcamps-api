const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//* Load env vars
dotenv.config({
    path: './config/config.env'
});

//* load models
const Bootcamp = require('./models/bootcamp');
const Course = require('./models/Course');

//* Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

//* Read the JSON files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);
const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

//* Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        // await Course.create(courses);
        console.log('DATA Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

//* Delete Data from DB
const DeleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('DATA Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    DeleteData();
}
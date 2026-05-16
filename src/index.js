const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//Connect db
db.connect();
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
// HTTP logger
// app.use(morgan("combined"));

//template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        partialsDir: path.join(__dirname, 'resources', 'views', 'partials'),
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const path = require('path');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

// Tích hợp middleware để xử lý dữ liệu từ form khi submit
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

//HTTP logger
// app.use(morgan("combined"));

//Template engine
// app.engine(
//   "hbs",
//   handlebars.engine({
//     extname: ".hbs",
//   })
// );
// app.set("view engine", "hbs");

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));
// console.log(path.join(__dirname, "resources", "views"))

// Routes init
route(app);

// 127.0.0.1 - localhost:3000
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

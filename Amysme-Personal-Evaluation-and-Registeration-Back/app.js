var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var cors = require('cors')

var indexRouter = require('./routes/index');
var reclamationRouter = require('./routes/reclamation');
var demandRouter = require('./routes/employeeDemand');
var candidatureRoute = require('./routes/candidature');

var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/reclamation', reclamationRouter);
app.use('/demand', demandRouter);
app.use('/candidature', candidatureRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use(cors());

// DB Connection
const username = "user1";
const password = "NFDjRWqVwLWlvwoy";
const cluster = "cluster0.1xb4gu3";
const dbname = "";

mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) {
            console.log("Not Connecteddd \n\n\n")
            console.log(err)
        }
        else
            console.log('Connected to MongoDB!!!')
    }
);

module.exports = app;

const express = require('express');
const app = express();
app.use("/public", express.static("public"))

const db = require('./database/index.js')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

const pg = require('pg')

require('dotenv').load();

app.set('view engine', 'pug')

const session = require('express-session')
let sess = {secret: process.env.secret,	cookie: {}}
app.use(session(sess))

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

require('./routes/index.js')(app, db)
require('./routes/welcome.js')(app)
require('./routes/signup.js')(app, db)
require('./routes/searchusersignup.js')(app, db)
require('./routes/login.js')(app, db)
require('./routes/newchore.js')(app, db)
require('./routes/logout.js')(app)

let reminder = require('./routes/reminder.js')

db.sequelize.sync().then(() => {
	setInterval(function(){reminder(db, sgMail)}, 6000)
})


let server = app.listen(process.env.webport, () => {
	console.log(`Listening at port ${process.env.webport}`)
});
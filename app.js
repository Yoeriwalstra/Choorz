const express = require('express');
const app = express();
app.use("/public", express.static("public"))

const db = require('./database/index.js')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

const pg = require('pg')

require('dotenv').load();

app.set('view engine', 'pug')

const bcrypt = require('bcrypt');

const session = require('express-session')
let sess = {secret: process.env.secret,	cookie: {}}
app.use(session(sess))

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'yoeriwalstra@gmail.com',
  from: 'choorz@choorz.choorz',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);

require('./routes/index.js')(app, db, session)
require('./routes/welcome.js')(app)
require('./routes/signup.js')(app, db, bcrypt, session)
require('./routes/login.js')(app, db, bcrypt, session)
require('./routes/newchore.js')(app, db, session)
require('./routes/logout.js')(app, session)
require('./routes/countdown.js')(app, db, sgMail)



db.sequelize.sync(/*{force:true}*/)/*.then(() => {
	// db.User.create({
	// 	email: 'a@a',
	// 	username: 'A',
	// 	password: 'Aaaaa1!'
	// })
	// db.User.create({
	// 	email: 'y@y',
	// 	username: 'Y',
	// 	password: 'Yoeri1!'
	// })
	// db.Chore.create({
	// 	category: 'X',
	// 	description: 'xxxxx',
	// 	intervalInteger: 1,
	// 	timePeriod: 'Day(s)'
	// })
	// db.Chore.create({
	// 	category: 'Y',
	// 	description: 'yyyyy',
	// 	intervalInteger: 3,
	// 	timePeriod: 'Week(s)'			
	// })
	// db.Chore.create({
	// 	category: 'X',
	// 	description: 'xxxxx',
	// 	intervalInteger: 1,
	// 	timePeriod: 'Day(s)'
	// })
	// db.Chore.create({
	// 	category: 'Y',
	// 	description: 'yyyyy',
	// 	intervalInteger: 3,
	// 	timePeriod: 'Week(s)'			
	// })
	// db.Chore.create({
	// 	category: 'X',
	// 	description: 'xxxxx',
	// 	intervalInteger: 1,
	// 	timePeriod: 'Day(s)'
	// })
	// db.Chore.create({
	// 	category: 'Y',
	// 	description: 'yyyyy',
	// 	intervalInteger: 3,
	// 	timePeriod: 'Week(s)'			
	// })
})*/



let server = app.listen(process.env.webport, () => {
	console.log(`Listening at port ${process.env.webport}`)
});
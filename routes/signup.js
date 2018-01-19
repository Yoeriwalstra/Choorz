const bcrypt = require('bcrypt');

module.exports = (app, db) => {
const Op = db.Sequelize.Op

	app.get('/signup', (req, res) => {
		res.render('signup', {user: req.session.user})
	})

	app.post('/signup', (req, res) => {
		let password = req.body.password
		let verifyPw = req.body.verifyPw

		if (password === verifyPw) {
			bcrypt.hash(password, 10, (err, hash) => {
				db.User.create({
					email: req.body.email,
					username: req.body.username,
					password: hash
				})
				.then((result) => {
					req.session.user = {id: result.dataValues.id, username: result.dataValues.username}
					res.redirect('/')
				})
				.catch((err) => {
					console.log(err)
					res.status(500)
				})
			})
		}
	})
}
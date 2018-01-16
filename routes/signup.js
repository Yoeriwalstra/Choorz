module.exports = (app, db, bcrypt, session) => {
const Op = db.Sequelize.Op

	app.get('/signup', (req, res) => {
		res.render('signup')
	})

	app.post('/signup', (req, res) => {
		let email = req.body.email
		let username = req.body.username
		let password = req.body.password
		let verifyPw = req.body.verifyPw

		if (password === verifyPw) {
			bcrypt.hash(password, 10, (err, hash) => {
				db.User.create({
					email: email,
					username: username,
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

	app.post('/searchusersignup', (req, res) => {
		let username = req.body.username
		let email = req.body.email

		db.User.findAll({
			where: {
				[Op.or]: [{username: username}, {email: email}]
			}
		}).then((result) => {
			if(result.length === 0) {
				res.send({available: true})
			} else {
				res.send({username: result[0].dataValues.username, email: result[0].dataValues.email})
			}
		})
	})
}
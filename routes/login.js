const bcrypt = require('bcrypt');

module.exports = (app, db) => {
	app.get('/login', (req, res) => {
		res.render('login', {user: req.session.user})
	})

	app.post("/login", (req, res) => {
		let username = req.body.username
		let password = req.body.password

		db.User.findOne({
			where: {
				username: username
			}
		})
		.then((result) => {
			if(result === null){
				res.send({error: "This username doesn\'t exist"})
			} else if (result) {
				bcrypt.compare(password, result.dataValues.password, (err, compareResult) => {
					if (err) {
						res.end()
						throw err
					}
					else if (compareResult) {
						req.session.user = {id: result.dataValues.id, username: result.dataValues.username}
						res.status(200).send(true)
					} else {
						res.send({error1: "The username and password do not match."})
					}
				})
			}
		})
		.catch((err) => {
			console.log(err)
			res.status(500)
		})
	})
}
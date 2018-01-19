module.exports = (app, db) => {
const Op = db.Sequelize.Op

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
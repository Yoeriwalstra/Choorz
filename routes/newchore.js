module.exports = (app, db) => {
	app.get('/newchore', (req, res) => {
		//if (req.session.user) {
		res.render('newchore', {user: req.session.user})
	})

	app.post('/newchore', (req, res) => {
		let category = req.body.category
		let description = req.body.description
		let intervalInteger = req.body.intervalInteger
		let timePeriod = req.body.timePeriod

		console.log(typeof intervalInteger)
		db.Chore.create({
			category: category,
			description: description,
			intervalInteger: intervalInteger,
			timePeriod: timePeriod,
			userId: req.session.user.id
		}).then((result) => {
			res.redirect('/')
		}).catch((err) => {
			console.log(err)
			res.status(500)
		})
	})
}
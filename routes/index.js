module.exports = (app, db, session) => {
	app.get('/', (req, res) => {
		if (req.session.user) {
			db.Chore.findAll({
				where: {
					userId: req.session.user.id
				}
			}).then((result) => {
				let category = []
				let description = []
				for(let i = 0; i < result.length; i++) {
					if (category.indexOf(result[i].dataValues.category) === -1) {
						category.push(result[i].dataValues.category)
					}
				}
				res.render('index', {category: category, result: result, user: req.session.user})
			})
		} else {
			res.redirect('welcome')
		}
	})
}
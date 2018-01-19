const  moment = require('moment');

module.exports = (app, db) => {
	app.get('/newchore', (req, res) => {
		if (req.session.user) {
			res.render('newchore', {user: req.session.user})

			app.post('/newchore', (req, res) => {
				let intervalInMs = 0
				let timePeriod = req.body.timePeriod
				let intervalInteger = req.body.intervalInteger
				
				//Change if-statements into a function that uses timePeriod as a parameter to calculate intervalInMs
				if (timePeriod === 'day') {
					intervalInMs = intervalInteger * 86400000
				} else if (timePeriod === 'week') {
					intervalInMs = intervalInteger * 604800000
				} else if (timePeriod === 'month') {
					intervalInMs = intervalInteger * 2629743830
				} else if (timePeriod === 'year') {
					intervalInMs = intervalInteger * 31556926000
				}

				db.Chore.create({
					category: req.body.category,
					description: req.body.description,
					intervalInteger: req.body.intervalInteger,
					timePeriod: timePeriod,
					intervalInMs: intervalInMs,
					createdAtInMs: moment().valueOf(),
					reminderCounter: 1,
					userId: req.session.user.id
				}).then((result) => {
					res.redirect('/')
				}).catch((err) => {
					console.log(err)
					res.status(500)
				})
			})
		} else {
			res.redirect('/welcome')
		}
	})
}
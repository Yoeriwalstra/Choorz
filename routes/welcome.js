module.exports = (app) => {
	app.get('/welcome', (req, res) => {
		res.render('welcome')
	})
}
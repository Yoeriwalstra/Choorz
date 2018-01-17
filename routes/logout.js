module.exports = (app) => {
	app.get("/logout", (req, res) => {
		req.session.destroy((err) => {
			console.log(err)
			res.redirect("/welcome")
		})
	})
}
module.exports = (app, db, sgMail) => {

	app.post('/countdown', (req, res) => {
		let choreDescription = req.body.choreDescription

		db.Chore.findAll({
			where: {
				description: choreDescription
			}
		}).then((result) => {
			console.log("db search result", result)
			
		})
	})

	function countdownDay() {
		let countdownDay = 86400
		let counterMissedDeadline = 0
		let email = ""

		setInterval(function(){
			countdownDay--
			if (choreDescription === result.dataValues.description) {
				countdownDay=86400
			// } else if (countdownDay === 0) {
				
			// 	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
				
			// 	db.User.findAll({
			// 		where: {
			// 			id: req.session.user.id
			// 		}
			// 	}).then((result) => {

			// 	const msg = {
			// 		to: result.dataValues.email,
			// 		from: 'choorz@choorz.choorz',	
			// 		subject: 'Choorz - chore reminder',	
			// 		text: `Hey ${result.dataValues.username}, just letting you know it has been ${counterMissedDeadline} ${timePeriod} since you\'ve last done: ${result.dataValues.description}`,
			// 		html: `<p>Hey ${result.dataValues.username}, just letting you know it has been <strong>${counterMissedDeadline} ${timePeriod}</strong> since you\'ve last done: ${result.dataValues.description}</p>`,
			// 	};
			// 	sgMail.send(msg)
			// 	})

				counterMissedDeadline++
				
				countdownDay = 86400
			//clearInterval(countdown);
			//Use clearInterval() when chore is deleted???
			}
		}, 1000);
	}

	function countdownWeek() {
		let countdownWeek = 604800

		let countdown = setInterval(function(){
			countdownWeek--
			if (choreDescription === result.dataValues.description) {
				countdownWeek=604800
			} else if (countdownWeek === 0) {
			//SEND EMAIL REMINDER
			counterMissedDeadline++
			countdownWeek = 604800
			//clearInterval(newYearCountdown);
			//Use clearInterval() when chore is deleted???
			}
		}, 1000);
	}

	function countdownMonth() {
		
	}

	function countdownYear() {
		
	}





	let countdownMonth = 2629743

	let countdown = setInterval(function(){
		countdownMonth--
		if (choreDescription === result.dataValues.description) {
			countdownMonth=2629743
		} else if (countdownMonth === 0) {
		//SEND EMAIL REMINDER
		counterMissedDeadline++
		countdownMonth = 2629743
		//clearInterval(newYearCountdown);
		//Use clearInterval() when chore is deleted???
		}
	}, 1000);

	let countdownYear = 31556926

	let countdown = setInterval(function(){
		countdownYear--
		if (choreDescription === result.dataValues.description) {
			countdownYear=31556926
		} else if (countdownYear === 0) {
		//SEND EMAIL REMINDER
		counterMissedDeadline++
		countdownYear = 31556926
		//clearInterval(newYearCountdown);
		//Use clearInterval() when chore is deleted???
		}
	}, 1000);

	app.post('/countdown', (req, res) => {

	})
}




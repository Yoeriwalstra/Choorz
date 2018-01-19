const  moment = require('moment')


module.exports =  reminder = function(db, sgMail) {
	db.sequelize.query(`
		SELECT *
		FROM 
			(SELECT "id", "description", "intervalInteger", "reminderCounter", (${moment().valueOf()} - "createdAtInMs") / "intervalInMs" as reminderCheck
			FROM chores) as "processed"
		WHERE "reminderCounter" < reminderCheck;`
	).then((result) => {
		let allId = []
		for(let i = 0; i < result[0].length; i++) {
			allId.push(result[0][i].id)
		}
		db.Chore.update({reminderCounter: db.sequelize.literal('"reminderCounter" + 1')}, {where: {id: [...allId]}});
		// db.User.findAll({
		// 	where: {db.Chore.findAll({
		// 		where: {id: allId}
		// 		})
		// 	}
		// }).then((remindUsers) => {
		// 	console.log(remindUsers)
		// })
	}).catch((err) => {
		console.log(err)
	})
}


	// const msg = {
	// 	to: result.dataValues.email,
	// 	from: 'choorz@choorz.choorz',	
	// 	subject: 'Choorz - chore reminder',	
	// 	text: `Hey ${result.dataValues.username}, just letting you know it has been ${counterMissedDeadline} ${timePeriod} since you\'ve last done: ${result.dataValues.description}`,
	// 	html: `<p>Hey ${result.dataValues.username}, just letting you know it has been <strong>${counterMissedDeadline} ${timePeriod}</strong> since you\'ve last done: ${result.dataValues.description}</p>`,
	// };
	// sgMail.send(msg)


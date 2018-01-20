const  moment = require('moment')


module.exports =  reminder = function(db, sgMail) {
	db.sequelize.query(`
		SELECT *
		FROM 
			(SELECT "id", "description", "intervalInteger", "reminderCounter", (${moment().valueOf()} - "createdAtInMs") / "intervalInMs" as reminderCheck
			FROM chores) as "processed"
		WHERE "reminderCounter" < reminderCheck;`
	).then((result) => {
		console.log("result of query to find chore that need reminderCounter+1", result)
		let allId = []
		for(let i = 0; i < result[0].length; i++) {
			allId.push(result[0][i].id)
		}
		db.Chore.update({reminderCounter: db.sequelize.literal('"reminderCounter" + 1')}, {where: {id: [...allId]}});
		db.sequelize.query(`
			SELECT * FROM users
			WHERE id IN 
				(SELECT "userId" FROM chores WHERE id IN (${allId.toString()}));`
		).then((result1) => {
			console.log("result of query to find userId that need reminder", result1)
			// for(let i = 0; i < result[0].length; i++) {
			// 	const msg = {
			// 		to: `${result[0][i].email}`,
			// 		from: 'choorz@choorz.choorz',	
			// 		subject: 'Choorz - chore reminder',	
			// 		text: `Hey ${result[0][i].username}, just letting you know it has been (${reminderCounter}\*${intervalInteger}) ${timePeriod} since you\'ve last done: ${result.dataValues.description}`,
			// 		html: `<p>Hey ${result.dataValues.username}, just letting you know it has been <strong>${counterMissedDeadline} ${timePeriod}</strong> since you\'ve last done: ${result.dataValues.description}</p>`,
			// 	};
			// 	sgMail.send(msg)
			// }
		}).catch((err) => {
			console.log(err)
		})
	}).catch((err) => {
		console.log(err)
	})
}



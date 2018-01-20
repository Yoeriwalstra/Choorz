const  moment = require('moment')


module.exports =  reminder = function(db, sgMail) {
	let ReminderchoreId = []

	//First query to find chores that have passed their deadline without being 'updated' (by clicking them in the app).
	db.sequelize.query(`
		SELECT *
		FROM 
			(SELECT "id", "description", "intervalInteger", "reminderCounter", (${moment().valueOf()} - "createdAtInMs") / "intervalInMs" as reminderCheck
			FROM chores) as "processed"
		WHERE "reminderCounter" < reminderCheck;`
	).then((result) => {
		for(let i = 0; i < result[0].length; i++) {
			ReminderchoreId.push(result[0][i].id)
		}
		db.Chore.update({reminderCounter: db.sequelize.literal('"reminderCounter" + 1')}, {where: {id: [...ReminderchoreId]}});
		
		//Second query to find the user information (email, username) of the user(s) whose chore has expired.
		db.sequelize.query(`
			SELECT * FROM users
			WHERE id IN 
				(SELECT "userId" FROM chores WHERE id IN (${ReminderchoreId}));`
		).then((result1) => {

			//Third query to find all information to implement in emails of all chores that have passed their deadline.
			db.Chore.findAll({
				where: {
					id: ReminderchoreId
				}
			}).then((result2) => {
				for(let i = 0; i < result1[0].length; i++) {
					let timesMissedDeadline = result2[0].dataValues.reminderCounter * result2[0].dataValues.intervalInteger
					const msg = {
						to: `${result1[0][i].email}`,
						from: 'choorz@choorz.choorz',	
						subject: 'Choorz - chore reminder',	
						text: `Hey ${result1[0][i].username}, just letting you know it has been ${timesMissedDeadline} ${result2[0].dataValues.timePeriod}(s) since you've last done: ${result2[0].dataValues.description}`,
						html: `<p>Hey ${result1[0][i].username}, just letting you know it has been <strong>${timesMissedDeadline} ${result2[0].dataValues.timePeriod}(s)</strong> since you've last done: ${result2[0].dataValues.description}</p>`,
					};
					sgMail.send(msg)
				console.log("msg sent")
				}
			})
		}).catch((err) => {
			console.log(err)
		})
	}).catch((err) => {
		console.log(err)
	})
}



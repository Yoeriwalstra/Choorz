require('dotenv').load();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.database, process.env.pgusername, process.env.password, {
	host: process.env.host,
	dialect: 'postgres',
	logging: false
})
const Op = Sequelize.Op

sequelize
.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

//Table definition:
//Table names ('user') automatically get pluralized by sequelize (check SQL shell)
const User = sequelize.define('user', {
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			notIn: [['user']],
		}
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			notIn: [['user']],
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	}
});

const Chore = sequelize.define('chore', {
	category: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	},
	intervalInteger: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	},
	timePeriod: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	},
	intervalInMs: {
		type: Sequelize.BIGINT,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	},
	createdAtInMs: {
		type: Sequelize.BIGINT,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	},
	reminderCounter: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	}
});

//These methods function as foreign key constraints for the .create-method
User.hasMany(Chore)
Chore.belongsTo(User)

const db = {
	User: User,
	Chore: Chore,
	Sequelize: Sequelize,
	sequelize: sequelize,
	Op: Op
}

module.exports = db
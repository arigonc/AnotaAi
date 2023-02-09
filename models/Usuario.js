const db = require('./db')

const Usuario = db.sequelize.define('usuarios', {
    email: {
        type: db.Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
})

module.exports = Usuario
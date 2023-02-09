const db = require('./db')

const Tarefa = db.sequelize.define('tarefas', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    titulo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    hora: {
        type: db.Sequelize.TIME,
        allowNull: false
    },
    situacao: {
        type: db.Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pendente'
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'email'
        }
    }
})

module.exports = Tarefa
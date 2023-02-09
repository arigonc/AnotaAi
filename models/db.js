const Sequelize = require('sequelize')
const sequelize = new Sequelize('anotaai', 'novo_usuario', 'novo_usuario', {
    host: 'localhost',
    dialect: 'mysql',
    query:{raw:true}
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
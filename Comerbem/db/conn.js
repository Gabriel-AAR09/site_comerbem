const { Sequelize } = require('sequelize')

const sequelize = new Sequelize ('test', 'root', 'Gab090604', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
} catch(err) {
    console.log(`Nao foi possivel conectar: ${err}`)
}

module.exports = sequelize
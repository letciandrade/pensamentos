const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('toughts','aluno_medio','@lunoSenai23.',{
  host:'localhost',
  port:3306,
  dialect:'mysql',
})

try{
  sequelize.authenticate()
  console.log('conectado ao MYSQL!')
} catch(error){
  console.log(error)
}

module.exports = sequelize
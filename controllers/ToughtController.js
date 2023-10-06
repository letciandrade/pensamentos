const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController{
  static async showToughts(req,res){
    return res.render('toughts/home')//esta coisando um arquivo e não uma rota, uma pagina
  }
}
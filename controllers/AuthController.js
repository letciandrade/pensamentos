const User = require('../models/User')
//criptografar a senha
const bcrypt = require('bcryptjs')

module.exports = class AuthController{
  static async login(req,res){
    return res.render('auth/login')
  }
  static async register(req,res){
    return res.render('auth/register')
  }

  static async registerPost(req,res){
    const {name, email, password, confirmpassword} = req.body
    if(password != confirmpassword){
       req.flash('message','As senhas não conferem tente novamente')
       return res.render('auth/register')
    }

    // validação de email - verificar se ja esta cadastrado

    // criptografar a senha do usuario

    // criar objeto usuario para cadastro no banco de dados

    // try inserir usuario no banco e trabalhar com sessao


  }
}
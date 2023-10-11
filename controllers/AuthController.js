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
  const checkIfUserExist = await User.findOne({where:{email:email}})
  if(checkIfUserExist){
    req.flash('message','O email já está em uso')
    res.render('auth/register')
    return
  }
    // criptografar a senha do usuario
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
    // criar objeto usuario para cadastro no banco de dados
  const user = {
    name,
    email,
    password:hashedPassword
  }
    // try inserir usuario no banco e trabalhar com sessao
  try {
    const createUser = await User.create(user)

    req.session.userId = createUser.id

    req.flash('message','cadastro realizado com sucesso')
    req.session.save(()=>{
      res.redirect('/')
    })
  } catch (error) {
    console.log(error)
  }

  }

  static async logout(req, res){
    req.session.destroy()
    res.redirect('/login')
  }
}
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore =  require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

//importar models
const User = require('./models/User')
const Tought = require('./models/Tought')
//importar rotas
const toughtsRoutes = require('./routes/toughtsRoutes')
const AuthRoutes = require('./routes/authRoutes')
//importar controleer
const ToughtController = require('./controllers/ToughtController')
const AuthController = require('./controllers/AuthController')
//config engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//config json
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//config middleware para as sessoes
app.use(session({
  name:'session',
  secret:'nosso_secret', //quanto maior a crypto melhor rsrs
  resave:false,
  saveUninitialized:false,
  store: new FileStore({
    logFn: function (){},
    path: require('path').join(require('os').tmpdir(),'sessions') // gambiarra.
  }),
  cookie:{
    secure:false,
    maxAge: 360000,
    expires: new Date(Date.now() + 360000),
    httpOnly:true
  }


}))
//importar as flashs
app.use(flash())

//importar arquivos estáticos
app.use(express.static('public'))

//armazenar as sessoes nas rotas
app.use((req,res,next)=>{
  if(req.session.userId){
    res.locals.session = req.session
  }
  next()
})
//rotas
app.use('/toughts', toughtsRoutes)
app.use('/', AuthRoutes)
app.get('/', ToughtController.showToughts)

//conexao e criação das tabelas do banco
conn
.sync()
.then(()=>{
  app.listen(2333)
}).catch((err)=> console.log(err))
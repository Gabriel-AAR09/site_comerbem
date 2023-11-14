// Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars');
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const bodyParser = require('body-parser');
const app = express();
const path = require("path")

//Conexão com a pasta pulbic
app.use(express.static(path.join(__dirname,"public")))

// Conexão com banco de dados MySql
const conn = require('./db/conn')

//Import Routes
const ComerBemRoutes = require("./routes/ComerBemRoutes")
const authRoutes = require("./routes/authRoutes")
const receitasRoutes = require("./routes/receitasRoutes")

// Models
const User = require('./models/User')

// Template Engine
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

// session middleware

app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        store: new FileStore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

// set session to res
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }

    next()
})


// flsh messages
app.use(flash())

// Express = antigo body-parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Rotas

app.use('/comerbem', ComerBemRoutes)
app.use('/comerbem', authRoutes)
app.use('/comerbem', receitasRoutes)


// Localhost:3000
app.listen(3000, function(){
    console.log("Servidor Rodando na url http//localhost:3000");
});
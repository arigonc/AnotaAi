const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const usuario = require('./routes/usuario')
const tarefa = require('./routes/tarefa')
const moment = require('moment')

//sessão
app.use(session({
    secret: 'mensagem',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

//middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.logado = req.session.logado || null
    next()
})

//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//template engine
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main', helpers: {
        formatDate: (date, format) => {
            return moment(date).format(format)
        },
        status: (id, data, situacao) => {
            if (moment(new Date()).format('YYYY-MM-DD') < data) {
                return '<a class="badge bg-warning mx-1 text-decoration-none" href="/tarefa/editar/' + id + '">Marcada</a>'
            } else if (situacao == 'Realizada') {
                return '<a class="badge bg-success mx-1 text-decoration-none" href="/tarefa/situacao/' + id + '">Realizada</a>'
            } else {
                return '<a class="badge bg-danger mx-1 text-decoration-none" href="/tarefa/situacao/' + id + '">Pendente</a>'
            }
        }
    }
}))
app.set('view engine', 'handlebars')

//arquivos estáticos
app.use(express.static(path.join(__dirname, "public")))

//rotas
app.use('/', usuario)
app.use('/tarefa', tarefa)

app.listen(8081, function () {
    console.log('Servidor rodando!')
})
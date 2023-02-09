const express = require('express')
const router = express.Router()
const Tarefa = require('../models/Tarefa')
const { estaLogado } = require('../helpers/estaLogado')

router.get('/cadastrar', estaLogado, (req, res) => {
    res.render('tarefa/cadastrar')
})

router.post('/cadastrar', estaLogado, (req, res) => {
    Tarefa.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        data: req.body.data,
        hora: req.body.hora,
        email: req.session.logado.email
    }).then(() => {
        req.flash('success_msg', 'Tarefa cadastrada com sucesso!')
        res.redirect('/tarefa/cadastrar')
    }).catch((erro) => {
        req.flash('error_msg', 'Ocorreu um erro inesperado!' + erro)
        res.redirect('/tarefa/cadastrar')
    })
})

router.get('/editar/:id', estaLogado, (req, res) => {
    Tarefa.findOne({
        where: { id: req.params.id }
    }).then((tarefa) => {
        if (tarefa) {
            if (req.session.logado.email == tarefa.email) {
                res.render('tarefa/editar', { tarefa: tarefa })
            }
        } else {
            res.redirect('/')
        }
    }).catch((erro) => {
        res.redirect('/')
    })
})

router.post('/editar/:id', estaLogado, (req, res) => {
    Tarefa.findOne({
        where: { id: req.params.id }
    }).then((tarefa) => {
        if (tarefa) {
            if (req.session.logado.email == tarefa.email) {
                Tarefa.update({
                    titulo: req.body.titulo,
                    descricao: req.body.descricao,
                    data: req.body.data,
                    hora: req.body.hora,
                }, {
                    where: { id: req.params.id }
                }).then(() => {
                    req.flash('success_msg', 'Tarefa editada com sucesso!')
                    res.redirect('/tarefa/editar/' + req.params.id)
                }).catch((erro) => {
                    req.flash('error_msg', 'Ocorreu um erro inesperado!')
                    res.redirect('/tarefa/editar/' + req.params.id)
                })
            }
        } else {
            res.redirect('/')
        }
    }).catch((erro) => {
        res.redirect('/')
    })
})

router.get('/situacao/:id', estaLogado, (req, res) => {
    Tarefa.findOne({
        where: { id: req.params.id }
    }).then((tarefa) => {
        if (tarefa) {
            if (req.session.logado.email == tarefa.email) {
                var situacao = 'Pendente'
                if (tarefa.situacao == 'Pendente') {
                    var situacao = 'Realizada'
                }
                Tarefa.update({
                    situacao: situacao
                }, {
                    where: { id: req.params.id }
                }).then(() => {
                    res.redirect('/')
                }).catch((erro) => {
                    res.redirect('/')
                })
            }
        } else {
            res.redirect('/')
        }
    }).catch((erro) => {
        res.redirect('/')
    })
})

router.get('/remover/:id', estaLogado, (req, res) => {
    Tarefa.findOne({
        where: { id: req.params.id }
    }).then((tarefa) => {
        if (tarefa) {
            if (req.session.logado.email == tarefa.email) {
                Tarefa.destroy({ where: { 'id': req.params.id } }).then(() => {
                    req.flash('success_msg', 'Tarefa removida com sucesso!')
                    res.redirect('/')
                }).catch((erro) => {
                    req.flash('error_msg', 'Ocorreu um erro inesperado!')
                    res.redirect('/')
                })
            }
        } else {
            res.redirect('/')
        }
    }).catch((erro) => {
        res.redirect('/')
    })
})

module.exports = router
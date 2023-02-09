const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuario')
const Tarefa = require('../models/Tarefa')
const bcrypt = require('bcryptjs')
const { estaLogado } = require('../helpers/estaLogado')
const moment = require('moment');
const db = require('../models/db')
const { QueryTypes } = require('sequelize');


router.get('/', estaLogado, (req, res) => {
    var filtro = req.query.filtro
    if (filtro == null || filtro == undefined) {
        filtro = moment(new Date()).format('YYYY-MM-DD')
    }

    Tarefa.findAll({
        where: {
            email: req.session.logado.email,
            data: filtro
        }
    }).then(function (tarefas) {
        res.render('usuario/index', { tarefas: tarefas, filtro: filtro })
    })
})

router.post('/perfil', (req, res) => {
    Usuario.findOne({
        where: { email: req.session.logado.email }
    }).then((usuario) => {
        if (usuario) {
            Usuario.update({
                nome: req.body.nome
            }, {
                where: { email: req.session.logado.email }
            }).then(() => {
                req.session.logado.nome = req.body.nome
                req.flash('success_msg', 'Perfil atualizado com sucesso!')
                res.redirect('/')
            }).catch((erro) => {
                req.flash('error_msg', 'Ocorreu um erro inesperado!')
                res.redirect('/')
            })
        } else {
            res.redirect('/')
        }
    }).catch((erro) => {
        res.redirect('/')
    })
})

router.post('/senha', (req, res) => {
    Usuario.findOne({
        where: { email: req.session.logado.email }
    }).then((usuario) => {
        if (usuario) {
            bcrypt.genSalt(10, (erro, salt) => {
                bcrypt.hash(req.body.senha, salt, (erro, hash) => {
                    if (erro) {
                        req.flash('error_msg', 'Ocorreu um erro inesperado!')
                        res.redirect('/')
                    } else {
                        Usuario.update({
                            senha: hash
                        }, {
                            where: { email: req.session.logado.email }
                        }).then(() => {
                            req.session.logado.senha = hash
                            req.flash('success_msg', 'Senha atualizada com sucesso!')
                            res.redirect('/')
                        }).catch((erro) => {
                            req.flash('error_msg', 'Ocorreu um erro inesperado!')
                            res.redirect('/')
                        })
                    }
                })
            })
        } else {
            res.redirect('/')
        }
    }).catch((erro) => {
        res.redirect('/')
    })
})

router.get('/desempenho', estaLogado, (req, res) => {
    db.sequelize.query('SELECT COUNT(*) FROM tarefas WHERE email = :email', { replacements: { email: req.session.logado.email }, type: QueryTypes.SELECT }).then((quantidade) => {
        var total = quantidade[0]['COUNT(*)']
        db.sequelize.query('SELECT COUNT(*) FROM tarefas WHERE now() < data AND email = :email', { replacements: { email: req.session.logado.email }, type: QueryTypes.SELECT }).then((quantidade) => {
            var marcada = quantidade[0]['COUNT(*)']
            db.sequelize.query('SELECT COUNT(*) FROM tarefas WHERE now() >= data AND situacao = "Realizada" AND email = :email', { replacements: { email: req.session.logado.email }, type: QueryTypes.SELECT }).then((quantidade) => {
                var realizada = quantidade[0]['COUNT(*)']
                db.sequelize.query('SELECT COUNT(*) FROM tarefas WHERE now() >= data AND situacao = "Pendente" AND email = :email', { replacements: { email: req.session.logado.email }, type: QueryTypes.SELECT }).then((quantidade) => {
                    var pendente = quantidade[0]['COUNT(*)']
                    if (total != 0) {
                        marcada_p = (marcada / total) * 100;
                        realizada_p = (realizada / total) * 100;
                        pendente_p = (pendente / total) * 100;
                    }
                    res.render('usuario/desempenho', { marcada_p: parseFloat(marcada_p.toFixed(2)), realizada_p: parseFloat(realizada_p.toFixed(2)), pendente_p: parseFloat(pendente_p.toFixed(2)), total: total, marcada: marcada, realizada: realizada, pendente: pendente })
                }).catch((erro) => {
                    res.redirect('/')
                })
            }).catch((erro) => {
                res.redirect('/')
            })
        }).catch((erro) => {
            res.redirect('/')
        })
    }).catch((erro) => {
        res.redirect('/')
    })
})

router.get('/login', (req, res) => {
    res.render('usuario/login')
})

router.post('/login', (req, res) => {
    Usuario.findOne({ where: { email: req.body.email } }).then((usuario) => {
        if (usuario) {
            bcrypt.compare(req.body.senha, usuario.senha, (erro, igual) => {
                if (igual) {
                    req.session.logado = usuario
                    res.redirect('/')
                } else {
                    req.flash('error_msg', 'Email e/ou senha incorretos!')
                    res.redirect('/login')
                }
            })
        } else {
            req.flash('error_msg', 'Email e/ou senha incorretos!')
            res.redirect('/login')
        }
    }).catch((erro) => {
        req.flash('error_msg', 'Ocorreu um erro inesperado!')
        res.redirect('/login')
    })
})

router.get('/logout', estaLogado, (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

router.get('/cadastrar', (req, res) => {
    res.render('usuario/cadastrar')
})

router.post('/cadastrar', (req, res) => {
    Usuario.findOne({ where: { email: req.body.email } }).then((usuario) => {
        if (usuario) {
            req.flash('error_msg', 'Você já está cadastrado! Que tal fazer login?')
            res.redirect('/cadastrar')
        } else {
            const novoUsuario = new Usuario({
                email: req.body.email,
                nome: req.body.nome,
                senha: req.body.senha
            })

            bcrypt.genSalt(10, (erro, salt) => {
                bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                    if (erro) {
                        req.flash('error_msg', 'Ocorreu um erro inesperado!')
                        res.redirect('/cadastrar')
                    } else {
                        novoUsuario.senha = hash
                        novoUsuario.save().then(() => {
                            req.flash('success_msg', 'Você foi cadastrado com sucesso! Que tal fazer login?')
                            res.redirect('/cadastrar')
                        }).catch((erro) => {
                            req.flash('error_msg', 'Ocorreu um erro durante o seu cadastro!')
                            res.redirect('/cadastrar')
                        })
                    }
                })
            })

        }
    }).catch((erro) => {
        req.flash('error_msg', 'Ocorreu um erro inesperado!')
        res.redirect('/')
    })
})

module.exports = router
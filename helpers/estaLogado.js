module.exports = {
    estaLogado: function(req, res, next){
        if(req.session.logado != null){
            return next()
        } else{
            res.redirect('/login')
        }
    }
}
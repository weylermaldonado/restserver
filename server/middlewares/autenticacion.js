const jwt = require('jsonwebtoken');


let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token,'secret', (err,decoded) => {
        if(err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token inválido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

let verificaRol = (req,res,next) => {

    let usuario = req.usuario;
    
    if(usuario.role === 'ADMIN_ROLE') {
       next();
    }
    else {
        return res.status(500).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
}

module.exports = {
    verificaToken,
    verificaRol
}
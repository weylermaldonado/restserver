const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req,res) => {

    let body = req.body;
    Usuario.findOne({email: body.email}, (err,userDB)=> {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!userDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }
        if (!bcrypt.compareSync(body.password, userDB.password) ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Contraseña incorrectos'
                }
            });
        }


        let token = jwt.sign({
            usuario: userDB
        },'secret',{expiresIn: 60 * 60 * 24 * 30});

        res.json({
            ok: true,
            usuario: userDB,
            token
        });

    });
    
});


module.exports = app;
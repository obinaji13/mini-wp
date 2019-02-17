const { User } = require('../models')
const { comparePass, sign, verify } = require('../helpers')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports = {
    verifyToken(req, res) {
        let { token } = req.body
        try {
            let decoded = verify(token)
            User
                .findOne({email: decoded.email})
                .then(user => {
                    if (user) {
                        res.status(200).json(user)
                    } else {
                        res.status(400).json({msg: 'user not found'})
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        msg: 'internal server error',
                        err: err
                    })
                })
        } catch(err) {
            console.log(err);
            res.status(500).json({
                msg: 'internal server error',
                err: err
            })
        }
    },
    register(req, res) {
        let data = JSON.parse(req.body.data)
        let newUser = {
            name: data.name,
            email: data.email,
            password: data.password
        }
        if (req.file) {
            newUser.picture = req.file.cloudStoragePublicUrl
        }
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'internal server error',
                    err: err
                })
            })
    },
    login(req, res) {
        User
            .findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    if (comparePass(req.body.password, user.password)) {
                        let token = sign({email: user.email})
                        res.status(200).json({token})
                    } else {
                        res.status(400).json({
                            msg: "wrong email / password"
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: "wrong email / password"
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'internal server error',
                    err: err
                })
            })
    },
    googleLogin(req, res) {
        let payload = {}
        client.verifyIdToken(({
            idToken: req.body.token,
            audience: process.env.CLIENT_ID
        }))
        .then(ticket => {
            payload = ticket.getPayload()
            return User.findOne({email: payload.email})
        })
        .then(user => {
            if (user) {
                let token = sign({email: user.email})
                res.status(200).json({token})
            } else {
                let newUser = {
                    name: payload.name,
                    email: payload.email,
                    picture: payload.picture,
                    password: 'google'
                }
                User
                    .create(newUser)
                    .then(user => {
                        let token = sign({email: user.email})
                        res.status(201).json({user, token})
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: 'internal server error',
                err: err
            })
        })
    },
}
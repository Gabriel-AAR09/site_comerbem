const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { use } = require('../routes/authRoutes')

module.exports = class AuthController {

    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {

        const {email, password} = req.body

        // find user
        const user = await User.findOne({where: {email: email}})

        if(!user) {
            req.flash('message', 'Usuário não encontrado!')
            res.render('auth/login')

            return
        }

        // Check if passwords match
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch) {
            req.flash('message', 'Senha inválida!')
            res.render('auth/login')

            return
        }

        // initialize session
        req.session.userid = User.id

        req.flash('message', 'Autenticação realizada com sucesso!')
        //criar um pagina de agradecimento do cadastro

        req.session.save(() => {
            res.redirect('./home')
        })
    
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { id, firstname, lastname, email, password, Confirmpassword, gender } = req.body

        // password match validation
        if(password != Confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')

            return
        }

        // check if user exists
        const checkIfUserExists = await User.findOne({where: {email: email}})
        if(checkIfUserExists) {
            req.flash('message', 'O e-mail já está em uso!')
            res.render('auth/register')

            return
        }

        // create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            id,
            firstname,
            lastname,
            email,
            password: hashedPassword,
            gender
        }

        try {
            const createdUser =await User.create(user)

            // initialize session
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')
            //criar um pagina de agradecimento do cadastro

            req.session.save(() => {
                res.redirect('./home')
            })
        } catch (err) {
            console.log(err)
        }
    }

    static logout(req, res) {

        req.session.destroy()
        res.redirect('./home')
    }
}
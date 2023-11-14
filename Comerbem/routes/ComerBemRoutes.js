const express = require("express")
const router = express.Router()


router.get('/home', (req, res) => {
    res.render("./home")
})

router.get('/receitas', (req, res) => {
    res.render("./receitas")
})

router.get('/sobre_nós', (req, res) => {
    res.render("./home")
})

module.exports = router
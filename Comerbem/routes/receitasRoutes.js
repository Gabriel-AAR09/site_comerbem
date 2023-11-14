const express = require("express")
const router = express.Router()

router.get('/receita', (req, res) => {
    res.render("./receitas/receita01")
})

router.get('/receita02', (req, res) => {
    res.render("./receitas/receita02")
})


module.exports = router
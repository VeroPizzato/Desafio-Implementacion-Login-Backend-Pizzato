const { Router } = require('express')
const User = require('../dao/models/user')

const router = Router()

// router.get('/', (req, res) => {

//     if (req.session.counter) {
//         req.session.counter++
//         return res.send(`Esta es su visita nro. ${req.session.counter}`)
//     }

//     req.session.counter = 1
//     res.send('Bienvenido! Esta es su primer visita!')
// })

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    // 1. verificar que el usuario exista en la BD
    const user = await User.findOne({ email, password })
    if (!user) {
        return res.status(400).send('Invalid email or password!')
    }

    // 2. crear nueva sesión si el usuario existe
    req.session.user = { id: user._id.toString(), email: user.email }
    res.redirect('/')
})

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, age, password } = req.body

    try {
        await User.create({
            firstName,
            lastName,
            age: +age,
            email,
            password
        })

        res.redirect('/')
    }
    catch (err) {
        console.log(err)
        res.status(400).send('Error creating user!')
    }
})



module.exports = router
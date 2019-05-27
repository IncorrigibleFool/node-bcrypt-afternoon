require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authCtrl')
const treasureCtrl = require('./controllers/treasureCtrl')
const auth = require('./middleware/authMiddleware')

const PORT = 4000
const{CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()

//middleware
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('Database connected.')
})

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)

//listener
app.listen(PORT, ()=> {
    console.log(`Listening on port: ${PORT}`)
})

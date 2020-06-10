require('dotenv').config()
const massive = require('massive')
const express = require('express')
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const app = express()
const ctrl = require('./ctrl/controller')

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7 }
}))

app.post('/api/auth/register', ctrl.registerUser)
app.post('/api/auth/login', ctrl.loginUser)
app.get('/api/post/:postid', ctrl.getPost)
app.get('/api/posts', ctrl.getPosts)
app.post('/api/post', ctrl.createPost)
app.delete(`/api/post/:postid`, ctrl.deletePost)


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db bruh')
    app.listen(SERVER_PORT, () => console.log(`server activated port ${SERVER_PORT}`))
})
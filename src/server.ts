import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(__dirname, '../.env')
})

import cors from 'cors'
import express from 'express'
import { engine } from 'express-handlebars'
import session from 'express-session'
import cookieParser from 'cookie-parser'

// Routers
import authRoute from './routes/auth.routes'
import adminRoute from './routes/admin.routes'
import apiRoutes from './routes/api.routes'

import authMiddleware from './security/auth.middleware'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET!,
    proxy: true,
    resave: true,
    saveUninitialized: true
}))

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './pages')

app.use(authMiddleware)

app.use('/auth', authRoute)
app.use('/admin', adminRoute)
app.use('/api', apiRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
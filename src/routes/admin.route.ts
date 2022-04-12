import { Router } from "express";
import { nanoid } from "nanoid";
import Token from "../model/token.model";
import User, { Role } from "../model/user.model";
import userStorage from "../storage/user.storage";
import jwt from 'jsonwebtoken'
import { JwtData } from "../security/jwt.data";
import tokenStorage from "../storage/token.storage";


const router = Router()

router.get('/', (req, res) => res.redirect('/admin/token'))

router.get('/token', async (req, res) => {
   let tokens = await tokenStorage.allTokens()
   res.render('token', { tokens })
})

router.post('/token', async (req, res) => {
   let { app } = req.body
   let user = new User(
      0,
      nanoid(),
      nanoid(),
      Role.User
   )

   let id = await userStorage.addUser(user)

   let data: JwtData = { userId: id, role: user.role, username: user.username }
   let jwtToken = jwt.sign(data, process.env.JWT_SECRET!)

   let token = new Token(0, id, app, jwtToken)
   await tokenStorage.addToken(token)

   res.redirect('/admin')
})

export default router
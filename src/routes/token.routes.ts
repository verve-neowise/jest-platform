// create router   
// Language: typescript
import { Router } from "express";
import { nanoid } from "nanoid";
import User, { Role } from "../model/user.model";
import userStorage from "../storage/user.storage";
import jwt from 'jsonwebtoken'
import { JwtData } from "../security/jwt.data";
import tokenStorage from "../storage/token.storage";
import Token from "../model/token.model";

// router
const router = Router()

router.get('/', async (req, res) => {
   let tokens = await tokenStorage.allTokens()
   res.render('token', { tokens })
})

// delete token route
router.get('/remove/:id', async (req, res) => {
   let id = +req.params.id
   await tokenStorage.removeToken(id)
   res.redirect('/admin/token')
})

router.post('/', async (req, res) => {
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

   res.redirect(req.baseUrl)
})

export default router
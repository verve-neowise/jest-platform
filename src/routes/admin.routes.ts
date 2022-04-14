import { Router } from "express";

// import token routes
import tokenRoute from "./token.routes";
// import test routes
import testRoute from "./test.routes";
import resultStorage from "../storage/result.storage";
import tokenStorage from "../storage/token.storage";
import { verify } from "../security/auth.middleware";

const router = Router()

// use token routes
router.use('/token', tokenRoute)
// use test routes
router.use('/tests', testRoute)

// get results by token
router.get('/results/:id', async (req, res) => {
   let id = +req.params.id
   let token = await tokenStorage.findToken(id)
   let results = await resultStorage.allResults(token.user_id)

   res.render('results', { app: token.app, results })
})

router.get('/', (req, res) => {
   res.render('admin')
})

export default router
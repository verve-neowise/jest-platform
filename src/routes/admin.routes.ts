import { Router } from "express";

// import token routes
import tokenRoute from "./token.routes";
// import test routes
import testRoute from "./hb_test.routes";

const router = Router()

// use token routes
router.use('/token', tokenRoute)
// use test routes
router.use('/tests', testRoute)

router.get('/', (req, res) => {
   res.render('admin')
})

export default router
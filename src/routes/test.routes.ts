// import router
import { Router } from 'express';
import Test from '../model/test.model';
import Variant from '../model/variant.model';
import testStorage from '../storage/test.storage';

// create router
const router = Router();

// get all hb_tests
router.get('/', async (req, res) => {
    // get all tests and save to variable
    let tests = await testStorage.allTests()

    console.log(tests);

    res.render('tests', { tests })
});

// post new hb_test
router.post('/', async (req, res) => {

    // log body
    let { option_a, option_b, option_c, option_d, question, answer } = req.body;

    // create variants with options
    let variants = [
        new Variant(-1, -1, option_a),
        new Variant(-1, -1, option_b),
        new Variant(-1, -1, option_c),
        new Variant(-1, -1, option_d)
    ]
    // change variant with correct answer
    variants[answer].isRight = true;

    // create test
    let test = new Test(-1, question, variants);
    // save test
    await testStorage.addTest(test);

    res.redirect(req.baseUrl)
})

// get remove by id 

router.get('/remove/:id', async (req, res) => {
    // get id from url as number
    let id = +req.params.id;
    // delete test  
    await testStorage.removeTest(id);
    // redirect to tests
    res.redirect(req.baseUrl)
})

// export router
export default router;
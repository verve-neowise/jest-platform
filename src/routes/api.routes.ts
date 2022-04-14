// create routes
// Language: typescript
// Path: src/routes/api.routes.ts
//
import { Router } from 'express';
import testStorage from '../storage/test.storage';
import resultStorage from '../storage/result.storage';
import Result from '../model/result.model';

const router = Router();

// post results
router.post('/results', async (req, res) => {
    // get user id from token
    let userId = req.payload.userId
    // send result to storage
    await resultStorage.addResult(new Result(
        0,
        userId,
        req.body.username,
        req.body.count,
        req.body.of,
        new Date().toISOString()
    ))
    res.sendStatus(200)
});


// get all results
router.get('/results', async (req, res) => {
    // get user id from token
    let userId = req.payload.userId
    // get all results by user id
    let results = await resultStorage.allResults(userId)
    res.send(results)
});

// get all tests
router.get('/tests', async (req, res) => {
    let tests = await testStorage.allTests()
    // create random array with 10 elements
    let random = randomArray(1, 10, 10)
    // get random tests
    let randomTests = tests.filter((test, index) => random.includes(index))
    res.send(randomTests)
})

// random array generator range
function randomArray(min: number, max: number, count: number) {
    let arr = []
    for (let i = 0; i < count; i++) {

        let num = Math.floor(Math.random() * (max - min + 1)) + min
        arr.push(num)
    }
    return arr
}

export default router;
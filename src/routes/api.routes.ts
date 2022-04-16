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
    let result = shuffle(await testStorage.allTests())
        .slice(0, 10)
        .map(test => {
            // shuffle variants
            test.variants = shuffle(test.variants)
            return test
        })

    res.json(result)
})

// shuffle array
function shuffle(array: any[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export default router;
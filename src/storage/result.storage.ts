// create result storage
// Language: typescript
// Path: src/storage/result.storage.ts

import storage from "./storage";
import Result from "../model/result.model";

// add result
async function addResult(result: Result) {
    let sql = 'INSERT INTO results (user_id, username, count, of, date) VALUES ($1, $2, $3, $4, $5);'
    await storage.run(sql, [result.userId, result.username, result.count, result.of, result.date])
}

// get all results by user id
async function allResults(userId: number) {
    
    let sql = 'select * from results where user_id = $1;'
    let rows = await storage.all<any>(sql, [userId])

    return rows.map(row => {
        return new Result(
            row.id,
            row.user_id,
            row.username,
            row.count,
            row.of,
            row.date
        )
    })
}

export default {
    addResult,
    allResults
}
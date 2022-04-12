import Token from "../model/token.model";
import storage from "./storage";


async function addToken(token: Token) {
    let sql = 'INSERT INTO tokens (user_id, app, token) values ($1, $2, $3);'
    await storage.run(sql, [token.user_id, token.app, token.token])
}

async function allTokens() {
    let sql = 'SELECT * FROM tokens;'
    let rows: any[] = await storage.all(sql)
    return rows.map((row) => new Token(
        row.id,
        row.user_id,
        row.app,
        row.token
    ))
}

async function removeToken(id: number) {
    let sql = 'DELETE FROM tokens WHERE id=$1'
    await storage.run(sql, [id])
}

export default {
    allTokens,
    removeToken,
    addToken
}
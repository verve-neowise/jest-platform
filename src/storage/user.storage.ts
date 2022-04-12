import User from "../model/user.model";
import storage from "./storage";
import bcrypt from 'bcryptjs'


async function addUser(user: User) {

    let query = 'INSERT INTO users (username, password, role) values($1, $2, $3) RETURNING id'
    let hashedPassword = bcrypt.hashSync(user.password, 10)

    let row: any = await storage.get(query, [
        user.username,
        hashedPassword,
        user.role
    ])

    return row.id as number
}

async function removeUser(id: number) {
    let query = 'DELETE FROM users WHERE id = $1'
    await storage.run(query, [id])
}

async function findUser(username: string): Promise<User> {
    let query = 'SELECT * FROM users WHERE username = $1'
    let data = await storage.get(query, [username])
    return mapUser(data)!
}

async function allUsers() {
    let query = 'SELECT * FROM users'
    let datas = await storage.all(query)
    return datas.map(mapUser)
}

function mapUser(data: any): User | undefined {
    return data ? new User(
        data.id,
        data.username,
        data.password,
        data.role
    ) : undefined
}

export default {
    addUser,
    removeUser,
    findUser,
    allUsers
}
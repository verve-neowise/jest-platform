export enum Role {
    User = 'user',
    Admin = 'admin'
}

export default class User {

    readonly id: number
    readonly username: string
    readonly password: string
    readonly role: Role

    constructor(
        id: number,
        username: string,
        password: string,
        role: Role = Role.User
    ) {
        this.id = id
        this.username = username
        this.password = password
        this.role = role
    }
}
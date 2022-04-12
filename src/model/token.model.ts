export default class Token {
    id: number
    user_id: number
    app: string
    token: string

    constructor(
        id: number,
        user_id: number,
        app: string,
        token: string
    ) {
        this.id = id
        this.user_id = user_id
        this.app = app
        this.token = token
    }
}
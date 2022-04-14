// create result model
export default class Result {
    readonly id: number
    readonly userId: number
    readonly username: string
    readonly count: number
    readonly of: number
    readonly date: string

    constructor(
        id: number,
        userId: number,
        username: string,
        count: number,
        of: number,
        date: string
    ) {
        this.id = id
        this.userId = userId
        this.username = username
        this.count = count
        this.of = of
        this.date = date
    }
}


export default class Variant {

    readonly id: number
    readonly testId: number
    readonly content: string
    isRight: boolean

    constructor(
        id: number,
        testId: number,
        content: string,
        isRight: boolean = false
    ) {
        this.id = id
        this.testId = testId
        this.content = content
        this.isRight = isRight
    }
}
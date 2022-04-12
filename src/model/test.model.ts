import Variant from "./variant.model"

export default class Test {

    readonly id: number
    readonly question: string
    variants: Variant[]

    constructor(
        id: number,
        question: string,
        variants: Variant[]
    ) {
        this.id = id
        this.question = question
        this.variants = variants
    }
}
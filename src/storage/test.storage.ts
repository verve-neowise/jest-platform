import Test from "../model/test.model";
import Variant from "../model/variant.model";
import storage from "./storage";

async function addTest(test: Test) {
    let sql = 'INSERT INTO tests (question) VALUES($1) RETURNING id;'
    let rows = await storage.get<Test[]>(sql, [test.question])
    let id = rows[0].id

    for (const variant of test.variants) {
        await addVariant(id, variant)
    }
}

async function allTests(): Promise<Test[]> {
    let sql = 'select * from tests;'
    let rows = await storage.all<any>(sql)

    let variants = await getVariants()

    let tests = rows.map(row => {
        return new Test(
            row.id,
            row.question,
            variants.filter(v => v.id == row.id)
        )
    })

    return tests
}

async function addVariant(id: number, variant: Variant) {
    let sql = 'INSERT INTO variants (test_id, content, is_right) VALUES ($1, $2, $3);'    
    await storage.run(sql, [id, variant.content, variant.isRight])
}

async function getVariants() : Promise<Variant[]> {
    let sql = 'select * from variants;'
    let rows = await storage.all<any>(sql)

    return rows.map(row => 
        new Variant(
            row.id,
            row.test_id,
            row.content,
            row.is_right
        )
    )
}

export default {
    addTest,
    allTests
}
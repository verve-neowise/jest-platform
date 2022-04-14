import Test from "../model/test.model";
import Variant from "../model/variant.model";
import storage from "./storage";

async function addTest(test: Test) {
    // insert test and return id
    let sql = 'INSERT INTO tests (question) VALUES ($1) RETURNING id;'

    let row = await storage.get<Test>(sql, [test.question])
    console.log(row);
    
    let id = row.id

    console.log(test.variants);

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
            variants.filter(v => v.testId == row.id)
        )
    })

    return tests
}

async function addVariant(id: number, variant: Variant) {
    let sql = 'INSERT INTO variants (test_id, content, is_right) VALUES ($1, $2, $3);'    
    await storage.run(sql, [id, variant.content, variant.isRight])
}

// remove all tests
async function removeAllTests() {
    let sql = 'DELETE FROM tests;'
    await storage.run(sql, [])
}

// remove test by id
async function removeTest(id: number) {
    let sql = 'DELETE FROM tests WHERE id = $1;'
    await storage.run(sql, [id])
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
    allTests,
    removeAllTests,
    removeTest
}
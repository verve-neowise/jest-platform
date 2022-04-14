// create 10 sample tests
// Language: typescript
// Path: src/model/tests.ts

// setup dotenv to use .env file from root
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(__dirname, '../.env')
})


import Test from "./model/test.model";
import Variant from "./model/variant.model";

let tests = [
    new Test(
        1,
        "Какой язык программирования используется для создания приложений на платформе Android?",
        [
            new Variant(1, 1, "Java"),
            new Variant(2, 1, "C#"),
            new Variant(3, 1, "C++"),
            new Variant(4, 1, "Python")
        ]
    ),
    new Test(
        2,
        "Какой из перечисленных вариантов не является правильным ответом на вопрос?",
        [
            new Variant(1, 2, "В программировании на С++ используется оператор вызова метода"),
            new Variant(2, 2, "В программировании на С++ используется оператор вызова метода"),
            new Variant(3, 2, "В программировании на С++ используется оператор вызова метода"),
            new Variant(4, 2, "В программировании на С++ используется оператор вызова метода")
        ]
    ),
    new Test(
        3,
        "Какой из перечисленных вариантов не является правильным ответом на вопрос?",
        [  
            new Variant(1, 3, "В программировании на С++ используется оператор вызова метода"),
            new Variant(2, 3, "В программировании на С++ используется оператор вызова метода"),
            new Variant(3, 3, "В программировании на С++ используется оператор вызова метода"),
            new Variant(4, 3, "В программировании на С++ используется оператор вызова метода")
        ]
    )
]

// add all tests to test storage
import testStorage from "./storage/test.storage";

// add array of tests in for to test storage use async/await
async function addTests(tests: Test[]) {
    for (let test of tests) {
        await testStorage.addTest(test)
    }
}

addTests(tests)




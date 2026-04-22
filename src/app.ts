import express from 'express'
const app = express()
import ("../src/todo/todoController.js")

app.set("view engine","ejs")

export default app
import express from "express";

const app = express();
const PORT = 3000;

app.get('/',(req,res) => {
    res.send("Servidor rolando")
})

app.listen(PORT, () => {
    console.log("Servidor rodando na porta 3000")
})

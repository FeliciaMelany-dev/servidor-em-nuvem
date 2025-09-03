import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json())

let users = [];

app.get('/users',(req,res) => {
    res.json(users);
    
})
app.post('/users', (req,res) => {
    const newUser = { 
        user: req.body.email,
        password: req.body.password,
    };
    users.push(newUser)
    res.status(201).json({mensagem: "Criado com sucesso!"})
})
app.put('user/id', (req,res) =>{
    const usersUp = 
})

app.listen(PORT, () => {
    console.log("Servidor rodando na porta 3000")
})

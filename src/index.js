import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(express.json())

let users = [];

app.get('/users',(req,res) => {
    res.json(users);
    
})
app.get('/users/:id', (req,res) =>{
    res.json(users);
})
app.post('/users', (req,res) => {
    const id = uuidv4()
    const newUser = { 
        id: id,
        user: req.body.email,
        password: req.body.password,
    };

    users.push(newUser)
    res.status(201).json({mensagem: "Criado com sucesso!"})
})
app.put('/users/:id', (req,res) =>{
    const usersUp = req.params.id;
    const findUsers = users.find( u => u.id === usersUp)
    if(!findUsers){
        return res.status(404)

    }
    res.status(201).json({messagem: 'Atualizado com sucesso'});
    
    
})
app.patch('/users/:id', (req,res) => {
    const userId = req.params.id
    const findId = users.find( u => u.id === userId)
    if(!findId) {
        return res.status(404).json
    }
    return res.status(201).json({mensagem: 'Usuário atualizado'})
})

app.delete('/users/:id', (req,res) =>{
    const usersId = req.params.id;
    const findusers = users.find( u => u.id === usersId)
    if(usersId){
        users.splice(usersId, 1);
        return res.status(200).json ({messagem:'Usuário apagado'})
    }
    return res.status(404).json({menssagem:'Usuário não encontrado'})
})

app.listen(PORT, () => {
    console.log("Servidor rodando na porta 3000")
})

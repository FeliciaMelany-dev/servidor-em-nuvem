import express from "express";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ||3000;

app.use(express.json())

let users = [];

app.get('/users',(req,res) => {
    res.json(users);
    
})
app.get('/users/:id', (req,res) =>{
    const listaUser = req.params.id;
    const listausers = users.find(u => u.id === listaUser)
    if(!listausers){
        return res.status(404).json({menssagem:'Usuário não encontrado'})
    }
    res.json(listausers);
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
    const findUsers = users.findIndex( u => u.id === usersUp);
    if(findUsers === -1){
        return res.status(404)

    }
    const usersUpDois = {
       ...users[findUsers],
       user: req.body.email || users[findUsers].user,
       password: req.body.password || users[findUsers].password
    }

    users.splice(findUsers, 1, usersUpDois);
    res.status(200).json({mensagem: 'Atualizado com sucesso', user: usersUpDois});
    
    
})
app.patch('/users/:id', (req,res) => {
    const userId = req.params.id
    const findId = users.findIndex( u => u.id === userId);
    if(findId === -1) {
        return res.status(404).json({mensagem:'Usuário não encontrado'})
    }
    const usersUpPatch = {
       ...users[findId],
       user: req.body.email || users[findId].user,
       password: req.body.password || users[findId].password
    }
    users.splice(findId, 1, usersUpPatch)
    return res.status(200).json({mensagem: 'Usuário atualizado', user: usersUpPatch})
})

app.delete('/users/:id', (req,res) =>{
    const usersId = req.params.id;
    const findusers = users.findIndex( u => u.id === usersId)

    if(findusers === -1){
        return res.status(404).json({mensagem:'Usuário não encontrado'})
    }
     users.splice(findusers, 1);
        return res.status(200).json ({mensagem:'Usuário apagado'})
    
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

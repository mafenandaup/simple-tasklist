import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()
const appTodo = express();

appTodo.use(express.json()); // Middleware para interpretar JSON no corpo das requisições
appTodo.use(cors())

appTodo.get('/todolist', async (req, res) => {

    const tasklist = await prisma.task.findMany()

    res.status(200).json(tasklist)

});

appTodo.post('/todolist', async (req, res) => {

    await prisma.task.create({ //nome do modelo. o AWAIT vem de requisições assincronas
        data: {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            completed: false,

        }
    })
    res.status(201).json(req.body)
});

appTodo.put('/todolist/:varID', async (req, res) => { //os dois pontos indicam uma variável
   
    await prisma.task.update({ 
        where: {
            id: req.params.id
        },
        data: {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,

        }
    })
    res.status(201).json(req.body)
});

appTodo.patch('/todolist/:varID', async (req, res) => {
    try {
        const updatedTask = await prisma.task.update({
            where: { id: req.params.varID },
            data: { completed: req.body.completed },
        });
        res.status(200).json(updatedTask); // Retorna a tarefa atualizada
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar a tarefa' });
    }
});

appTodo.delete('/todolist/:varID', async (req, res) => {

    try{
        await prisma.task.delete({
            where: {
                id: req.params.varID
            },
        });
        res.status(200).json({ message: 'usuário deletado com sucesso' })
    }catch(error){
        res.status(500).json({ message: 'erro ao deletar usuário' })
    }
})

appTodo.listen(3000, () => {});



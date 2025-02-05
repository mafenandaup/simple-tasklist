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


        }
    })
    res.status(201).json(req.body)
});

appTodo.put('/todolist/:varID', async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, completed } = req.body;
    try {
        const task = await prisma.task.update({
            where: { id },
            data: { title, description, priority, completed },
        });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
    }
});

appTodo.delete('/todolist/:varID', async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.task.delete({
        where: { id },
      });
      res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir tarefa.' });
    }
  });

appTodo.listen(3000, () => {

});


// ACESSO AO BANCO DE DADOS VIA PRISMA.SCHEMA(mongodb)
//user: mafenandaup
//pword: jSZ9ywvil4njIENY


// PASSOS PARA CRIAÇÃO DE API

// fazer folder da api e baixar o node
//  npm init -y
// criar arquivo server.js
// npm i express
// importar as bibliotecas EM ORDEM!! nesse caso, o express vem primeiro
//no "package.json", embaixo de 'version', escrever "type; "module",
// criar uma const app = express
// criando uma rota (GET, POST/CRIAR, PATCH/EDITARUM, PUT/EDITARGERAL DELETE)

// NO PLANO DO BACKEND, ANTES DO SCHEMA:

// appTodo.get('/todolist', (req, res) => {

//    res.send('ok deu bom')

// });

//

//NO REACT:

//app.tipoderota('/enderecodarota', async (req, res) => {
//     const tasklist = await prisma.task.findMany() //task é o nome do modelo.

//     res.status(200).json(tasklist)

// });

// depois inserir  appTodo.listen(3000, () => {});

// baixar thunderclient pra testes nos métodos/rotas

//criar uma const = users[] pra depois substituir no BD

// pra rota post:
////app.post('/enderecodarota', async (req, res) => {
//    users.push(req.body) //users é o nome da const risos

//     res.send('deu bom')
// });

// escrever app.use(Express.json()) pra indicar ao express que a gente ta usando json
//mandar infos do usuário no json body/thunder client (apenas pra prototipo)

//fica dando post e get pra testar os métodos

// PASSOS P REACT:


//  npm create vite@latest (biblioteca do react) - react - javascript
// npm i (p/instalar bibliotecas)
// dentro do main.jsx só se deve deixar o componente app
//deleta tudo dentro do app.jsx e deixa só uma div

//  FAZER FUNÇÃO const com os dados dos usuários, exemplo:

//function Tasktab() {

// const tasks = [
//     {
//       id: '38392993',
//       title: 'helllo tarefa',
//       description: 'essa aqui é minha descrição',
//       dueDate: new Date(2025, 0, 30, 10, 0), // Ano, mês (0-11), dia, hora, minuto
//       // representa 30 de janeiro de 2025 às 10:00.
//       priority: 1,
//     },
//     {
//       id: '38392994',
//       title: 'segunda tarefa',
//       description: 'outra descrição',
//       dueDate: new Date(), // Data e hora atual
//       priority: 2,
//     },
//   ];



// a div que vc for colocar as informações precisa de uma key: EXEMPLO:
//
//    {tasks.map((tarefinha) => (
//             <div key={tarefinha.id} className="task-display">
//               <h3>{tarefinha.title}</h3>
//               <p>{tarefinha.description}</p>
//               <p className='priority-text'>Prioridade {tarefinha.priority}</p>
//               <p>Vence em {tarefinha.dueDate.toLocaleDateString()}</p>
//               <div className='check-delete'>
//                 <button className='trash-icon'>
//                   <img src={Trashcan} alt="trash" />
//                 </button>
//                 <button className='complete-icon'>
//                   <img src={Check} alt="complete task" />
//                 </button>
//               </div>
//             </div>
//           ))}
//
// tasks é o nome da const/função que fizemos antes.
// LOGO APÓS, INSTALAR AXIOS e criar nova pasta "services",
// não é boa prática deixar o áxios no meio de tudo. criar arquivo api.js na pasta
//pra conectar o backend
//usar o useeffect do react para completar a função get, pq senão não aparece nada
//copiar e colar snippet do react de outros projetos KK

//
//   useEffect(() => { //tudo que tiver aqui dentro executa quando a pag. abrir
//     getTasks()
//   }, []);

//inspecionar site e abrir aba "network", depois selecionar "fetch XHR"
//instalar cors NO BACK (porque o front e back esão em portas diferentes.)
// usar reacthook (useRef)
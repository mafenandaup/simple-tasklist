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
    await prisma.task.update({
            where: {
                id: req.params.varID
            },
            data: {
                completed: true  // Atualiza apenas os campos enviados no corpo da requisição
            }
        });
        res.status(200).json(updatedTask);
});

appTodo.delete('/todolist/:varID', async (req, res) => {
    await prisma.task.update({ 
        where: {
            id: req.params.id
        },
    })
    res.status(200).json({ message: 'usuário deletado com sucesso'})
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

//criar continha no mongo.db, seja com github ou gmail, no caso como tenho cadastro da no mesmo
// escolha um plano gratis e dé um nome pro seu DB (tag é opcional)
//crie o usuário e senha do seu banco pra guardar no seu code

//no overwiew, va em network acess e edite para acessar qualquer ip, depois,
//va em database acess e se coloque como admin

//INSTALANDO O PRISMA:
//npm install prisma --save-dev
// npx prisma init

// NO ENV, COLOCAR O LINK DO DB la no mongo

// no site do mongo vai em database e clica em connect\drivers\node
// copie o código do mongo e cole seu user, senha e nome do DB no link
// DATABASE_URL="mongodb+srv://mafenandaup:jSZ9ywvil4njIENY@dbtasks.nb85r.mongodb.net/DBtasks?retryWrites=true&w=majority&appName=DBtasks"

// conecte seu DB, copiando e colando isso no prisma:
// //datasource db {
//     provider = "mongodb"
//     url      = env("DATABASE_URL")
//   }
  
// vai na documentação do prisma (site) e escolhe um modelo pra criar/se inspirar
// depois de criado, coloque npx prisma db push no terminal
// npm install @prisma/client

// ai vc pode acessar npx prisma studio
// importe o prisma client no inicio do projeto:

// import { PrismaClient } from '@prisma/client'
//const prisma = new PrismaClient()

// atualize as rotas do jeito que estão aqui, só que, obviamente, adaptando pro seu modelo.

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
// dentro do main.jsx só se deve deixar o componente (no caso, o app.jsx)
//deleta tudo dentro do app.jsx e deixa só uma div
//com antes o return!!
//antes do return, é aonde ficarão todas as suas funções
//deixar só o import do css
//o index.css são os estilos globais pra TODAS as oags
//creiar folder pages, depois criar folder com o nome da sua pag
//importar arquivos index.jsx e style.css pra dentro da pasta
//editar nome da função "app", nos imports e exports
// de app css vai pra style css
//dentro da function home criamos o html

//depois de criar o html, voce deve "mapear" o array
//no caso, o array está dentro da função task.
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
// //       {tasks.map((task) => (
//      <div key={task.id}>
// {/* <h3>{task.title}</h3>
// <p>{task.description}</p>
// <p className='priority-text'>Prioridade {task.priority}</p>
// <div className='check-delete'>
//   <button className='trash-icon' onClick={() => deleteTask(task.id)}>
//     <img src={Trashcan} alt='Excluir' />
//   </button>
//   {!task.completed && (
//     <button className='complete-icon' onClick={() => completeTask(task.id)}>
//       <img src={Check} alt='Completar' />
//     </button>
//   )}
// </div>
// </div> */}
// ))}
// </section>
// </main>
// </div>
// );
//
// tasks é o nome da const/função que fizemos antes.

// LOGO APÓS, INSTALAR AXIOS e criar nova pasta "services",
// não é boa prática deixar o áxios no meio de tudo. criar arquivo api.js na pasta
//pra conectar o backend

//dentro do arquivo api.js:
// import axios from 'axios'

// const api = axios.create({

//     baseURL: 'http://localhost:3000'
// })

// export default api

//import api from '../../services/api' no index.js
//depois disso, apagar função getusers
// mudar a função const users[] para let users[]


//importar useffect no index jsx
//usar o useeffect do react para completar a função get, pq senão não aparece nada
//copiar e colar snippet do react de outros projetos KK

//
//   useEffect(() => { //tudo que tiver aqui dentro executa quando a pag. abrir
//     getTasks()
//   }, []);

//ERRO CORS (coisas não aparecem na tela)

//inspecionar site e abrir aba "network", depois selecionar "fetch XHR"
//instalar cors NO BACK (porque o front e back esão em portas diferentes.)
//npm install cors
// import cors from 'cors'
//appTodo.use(cors()) qq pág pode acessar, no caso empresarial deixaria o endereço certinho.


// usar reacthook USESTATE:

//const [tasks, setTasks] = useState([]); // Estado inicial para armazenar os dados
// //: insere o nome da váriavel e depois setvariavel
// pra alterar o valor de tasks, você precisa executar o settasks

// async function getTasks() {
//     const tasksFromApi = await api.get('/todolist');
//     setTasks(tasksFromApi.data); // Atualiza o estado com as tarefas
//   }

// usar reacthook (useRef) para a criação de usuários.
//pra cada um dos inputs, vc cria um useref

//  const inputTitle = useRef()
// const inputDesc = useRef()

// e ai dem cada elemento input correspondente (HTML), você coloca o elemento associado
//usando 'ref', como por exemplo:
// <input type='text' placeholder='Título (EX: Estudos de X...)'ref={inputTitle}/>

//pra createtasks:
//await api.post('/todolist', {
//     title,
//     description,
//     priority,
//     completed: false,
//   });
//  no documento do react eu coloquei uma const pra representar os dados, mas isso é só por causa da função
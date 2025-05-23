import './style.css'
import Trashcan from '../../assets/trashcan.png'
import Check from '../../assets/check.png'
import api from '../../services/api'
import { useState, useEffect, useRef } from 'react';


function Tasktab() {
  const [tasks, setTasks] = useState([]); // Estado inicial para armazenar as tarefas
  const [priority, setPriority] = useState(1); // Estado para a prioridade da tarefa
  const inputTitle = useRef()
  const inputDesc = useRef()

  async function getTasks() {
    const tasksFromApi = await api.get('/todolist');
    setTasks(tasksFromApi.data); // Atualiza o estado com as tarefas
  }


  async function createTasks() {
    //verifica campos preenchidos
    const title = inputTitle.current.value.trim();
    const description = inputDesc.current.value.trim();

    if (!title || !description) {
      window.alert('Por favor, preencha todos os campos antes de criar a tarefa.');
      return;
    }
    const { data } = await api.post('/todolist', {
      title: inputTitle.current.value,
      description,
      priority,
      completed: false,
    });
    setTasks((prevTasks) => [...prevTasks, data]);
    resetData();
  }

  function resetData() {
    inputTitle.current.value = '';
    inputDesc.current.value = '';
    setPriority(1);
    getTasks();
  }

  async function deleteTask(id) {
    try {
      await api.delete(`/todolist/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);
    }
  }

  async function completeTask(id, currentStatus) {
    try {
      // Alterna o estado de `completed`
      const updatedTask = await api.patch(`/todolist/${id}`, {
        completed: !currentStatus,
      });

      // Atualiza o estado local das tarefas
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: updatedTask.data.completed } : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o status da tarefa:', error);
    }
  }

  // Função para lidar com mudança de prioridade
  function handlePriorityChange(event) {
    setPriority(Number(event.target.value)); // Atualiza o estado com o valor selecionado
  }


  useEffect(() => {
    getTasks(); // Chama a função ao carregar a página
  }, []);

  return (
    <div className='main-container'>
      <header>
        <h1>TaskManager</h1>
      </header>
      <main>
        <section className='task-create'>
          <h2>Criação de Nova Tarefa</h2>
          <form>
            <input
              type='text'
              placeholder='Título (EX: Estudos de X...)'
              className='task-text'
              ref={inputTitle}
            />
            <div className='task-priority'>
              <p>Prioridade da tarefa</p>
              <div>
                {[1, 2, 3].map((level) => (
                  <label key={level}>
                    <input
                      type='radio'
                      name='priority'
                      value={level}
                      onChange={handlePriorityChange}
                      checked={priority === level}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
            <div className='task-description'>
              <p>Descrição da tarefa</p>
              <textarea
                placeholder='EX: Fazer coisa X...'
                className='task-text'
                ref={inputDesc}
              ></textarea>
            </div>
            <div className='button-area'>
              <button type='button' onClick={createTasks}>Criar Tarefa</button>
              <button type='reset' onClick={resetData}>Limpar Formulário</button>
            </div>
          </form>
        </section>
        <section className='task-listagem'>
          <h1>Tarefas em Andamento</h1>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-display ${task.completed ? 'completed' : ''}`}
            >
              <h3 className={task.completed ? 'line-through' : ''}>{task.title}</h3>
              <p className={task.completed ? 'line-through' : ''}>{task.description}</p>
              <p className='priority-text'>Prioridade {task.priority}</p>
              <div className='check-delete'>
                <button
                  className='complete-icon'
                  onClick={() => completeTask(task.id, task.completed)}
                >
                  <img src={Check} alt='Completar' />
                </button>
                <button
                  className='trash-icon'
                  onClick={() => deleteTask(task.id)}
                >
                  <img src={Trashcan} alt='Excluir' />
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Tasktab

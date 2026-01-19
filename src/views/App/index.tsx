import React from 'react';
import { useToDoStore } from '../../data/stores/useToDoStore';
import { InputPlus } from '../components/InputPlus';
import { InputTask } from '../components/InputTask';
import styles from './index.module.scss';
import { Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';


export const App: React.FC = () => {
  // App — React-компонент 
  // // React.FC — тип функционального компонента 
  // // Дай мне из стора массив задач
  const createTask = useToDoStore(state => state.createTask);
  const updateTask = useToDoStore(state => state.updateTask);
  const removeTask = useToDoStore(state => state.removeTask);
  const changeStatus = useToDoStore(state => state.changeStatus);
  const tasks = useToDoStore(state => state.tasks);
  const deletedTasks=useToDoStore(state=>state.deletedTasks);
  const restoreTask=useToDoStore(state=>state.restoreTask);
// сортировка задач
  const [sortType, setSortType] = React.useState<'date' | 'alphabet'>('date');
// setSortType — функция, которая меняет sortType, когда пользователь нажимает кнопку.
  const sortTasks = (tasks: any[]) => {
    return [...tasks].sort((a, b) => {
      if (sortType === 'date') {
        // Сортировка по дате создания (новые сверху)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return a.title.localeCompare(b.title, 'ru');
      // сортировка по алфавиту
    });
  };
// разделение задач по колонкам
  const todoTasks = sortTasks(
    tasks.filter(task => task.status === 'to do')
  );
// filter проходит по всему массиву // оставляет только те элементы, для которых условие true
  const inProgressTasks = sortTasks(
    tasks.filter(task => task.status === 'in progress')
  );

  const doneTasks = sortTasks(
    tasks.filter(task => task.status === 'done')
  );
  // состояние корзины
const [isTrashOpen, setIsTrashOpen] = React.useState(false);
// isTrashOpen — true, если корзина открыта, false — скрыта.
// setIsTrashOpen — функция для переключения состояния.
  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do List</h1>

      <InputPlus
        onAdd={(title) => {
          if (title) {
            createTask(title);
          }
        }}
      />
      {/* InputPlus — это компонент, который позволяет добавлять новые задачи */}
      {/* onAdd — это prop (свойство компонента). 
      // Ты передаёшь в InputPlus: // onAdd — это функция, которую InputPlus будет вызывать, когда пользователь добавляет задачу */}

      <div className={styles.sortButtons}>
  <button
    className={styles.sortButton}
    onClick={() => setSortType('date')}
  >
    По дате
  </button>

  <button
    className={styles.sortButton}
    onClick={() => setSortType('alphabet')}
  >
    По алфавиту
  </button>
</div>

      {!tasks.length && (
        <p className={styles.articleText}>There is no one task.</p>
      )}
      <DragDropContext
      onDragEnd={(result) => {
        // Этот коллбэк вызывается после завершения перетаскивания
    if (!result.destination) return;

    const newStatus = result.destination.droppableId as
      | 'to do'
      | 'in progress'
      | 'done';
// Меняем статус задачи на статус колонки, в которую бросили
    changeStatus(result.draggableId, newStatus);
  }}
>
  <div className={styles.board}>

    {/* TODO */}
    <Droppable droppableId="to do">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className={styles.column}>
          <h2>Надо сделать</h2>

          {todoTasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <InputTask
                    id={task.id}
                    title={task.title}
                    onEdited={updateTask}
                    onRemoved={removeTask}
                    onChangeStatus={changeStatus}
                  />
                </div>
              )}
            </Draggable>
          ))}
{/* Placeholder нужен для правильного места при перетаскивании */}
          {provided.placeholder}
        </div>
      )}
    </Droppable>

    {/* IN PROGRESS */}
    <Droppable droppableId="in progress">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className={styles.column}>
          <h2>В работе</h2>

          {inProgressTasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <InputTask
                    id={task.id}
                    title={task.title}
                    onEdited={updateTask}
                    onRemoved={removeTask}
                    onChangeStatus={changeStatus}
                  />
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>

    {/* DONE */}
    <Droppable droppableId="done">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className={styles.column}>
          <h2>Сделано</h2>

          {doneTasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <InputTask
                    id={task.id}
                    title={task.title}
                    onEdited={updateTask}
                    onRemoved={removeTask}
                    onChangeStatus={changeStatus}
                  />
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>

  </div>
</DragDropContext>
<section className={styles.TrashSection}> 
  <h5
   style={{ cursor: 'pointer' }}
   onClick={() => setIsTrashOpen(prev => !prev)} // стрелочная функция, которая выполняется при клике. 
   // переключение видимости корзины
   > 
   Корзина {isTrashOpen ? '▼' : '►'} 
   </h5> 
   {isTrashOpen && (
    <div className={styles.TrashContent}>
    {deletedTasks.length === 0 && <p>Корзина пуста</p>} 
   {deletedTasks.map(task => ( 
    <div key={task.id} className={styles.deletedTask}> 
    {task.title} {/* Выводим название задачи, которое хранится в объекте task */} 
   {/* Кнопка Material UI */} 
   <Button 
   aria-label="Restore" 
   variant="contained" 
   onClick={() => restoreTask(task.id)} 
   sx={{ 
    textTransform: 'none', // без капс 
   borderRadius: '5px', // скругление 
   padding: '6px 12px', // отступы 
   backgroundColor: '#9abee1ff',// твой цвет 
   '&:hover': 
   { 
    backgroundColor: '#196fc5ff' 
    }
    }}
    >
    Восстановить 
    </Button> 
    </div> 
    ))}  
     </div>
   )}
   </section>
    </article>
  );
}

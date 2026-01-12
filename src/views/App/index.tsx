import React from 'react';
import {useToDoStore} from '../../data/stores/useToDoStore';
import {InputPlus} from '../components/InputPlus'
import {InputTask} from '../components/InputTask'
import styles from './index.module.scss';
export const App: React.FC=() => {
//     App — React-компонент
// React.FC — тип функционального компонента

const tasks = useToDoStore(state => state.tasks); 
const todoTasks = tasks.filter(task => task.status === 'to do')
const inProgressTasks = tasks.filter(task => task.status === 'in progress')
const doneTasks = tasks.filter(task => task.status === 'done')

// Дай мне из хранилища массив задач
const createTask = useToDoStore(state => state.createTask);
const updateTask = useToDoStore(state => state.updateTask);
const removeTask = useToDoStore(state => state.removeTask);
const changeStatus = useToDoStore(state => state.changeStatus);

// UseToDoStore -хук для доступа к zustand store
// возвращает данные из него;
// state => [...]
// Это селектор.
// Ты говоришь:
// «Дай мне из стора только вот это»
    return(
        <article className={styles.article}>
            <h1 className={styles.articleTitle}> To Do List </h1>
            <section className={styles.articleSection}>
         {/* добавление задач */}
            <InputPlus
            onAdd={(title)=>{
//                 onAdd — это prop (свойство компонента).
// Ты передаёшь в InputPlus:
// onAdd — это функция, которую InputPlus будет вызывать, когда пользователь добавляет задачу
                if(title){
                    createTask(title)
                }
            }}
            />
            </section>
            <section className={styles.articleSection}>
  {!tasks.length && (
    <p className={styles.articleText}>There is no one task.</p>
  )}
 <div className={styles.board}>
    <div className={styles.column}>
    <h2>Надо сделать</h2>
    {todoTasks.map(task => (
        <InputTask
        key={task.id}
        id={task.id}
        title={task.title}
        onDone={removeTask}
        onEdited={updateTask}
        onRemoved={removeTask}
        onChangeStatus={changeStatus}
        />
    ))}
    </div>

<div className={styles.column}>
  <h2>В работе</h2>
  {inProgressTasks.map(task => (
    <InputTask
      key={task.id}
      id={task.id}
      title={task.title}
      onDone={removeTask}
      onEdited={updateTask}
      onRemoved={removeTask}
      onChangeStatus={changeStatus}
    />
  ))}
  </div>

<div className={styles.column}>
  <h2>Сделано</h2>
  {doneTasks.map(task => (
    <InputTask
      key={task.id}
      id={task.id}
      title={task.title}
      onDone={removeTask}
      onEdited={updateTask}
      onRemoved={removeTask}
      onChangeStatus={changeStatus}
    />
  ))}
  </div>
  </div>
</section>
        </article>)
}
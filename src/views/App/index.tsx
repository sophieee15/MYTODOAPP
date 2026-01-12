import React from 'react';
import {useToDoStore} from '../../data/stores/useToDoStore';
import {InputPlus} from '../components/InputPlus'
import {InputTask} from '../components/InputTask'
import styles from './index.module.scss';
export const App: React.FC=() => {
//     App — React-компонент
// React.FC — тип функционального компонента

const tasks = useToDoStore(state => state.tasks); 
// Дай мне из хранилища массив задач
const createTask = useToDoStore(state => state.createTask);
const updateTask = useToDoStore(state => state.updateTask);
const removeTask = useToDoStore(state => state.removeTask);
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
                 {/* //список обновленных задач */}
                {!tasks.length &&(
                    <p className={styles.articleText}>There is no one task.</p>
//                     Массив пустой → покажет «There is no one task»
// Массив не пустой → ничего не покажет
                )}
{tasks.map((task)=>(
    <InputTask
//     <InputTask ... />
// Это компонент React
// Для каждой задачи в массиве мы создаём отдельный компонент <InputTask>
    key={task.id}
//     key — обязательный prop для элементов списка в React
// React использует его, чтобы правильно обновлять/удалять элементы при ререндере
    id={task.id}
    title={task.title}
    onDone={removeTask}
    onEdited={updateTask}
    onRemoved={removeTask}
//     id и title → данные задачи, которые нужны компоненту <InputTask>
// onDone, onEdited, onRemoved → функции, которые компонент вызывает, когда что-то происходит

/>
))}
                </section> 

           
              

        </article>
    );
}

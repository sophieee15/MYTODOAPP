import React from 'react';
import { useToDoStore } from '../../data/stores/useToDoStore';
import { InputPlus } from '../components/InputPlus';
import { InputTask } from '../components/InputTask';
import styles from './index.module.scss';

export const App: React.FC = () => {
  // App — React-компонент 
  // // React.FC — тип функционального компонента 
  // // Дай мне из хранилища массив задач
  const createTask = useToDoStore(state => state.createTask);
  const updateTask = useToDoStore(state => state.updateTask);
  const removeTask = useToDoStore(state => state.removeTask);
  const changeStatus = useToDoStore(state => state.changeStatus);
  const tasks = useToDoStore(state => state.tasks);

  const [sortType, setSortType] = React.useState<'date' | 'alphabet'>('date');
// setSortType — функция, которая меняет sortType, когда пользователь нажимает кнопку.
  const sortTasks = (tasks: any[]) => {
    return [...tasks].sort((a, b) => {
      if (sortType === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return a.title.localeCompare(b.title, 'ru');
      // сортировка по алфавиту
    });
  };

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
      {/* InputPlus — это компонент, который позволяет добавлять задачи */}
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

      <div className={styles.board}>
        <div className={styles.column}>
          <h2>Надо сделать</h2>
          {todoTasks.map(task => (
            <InputTask
              key={task.id}
              id={task.id}
              title={task.title}
              onDone={() => changeStatus(task.id, 'done')}
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
              onDone={() => changeStatus(task.id, 'done')}
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
              onDone={() => {}}
              onEdited={updateTask}
              onRemoved={removeTask}
              onChangeStatus={changeStatus}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

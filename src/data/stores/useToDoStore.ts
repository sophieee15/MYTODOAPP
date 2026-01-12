import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId } from './helpers'

/**
 * Описание одной задачи
 */
type TaskStatus='to do' | 'in progress' | 'done';
interface Task {
  id: string           // уникальный id задачи
  title: string        // текст задачи
  createdAt: number   
//  время создания 
  status:TaskStatus
}

/**
 * Описание всего стора
 * (что в нём хранится и какие есть функции)
 */
interface ToDoStore {
  tasks: Task[]                                // массив задач
  createTask: (title: string) => void          // добавить задачу(это тип функции)
  updateTask: (id: string, title: string) => void // изменить задачу
  removeTask: (id: string) => void     
  changeStatus:(id:string, status:TaskStatus) => void         // удалить задачу
}

/**
 * Создаём store zustand
 */
export const useToDoStore = create<ToDoStore>()(
  /**
   * persist — готовый middleware zustand
   * Он автоматически:
   * - сохраняет состояние в localStorage
   * - загружает его при перезагрузке страницы
   */
  persist(
    /**
     * Основное состояние стора
     */
    (set, get) => ({
      /**
       * Начальное состояние
       * Если в localStorage уже есть данные —
       * persist подставит их сам
       */
      tasks: [],

      /**
       * Создание новой задачи
       */
      createTask: (title) => {
        const newTask: Task = {
          id: generateId(),     // уникальный id
          title,                // текст задачи
          createdAt: Date.now(),
          status:'to do', // текущее время
        };

        /**
         * set обновляет состояние стора
         * ВАЖНО:
         * - мы НЕ мутируем массив
         * - создаём новый массив
         */
        set({
          tasks: [newTask, ...get().tasks],
        })
      },

      /**
       * Редактирование задачи
       */
      updateTask: (id, title) => {
        set({
          tasks: get().tasks.map(task =>
            task.id === id
              ? { ...task, title } // если id совпал — меняем title
              : task               // иначе оставляем как есть
          ),
        })
      },

      /**
       * Удаление задачи
       */
      removeTask: (id) => {
        set({
          tasks: get().tasks.filter(task => task.id !== id),
        })
      },
    changeStatus:(id,status)=>{
        set({
            tasks: get().tasks.map(task=>
                // get() — это получить текущее состояние стора
// 👉 .tasks — взять массив всех задач
                task.id===id
                ?{...task, status}
//                 ...task → скопировать всю задачу
// status → заменить ТОЛЬКО статус
                :task
            ),
        })
    },
}),
    

    /**
     * Настройки persist
     */
    {
      name: 'tasks-storage', // ключ в localStorage
    }
  )
)

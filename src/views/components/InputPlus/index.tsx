import React, {useState,useCallback} from 'react';
import styles from './index.module.scss';
interface InputPlusProps{
    onAdd:(title:string)=>void;
}
// Компонент InputPlus обязан получить функцию onAdd,
// которая принимает строку и ничего не возвращает
export const InputPlus: React.FC<InputPlusProps>=({
    onAdd,
})=>{
//     InputPlus — имя компонента
// React.FC<InputPlusProps> — тип компонента
// { onAdd } — деструктуризация пропсов
    const [inputValue,setInputValue]=useState('');
    //     Это внутреннее состояние компонента.
// inputValue — текущий текст в input
// setInputValue — функция для изменения текста
// '' — начальное значение (пусто)
// 📌 Это НЕ zustand, это состояние ТОЛЬКО этого компонента.
 const addTask=useCallback(()=>{
        onAdd(inputValue);
        setInputValue('');
    },[inputValue]);
    // добавить задачу и очистить input
// useCallback мемоизирует функцию, чтобы она не создавалась заново при каждом рендере, если inputValue не поменялся
// Функция делает:
// вызывает onAdd(inputValue) → добавляет задачу в store
// очищает поле ввода (setInputValue(''))
    return(
        <div className={styles.inputPlus}>
            <input 
            type="text"
            className={styles.inputPlusValue}
            value={inputValue}
            onChange={(evt)=>{
                setInputValue(evt.target.value);
            }}
            onKeyDown={(evt)=>{
            if(evt.key==='Enter'){
                addTask();
            }
        }}
        placeholder='Type here...'
        // если нажали Enter, вызывается addTask()
            />
{/* //             1️⃣ Пользователь печатает
// 2️⃣ Срабатывает onChange
// 3️⃣ evt.target.value — новый текст
// 4️⃣ setInputValue(...) обновляет state
// 5️⃣ React делает рендер
// 6️⃣ input показывает новый текст
             */}
            <button
            onClick={addTask}
            aria-label="Add"
            // aria-label — это атрибут для элементов HTML, который задаёт текстовое описание для людей с ограниченными возможностями, использующих скринридеры.

            className={styles.inputPlusButton}
            />
            </div>
                )
                };
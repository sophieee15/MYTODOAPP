import React, {useState,useRef,useEffect} from 'react';
import styles from './index.module.scss';
interface InputTaskProps{
    id:string;
    title:string;
    onDone:(id:string)=>void;
    // функция при клике на галочку
    onEdited:(id:string,title:string)=>void;
    onRemoved:(id:string)=>void;

    
}

export const InputTask: React.FC<InputTaskProps>=({
    id,
    title,
    onDone,
    onEdited,
    onRemoved
})=>{
//     InputPlus — имя компонента
// React.FC<InputPlusProps> — тип компонента
// { onAdd } — деструктуризация пропсов
    const [checked,setChecked]=useState(false);
    // хранит: поставлена галочка или нет
    const [isEditMode,setIsEditMode]=useState(false);
//     isEditMode ← текущее значение
// setIsEditMode ← функция для изменения
const [value,setValue]=useState(title);
//     value — текст внутри input
// setValue — меняет текст, когда пользователь печатает
const editTitleInputRef=useRef<HTMLInputElement>(null);
useEffect(()=>{
    if(isEditMode){
        editTitleInputRef?.current?.focus();
    }

},[isEditMode]
    );
    return(
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                type="checkbox"
                disabled={isEditMode}
                // Если сейчас режим редактирования — выключи чекбокс
                checked={checked}
                // галочка зависит от состояния checked
                className={styles.inputTaskCheckbox}
                onChange={(evt)=>{
                    setChecked(evt.target.checked);
                    // evt.target.value = то, что пользователь сейчас ввёл в поле
                    if(evt.target.checked){
                        onDone(id);
                    }
                }}
                />
{ isEditMode ? (
    <input
    value={value}
    ref={editTitleInputRef}
    onChange={(evt)=>{
        setValue(evt.target.value);
    }}
    onKeyDown={(evt) =>{
        if(evt.key==='Enter'){
            onEdited(id,value);
            setIsEditMode(false);
        }
    }}
    className={styles.inputTaskEditTitle}
    />
):(
<h3 className={styles.inputTaskTitle}>{title}</h3>
)}
            </label>
            {isEditMode ?(
                <button
            aria-label="Save"
            className={styles.inputTaskSave}
            onClick={()=>{
                onEdited(id,value);
                setIsEditMode(false);
            }}
            />
        ):(
            <button
            aria-label="Edit"
            className={styles.inputTaskEdit}
            onClick={()=>{
                setIsEditMode(true);
            }}
            />
        )}
<button
            aria-label="Remove"
            className={styles.inputTaskRemove}
            onClick={()=>{
                if(confirm('Are you sure?')){
                onRemoved(id);
                }
            }}
//             вызывается onRemoved(id)
// в App это removeTask(id)
// задача удаляется
            />
            </div>
            )
        };
             
// Этот файл запускает React-приложение, подключает стили и говорит React:
// «Вот здесь рендерь мой App»
import { StrictMode } from 'react'
// StrictMode — это специальный режим только для разработки.
// Он:
// ищет потенциальные ошибки
// может дважды вызывать функции
// предупреждает о плохих практиках
import { createRoot } from 'react-dom/client'
import { App } from './views/App/index'
import './views/styles/reset.scss'
import './views/styles/common.scss'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
    </StrictMode>,
    )
//     <App /> твой компонент ToDo
// <StrictMode> — обёртка для проверки ошибок
// 📌 React начинает строить UI из App
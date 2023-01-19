import './styles/global.css'
import { Habit } from './components/Habit'

export function App() {
  return (
    <>
      <Habit completed={3} />
      <Habit completed={5} />
      <Habit completed={7} />
      <Habit completed={9} />
    </>
  )
}

//componente é reaproveitar/isolar
// propriedades é uma informação enviada para modificar um componente visual ou comportamental

//componente nada mais é do q uma forma de eu conseguir reaproveitar um pedaço de codigo

interface HabitProps {
  completed: number
}

export function Habit(props: HabitProps) {
  return (
    <div className="bg-zinc-900 w-10 h-10 text-white rounded m-2 flex items-center justify-center">
      {props.completed}{' '}
    </div>
  )
}

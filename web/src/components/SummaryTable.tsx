const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
export function SumarryTable() {
  return (
    <div className="w-full flex">
      <div className="grid grid-row-7 grid-flow-row gap-3">
        <div className="text-zinc-400 text-xl h-10 w-10 font-bold items-center justify-center">
          {weekDays.map((weekDay, i) => {
            return (
              <div
                key={`${weekDay} -${i}`}
                className="text-zinc-400 text-xl h-10 w-10 font-bold items-center justify-center"
              >
                {weekDay}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

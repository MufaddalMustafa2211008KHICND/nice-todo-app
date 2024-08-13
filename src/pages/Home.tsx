import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function Home() {
  const [todo, setTodo] = useState('')
  const [todolist, setTodolist] = useState<string[]>([])

  const handleClick = () => {
    setTodolist([...todolist, todo])
  }

  return (
    <div>
      <div className="flex gap-4 m-4">
        <div className="flex gap-4 w-[400px]">
          <Input value={todo} onChange={(e) => setTodo(e.target.value)} />
          <Button onClick={handleClick}>Add</Button>
        </div>
        <div>
          <Button onClick={() => setTodolist([])} disabled={!todolist.length}>
            Empty
          </Button>
        </div>
      </div>
      <div className="m-4 pl-4 w-[400px] h-[400px] text-wrap break-words overflow-y-auto">
        <ul className="">
          {todolist.map((item) => (
            <li className="list-disc">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home

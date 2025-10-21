const { useState, useEffect } = React

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch (e) {
      return initial
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)) } catch (e) {}
  }, [key, state])
  return [state, setState]
}

function Header() {
  return (
    <header className="header">
      <h1>To Do App</h1>
      <p className="subtitle">Stay organized, stay productive</p>
    </header>
  )
}

function Stats({ todos }) {
  const total = todos.length
  const done = todos.filter(t=>t.done).length
  const active = total - done
  return (
    <div className="stats">
      <div className="card"><div className="num">{total}</div><div className="label">Total</div></div>
      <div className="card"><div className="num orange">{active}</div><div className="label">Active</div></div>
      <div className="card"><div className="num green">{done}</div><div className="label">Done</div></div>
    </div>
  )
}

function TodoInput({ onAdd }){
  const [text, setText] = useState('')
  function submit(e){
    e && e.preventDefault()
    const v = text.trim()
    if (!v) return
    onAdd({ id: Date.now(), text: v, done: false })
    setText('')
  }
  return (
    <form className="todo-input" onSubmit={submit}>
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="What needs to be done?" />
      <button type="submit">+ Add</button>
    </form>
  )
}

function TodoItem({ todo, onToggle, onDelete }){
  return (
    <div className={`todo-item ${todo.done ? 'done':''}`}>
      <label>
        <input type="checkbox" checked={todo.done} onChange={()=>onToggle(todo.id)} />
        <span className="text">{todo.text}</span>
      </label>
      <button className="del" onClick={()=>onDelete(todo.id)}>Delete</button>
    </div>
  )
}

function TodoList({ todos, filter, onToggle, onDelete }){
  const filtered = todos.filter(t=> filter==='all' ? true : filter==='active' ? !t.done : t.done)
  if (filtered.length===0) return (
    <div className="empty">
      <div className="emoji" role="img" aria-label="target">🎯</div>
      <h3>No todos yet</h3>
      <p>Add your first todo above!</p>
    </div>
  )
  return (
    <div className="todo-list">
      {filtered.map(t=> (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}

function App(){
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [filter, setFilter] = useLocalStorage('filter', 'all')

  function add(todo){ setTodos(prev=>[todo, ...prev]) }
  function toggle(id){ setTodos(prev=> prev.map(t=> t.id===id ? {...t, done: !t.done} : t)) }
  function del(id){ setTodos(prev=> prev.filter(t=>t.id!==id)) }

  return (
    <div className="container">
      <Header />
      <Stats todos={todos} />
      <TodoInput onAdd={add} />

      <div className="filter-row">
        <span>Filter by:</span>
        <div className="filters">
          <button className={filter==='all'?'active':''} onClick={()=>setFilter('all')}>All</button>
          <button className={filter==='active'?'active':''} onClick={()=>setFilter('active')}>Active</button>
          <button className={filter==='done'?'active':''} onClick={()=>setFilter('done')}>Completed</button>
        </div>
      </div>

      <TodoList todos={todos} filter={filter} onToggle={toggle} onDelete={del} />
    </div>
  )
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(React.createElement(App))

import { NavLink, useLocation } from 'react-router-dom'

const SideMenu = (): JSX.Element => {
  const { pathname } = useLocation()

  const isActive = (match: string | null | undefined) => {
    return match === pathname
  }

  return (
    <div className="containers">
      <h1 className="text-3xl text-white">Kanban App</h1>
      <NavLink
        to="/"
        className={`side-text ${isActive('/') ? 'bg-blue-400 text-blue-950' : 'text-white'}`}
      >
        <span className="material-icons icons">home</span>
        <p>Home</p>
      </NavLink>
      <NavLink
        to="/task-list"
        className={`side-text ${isActive('/task-list') ? 'bg-blue-400 text-blue-950' : 'text-white'}`}
      >
        <span className="material-icons icons">menu</span>
        <p>Task List</p>
      </NavLink>
      <NavLink
        to="/task-progress"
        className={`side-text ${isActive('/task-progress') ? 'bg-blue-400 text-blue-950' : 'text-white'}`}
      >
        <span className="material-icons icons">check_box</span>
        <p>Task Progress</p>
      </NavLink>
    </div>
  )
}

export default SideMenu

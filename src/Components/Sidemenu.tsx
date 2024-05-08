import { NavLink, useLocation } from 'react-router-dom'

const SideMenu = (): JSX.Element => {
  const { pathname } = useLocation()

  const isActive = (match: string | null | undefined) => {
    return match === pathname
  }

  return (
    <div className="containers">
      <NavLink to="/" className={`side-text ${isActive('/') ? 'text-blue-950' : 'text-white'}`}>
        <span className="material-icons icons">home</span>
        <p>Home</p>
      </NavLink>
      <NavLink
        to="/task-list"
        className={`side-text ${isActive('/task-list') ? 'text-blue-950' : 'text-white'}`}
      >
        <span className="material-icons icons">menu</span>
        <p>Task List</p>
      </NavLink>
      <NavLink
        to="/task-progress"
        className={`side-text ${isActive('/task-progress') ? 'text-blue-950' : 'text-white'}`}
      >
        <span className="material-icons icons">check_box</span>
        <p>Task Progress</p>
      </NavLink>
    </div>
  )
}

export default SideMenu

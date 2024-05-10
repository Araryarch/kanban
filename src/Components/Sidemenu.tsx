import { NavLink, useLocation } from 'react-router-dom'

const SideMenu = (): JSX.Element => {
  const { pathname } = useLocation()

  const isActive = (match: string | null | undefined) => {
    return match === pathname
  }

  return (
    <div className="containers">
      <div className="title flex items-center justify-center pb-5">
        <img src="/icon.png" alt="logo" width={70} />
        <h1 className="text-3xl text-white">Kanban App</h1>
      </div>
      <NavLink
        to="/"
        className={`side-text ${isActive('/') ? 'bg-[#eebbc3] text-[#0f0e17]' : 'text-white'}`}
      >
        <span className="material-icons icons">home</span>
        <p>Home</p>
      </NavLink>
      <NavLink
        to="/task-list"
        className={`side-text ${isActive('/task-list') ? 'bg-[#eebbc3] text-[#0f0e17]' : 'text-white'}`}
      >
        <span className="material-icons icons">menu</span>
        <p>Task List</p>
      </NavLink>
      <NavLink
        to="/task-progress"
        className={`side-text ${isActive('/task-progress') ? 'bg-[#eebbc3] text-[#0f0e17]' : 'text-white'}`}
      >
        <span className="material-icons icons">check_box</span>
        <p>Task Progress</p>
      </NavLink>
    </div>
  )
}

export default SideMenu

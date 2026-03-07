import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const SideMenu = (): JSX.Element => {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()

  const isActive = (match: string | null | undefined) => {
    return match === pathname
  }

  return (
    <div className="containers w-80">
      <div className="title mb-12 border-b border-slate-200 pb-8 dark:border-slate-800">
        <h1 className="text-3xl font-extralight tracking-widest text-slate-900 dark:text-white">
          KANBAN
        </h1>
        <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">Task Manager</p>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink
          to="/"
          className={`side-text ${
            isActive('/')
              ? 'border-slate-900 bg-slate-50 text-slate-900 dark:border-white dark:bg-slate-900 dark:text-white'
              : 'text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:text-slate-500 dark:hover:border-slate-700 dark:hover:text-white'
          }`}
        >
          <span className="material-icons icons">home</span>
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/task-list"
          className={`side-text ${
            isActive('/task-list')
              ? 'border-slate-900 bg-slate-50 text-slate-900 dark:border-white dark:bg-slate-900 dark:text-white'
              : 'text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:text-slate-500 dark:hover:border-slate-700 dark:hover:text-white'
          }`}
        >
          <span className="material-icons icons">list</span>
          <p>Tasks</p>
        </NavLink>
        <NavLink
          to="/task-progress"
          className={`side-text ${
            isActive('/task-progress')
              ? 'border-slate-900 bg-slate-50 text-slate-900 dark:border-white dark:bg-slate-900 dark:text-white'
              : 'text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:text-slate-500 dark:hover:border-slate-700 dark:hover:text-white'
          }`}
        >
          <span className="material-icons icons">dashboard</span>
          <p>Board</p>
        </NavLink>
      </nav>

      <div className="mt-auto space-y-6 border-t border-slate-200 pt-8 dark:border-slate-800">
        <button
          onClick={toggleTheme}
          className="side-text w-full text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:text-slate-500 dark:hover:border-slate-700 dark:hover:text-white"
          aria-label="Toggle theme"
        >
          <span className="material-icons icons">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
          <p>{theme === 'dark' ? 'Light' : 'Dark'}</p>
        </button>

        <a
          href="https://github.com/Araryarch/kanban"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border border-slate-300 bg-transparent p-4 transition-all duration-200 hover:border-slate-900 hover:bg-slate-900 dark:border-slate-700 dark:hover:border-white dark:hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="text-slate-900 transition-colors dark:text-white dark:hover:text-slate-900"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default SideMenu

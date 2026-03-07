import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from './contexts/ThemeContext'
import SideMenu from './Components/Sidemenu'
import TaskSummary from './features/tasks/Components/TaskSummary'
import TaskList from './features/tasks/Components/TaskList/TaskList'
import TaskProgress from './features/tasks/Components/TaskProgress/TaskProgress'

const App = () => {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex min-h-screen">
                  <SideMenu />
                  <TaskSummary />
                </div>
              }
            />
            <Route
              path="/task-list"
              element={
                <div className="flex min-h-screen">
                  <SideMenu />
                  <TaskList />
                </div>
              }
            />
            <Route
              path="/task-progress"
              element={
                <div className="flex min-h-screen">
                  <SideMenu />
                  <TaskProgress />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default App

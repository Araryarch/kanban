import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import SideMenu from './Components/Sidemenu'
import TaskSummary from './features/tasks/Components/TaskSummary'
import TaskList from './features/tasks/Components/TaskList/TaskList'

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex">
                <SideMenu />
                <TaskSummary />
              </div>
            }
          />
          <Route
            path="/task-list"
            element={
              <div className="flex">
                <SideMenu />
                <TaskList />
              </div>
            }
          />
          <Route
            path="/task-progress"
            element={
              <div className="flex">
                <SideMenu />
                <h1>Task Progress</h1>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App

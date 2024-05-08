import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SideMenu from './Components/Sidemenu'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex">
              <SideMenu />
              <h1>Home</h1>
            </div>
          }
        />
        <Route
          path="/task-list"
          element={
            <div className="flex">
              <SideMenu />
              <h1>Task List</h1>
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
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import Register from './components/Users/Register/Register'
import Login from './components/Users/Login/Login'
import Navbar from './components/Navigation/Navbar'
import AddNewCategory from './components/Categories/AddNewCategory'
import CategoryList from './components/Categories/CategoryList'
import UpdateCategory from './components/Categories/UpdateCategories'
import PrivateProtectRoute from './components/Navigation/ProtectedRoutes/PrivateProtectRoute'
import AdminRoute from './components/Navigation/ProtectedRoutes/AdminRoute'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/Posts/PostsList'
import PostDetails from './components/Posts/PostDetails'
import UpdatePost from './components/Posts/UpdatePost'
import Profile from './components/Users/Profile/Profile'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          exact
          path='/update-category/:id'
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
        <Route
          exact
          path='/update-post/:id'
          element={
            <PrivateProtectRoute>
              <UpdatePost />
            </PrivateProtectRoute>
          }
        />
        <Route
          exact
          path='/profile/:id'
          element={
            <PrivateProtectRoute>
              <Profile />
            </PrivateProtectRoute>
          }
        />
        <Route
          exact
          path='/create-post'
          element={
            <PrivateProtectRoute>
              <CreatePost />
            </PrivateProtectRoute>
          }
        />
        <Route
          exact
          path='/add-category'
          element={
            <AdminRoute>
              <AddNewCategory />
            </AdminRoute>
          }
        />
        <Route exact path='/posts' element={<PostsList />} />
        <Route exact path='/posts/:id' element={<PostDetails />} />
        <Route
          exact
          path='/category-list'
          element={
            <AdminRoute>
              <CategoryList />
            </AdminRoute>
          }
        />
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

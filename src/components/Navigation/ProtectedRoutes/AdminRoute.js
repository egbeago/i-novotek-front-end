import { useSelector } from 'react-redux'
import { Route, Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state?.users)
  const { userAuth } = user

  if (userAuth?.isAdmin) {
    return children
  }
  return <Navigate to='/login' />
}

export default AdminRoute

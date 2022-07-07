import React from 'react'

import { useSelector } from 'react-redux'
import AdminNavbar from './Admin/AdminNavbar'
import PrivateNavbar from './Private/PrivateNavbar'
import PublicNavbar from './Public/PublicNavbar'

function Navbar() {
  // get user from store
  const state = useSelector((state) => state.users)
  const { userAuth } = state
  const isAdmin = userAuth?.isAdmin
  // console.log(state)
  return (
    <>
      {isAdmin ? (
        <AdminNavbar />
      ) : userAuth ? (
        <PrivateNavbar />
      ) : (
        <PublicNavbar />
      )}
    </>
  )
}

export default Navbar

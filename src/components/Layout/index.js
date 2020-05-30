import React from 'react'

import './styles.css'

const Layout = ({ children }) => {
  return (
    <>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className="content">
        {children}
      </main>
    </>
  )
}

export default Layout

import React from 'react'
import { Link } from 'gatsby'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Switch from 'react-switch'
import { IconContext } from 'react-icons'
import { RiSunFill, RiMoonClearFill } from 'react-icons/ri'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  console.log(location.pathname)
  const isRootPath =
    location.pathname === rootPath || location.pathname === '/tech' || location.pathname === '/news'
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/" title={title}>
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/" title={title}>
        {title}
      </Link>
    )
  }

  return (
    <div>
      <div className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <a href="">
              <img src="/static/b0059e14d98bced5c806c552ae09b998/318fd/profile-pic.png"></img>
            </a>
          </div>
          <div className="menu">
            <ul>
              <li>
                <Link className="" to="/tech">
                  Tech
                </Link>
              </li>
              <li>
                <Link className="" to="/news">
                  News
                </Link>
              </li>
            </ul>
          </div>
          <div className="theme">
            <ThemeToggler>
              {({ theme, toggleTheme }) => (
                <Switch
                  onChange={(e) =>
                    toggleTheme(theme === 'dark' ? 'light' : 'dark')
                  }
                  checked={theme === 'dark'}
                  offColor="#b2dcf2"
                  onColor="#423090"
                  uncheckedIcon={
                    <IconContext.Provider
                      value={{ color: '#f4da87', className: 'theme-sun-icon' }}
                    >
                      <RiSunFill />
                    </IconContext.Provider>
                  }
                  checkedIcon={
                    <IconContext.Provider
                      value={{ color: '#e7eee5', className: 'theme-moon-icon' }}
                    >
                      <RiMoonClearFill />
                    </IconContext.Provider>
                  }
                />
              )}
            </ThemeToggler>
          </div>
        </div>
      </div>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <header className="global-header">{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://gatsby-starter-company-blog.netlify.app">
            Gatsby Starter Company Blog
          </a>
        </footer>
      </div>
    </div>
  )
}

export default Layout

import React, { useEffect, useState } from 'react';
import { useStaticQuery, Link } from 'gatsby'
import Image from "gatsby-image"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { RiSunFill, RiMoonClearFill } from 'react-icons/ri'

const Layout = ({ location, title, children }) => {
  const [currentOffsetY, setCurrentOffsetY] = useState(undefined);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffsetY = window.pageYOffset;      
      setCurrentOffsetY(currentOffsetY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const data = useStaticQuery(graphql`
    query LayoutQuery {
      logo: file(absolutePath: { regex: "/logo-pic.png/" }) {
        childImageSharp {
          fixed( height: 30, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
          }
          copyright
        }
      }      
    }
  `)

  const copyright = data.site.siteMetadata.copyright
  const author = data.site.siteMetadata.author
  const logo = data.logo.childImageSharp.fixed
  const rootPath = `${__PATH_PREFIX__}/`
  console.log(location.pathname)
  const isRootPath =
    location.pathname === rootPath || location.pathname === '/tech' || location.pathname === '/news'
  let navBarHeader
  let header

  if (isRootPath) {
    navBarHeader = (
      <h1 className="navbar-heading">
        {title}
        <Link to="/" title={title}>
          <Image
            fixed={logo}
            alt={author.name || ``}
          />
        </Link>
      </h1>
    )
  } else {
    navBarHeader = (
      <Link to="/" title={title}>
        {title}
        <Image
          fixed={logo}
          alt={author.name || ``}
        />
      </Link>
    )

    header = (
      <Link className="header-link-home" to="/" title={title}>
        {title}
      </Link>
    )
  }

  return (
    <div>
      <div className={"navbar " + (currentOffsetY ? 'navbar-sticky' : '')}>
        <div className="navbar-container">
          <div className="logo">
            { navBarHeader }
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
                <div>
                <input
                  id="toggle"
                  type="checkbox"
                  onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                  checked={theme === 'dark'}
                />{' '}
                <label for="toggle">
                  {theme === 'dark' 
                    ? <RiSunFill />                  
                    : <RiMoonClearFill />
                  }
                </label>
              </div>
              )}
            </ThemeToggler>
          </div>
        </div>
      </div>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://gatsby-starter-company-blog.netlify.app">
            {copyright}
          </a>
        </footer>
      </div>
    </div>
  )
}

export default Layout

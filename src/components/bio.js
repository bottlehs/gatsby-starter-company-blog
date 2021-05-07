/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRssSquare } from '@fortawesome/free-solid-svg-icons'
import {
  faGithubSquare,
  faInstagramSquare,
  faTwitterSquare,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons'

const Bio = ({ writer }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
            instagram
            twitter
            facebook
          }
        }
      }
    }
  `)

  console.log(writer)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata.author
  const social = data.site.siteMetadata.social
  const avatar = data.avatar.childImageSharp.fixed

  if (!writer) {
    writer = {}
    writer.name = author.name
  } else if (!writer.name) {
    writer.name = author.name
  }

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author.name && (
        <div>
          <p>
            Written by{' '}
            <Link to={'/'} className="bio-avatar-name">
              @{writer.name}
            </Link>{' '}
          </p>
          {author.summary && (
            <p className="bio-introduction">{author.summary}</p>
          )}
          <ul className="bio-social">
            <li>
              <a href={`/rss.xml`} target="_blank" class="social-icon-rss">
                <FontAwesomeIcon icon={faRssSquare} />
              </a>
            </li>
            {social.github && (
              <li>
                <a
                  href={social.github}
                  target="_blank"
                  class="social-icon-github"
                >
                  <FontAwesomeIcon icon={faGithubSquare} />
                </a>
              </li>
            )}
            {social.instagram && (
              <li>
                <a
                  href={social.instagram}
                  target="_blank"
                  class="social-icon-instagram"
                >
                  <FontAwesomeIcon icon={faInstagramSquare} />
                </a>
              </li>
            )}
            {social.twitter && (
              <li>
                <a
                  href={social.twitter}
                  target="_blank"
                  class="social-icon-twitter"
                >
                  <FontAwesomeIcon icon={faTwitterSquare} />
                </a>
              </li>
            )}
            {social.facebook && (
              <li>
                <a
                  href={social.facebook}
                  target="_blank"
                  class="social-icon-facebook"
                >
                  <FontAwesomeIcon icon={faFacebookSquare} />
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Bio

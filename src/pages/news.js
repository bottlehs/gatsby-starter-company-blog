import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

// Utilities
import kebabCase from 'lodash/kebabCase'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All news posts" />
        <p>
          No blog posts found. Add markdown posts to "content/posts" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All news posts" />
      <div className="post-list-contaner">
        <ol style={{ listStyle: `none` }}>
          {posts.map((post) => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url" title={title}>
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    {post.frontmatter.thumbnail && (
                      <div className="post-list-thumbnail">
                        <img src={post.frontmatter.thumbnail} alt="" />
                      </div>
                    )}
                    <div className="post-list-content">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                      {post.frontmatter.tags && (
                        <ul>
                          {post.frontmatter.tags.map((tag) => {
                            return (
                              <li key={tag}>
                                <a href={`/tags/${kebabCase(tag)}/`}>{tag}</a>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: "news" }, draft: { eq: false } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          category
          description
          tags
          thumbnail
          writer
        }
      }
    }
  }
`

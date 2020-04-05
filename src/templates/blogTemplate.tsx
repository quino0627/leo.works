import React from 'react'
import { graphql, Link } from 'gatsby'
import RehypeReact from 'rehype-react'

import Layout from 'Components/Layout'
import Utterances from 'Components/Utterances'
import SEO from 'Components/seo'
import styles from './blogTemplate.module.scss'
import {
  Heading,
  Paragraph,
  Quote,
  Horizon,
  Anchor,
  SuperScript,
  CodeBlock,
  OrderedList,
} from './content'

interface TemplateProps {
  data: any
}

const rehype = new RehypeReact({
    createElement: React.createElement,
    components: {
      h1: Heading,
      blockquote: Quote,
      hr: Horizon,
      sup: SuperScript,
      a: Anchor,
      p: Paragraph,
      pre: CodeBlock,
      ol: OrderedList,
    }
  }).Compiler


  export default function blogTemplate({
    data,
  }: TemplateProps) {
    const { markdownRemark } = data
    const { frontmatter: { title, date, author, path }, htmlAst } = markdownRemark

  return (
    <Layout>
      <SEO title={`Leo.works | ${title}`} />
      <div className={styles.postContainer}>
        <div className={styles.postMeta}>
          <div className={styles.postTitle}>
            {title}
          </div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className={styles.postAuthorWrapper}>
              <span>by </span>
              <span className={styles.postAuthor}>{author} </span>
            </div>
          </Link>
          <div className={styles.postDate}>
            {date}
          </div>
        </div>
        <div className={styles.content}>
          {rehype(htmlAst)}
        </div>
      </div>
      <Utterances repo="jwoo0122/leo.works"/>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMM DD, YYYY")
        path
        title
        author
      }
    }
  }
`

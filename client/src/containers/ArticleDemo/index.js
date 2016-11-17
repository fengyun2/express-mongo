import React from 'react'
import {Article} from 'react-weui'
import Page from 'COMPONENTS/page'
import iconSrc from './images/icon.png'

const ArticleDemo = (props) => {
  return (
    <Page className="article" title="Article" subTitle="文章列表页">
      <Article>
        <h1>H1 Heading</h1>
        <section>
          <h2 className="title">H2 Title</h2>
          <section>
            <h3>H3 Heading</h3>
            <p>
            long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...
            </p>
            <p>
              <img src={iconSrc} />
              <img src={iconSrc} />
            </p>
          </section>

          <section>
            <h3>H3 Heading</h3>
            <p>
            long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...long long ago...
            </p>
            <p>
              <img src={iconSrc} />
              <img src={iconSrc} />
            </p>
          </section>
        </section>
      </Article>
    </Page>
  )
}

export default ArticleDemo
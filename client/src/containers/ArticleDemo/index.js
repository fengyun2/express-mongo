import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import {fetchRequest} from '../../utils/fetch'
import {Article} from 'react-weui'
import Page from 'COMPONENTS/page'
import iconSrc from './images/icon.png'

class ArticleDemo extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      articles: []
    }
  }

  handleSubmit (e) {
    browserHistory.push('/add_user')
  }

  componentWillMount () {
    fetchRequest('http://localhost:3000/article/lists', {
      mode: 'cors'
    }).then(data => {
      console.log('获取数据成功', data.data)
      this.setState({articles: data.data})
    }).catch(err => {
      console.error('err >>>', err)
    })

    this.forceUpdate()
  }
  render() {
    let articleItem = ''
    if (!!this.state.articles) {
      const {articles} = this.state
      window.state = this.state
      articleItem = articles.map(item => <ArticleItem item={item} key={item._id} />)
    } else {
      articleItem = ''
    }
    return (
      <Page className="article" title="Article" subTitle="文章列表页">
        <Article>
          <h1>H1 Heading</h1>
          <section>
            <h2 className="title">H2 Title</h2>
            {articleItem}
          </section>
        </Article>
      </Page>
    )
  }
}

const ArticleItem = (props) => {
  const {item} = props
  return (
    <section>
      <h3>{item.title}</h3>
      <p>{item.sub_title}</p>
      <p>
        {item.content}
      </p>
      <p>
        {/* <img src={iconSrc} /> */}
      </p>
    </section>
  )
}

export default ArticleDemo

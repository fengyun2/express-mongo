import React, {Component} from 'react'
import './page.less'

export default class Page extends Component {
  render() {
    const {
      title,
      subTitle,
      spacing,
      className,
      children,
      footer
    } = this.props

    console.log(spacing)

    return (
      <section className={`page ${className}`}>
        <div className="page__hd">
          <h1 className="page__title">{title}</h1>
          <p className="page__desc">{subTitle}</p>
        </div>
        <div
          className={`page__bd ${spacing
          ? 'page__bd_spacing'
          : ''}`}>
          {children}
        </div>
        <div className="page__ft">
          {footer}
        </div>
      </section>
    )
  }
}
import React from 'react'
import {Tab, NavBarItem, Article} from 'react-weui'

const NavBarDemo = (props) => {
  return (
    <Tab type="navbar">
      <NavBarItem label="Nav1">
        <Article>
          <h1>Page1</h1>
          <section>
            <h2 className="title">Heading</h2>
            <section>
              <h3>1.1Title</h3>
              <p>测试文件</p>
            </section>
          </section>
        </Article>
      </NavBarItem>

      <NavBarItem label="Nav2">
        <Article>
          <h1>Page2</h1>
          <section>
            <h2 className="title">Heading</h2>
            <section>
              <h3>2.1Title</h3>
              <p>测试文件</p>
            </section>
          </section>
        </Article>
      </NavBarItem>

      <NavBarItem label="Nav3">
        <Article>
          <h1>Page3</h1>
          <section>
            <h2 className="title">Heading</h2>
            <section>
              <h3>3.1Title</h3>
              <p>测试文件</p>
            </section>
          </section>
        </Article>
      </NavBarItem>
    </Tab>
  )
}

export default NavBarDemo
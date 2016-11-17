import React from 'react'

import {
  Cells,
  CellsTitle,
  Cell,
  CellHeader,
  CellBody,
  CellFooter
} from 'react-weui'

import Page from 'COMPONENTS/page'

const CellDemo = (props) => {
  return (
    <Page className="cell" title="List" subTitle="列表">
      <CellsTitle>List with description</CellsTitle>
      <Cells>
        <Cell>
          <CellBody>
            Title
          </CellBody>
          <CellFooter>
            Description
          </CellFooter>
        </Cell>
      </Cells>

      <CellsTitle>List with Icon && description</CellsTitle>
      <Cells>
        <Cell>
          <CellHeader>
            <img src="http://cdn-img.easyicon.net/png/11372/1137264.gif"/>
          </CellHeader>
          <CellBody>
            Title
          </CellBody>
          <CellFooter>
            Description
          </CellFooter>
        </Cell>
        <Cell>
          <CellHeader>
            <img src="http://cdn-img.easyicon.net/png/11372/1137264.gif"/>
          </CellHeader>
          <CellBody>
            Title
          </CellBody>
          <CellFooter>
            Description
          </CellFooter>
        </Cell>
      </Cells>

      <CellsTitle>List with Link</CellsTitle>
      <Cells>
        <Cell href="javascript:;">
          <CellBody>
            Title
          </CellBody>
          <CellFooter />
        </Cell>
      </Cells>
    </Page>
  )
}

export default CellDemo
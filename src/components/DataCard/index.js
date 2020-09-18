import React from 'react'
import './index.scss'

const DataCard = props => {
  return (
    <div className={'col-md-' + props.size}>
      <div className='dataCard'>
        <h2>{props.name}</h2>
        <h3>
          {props.count} ({props.percentage})
        </h3>
      </div>
    </div>
  )
}

export default DataCard

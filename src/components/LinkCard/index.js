import React from 'react'
import './index.scss'

const LinkCard = props => {
  return (
    <div
      className={'col-md-' + props.size}
      onClick={() => (window.location.href = '/topic/' + props.name)}
    >
      <div className='linkCard'>
        <h2>{props.name}</h2>
        <h3>
          {props.count} {props.percentage ? '(' + props.percentage + ')' : ''}
        </h3>
      </div>
    </div>
  )
}

export default LinkCard

import React from 'react'
import 'chart.js'
import { ColumnChart, BarChart } from 'react-chartkick'
import './index.scss'

const Differential = props => {
  return (
    <div id='differential' className='row'>
      <div className='col-md-6'>
        <h1>Most Gained and Lost</h1>
        <BarChart data={props.diffData} />
      </div>
      <div className='col-md-6'>
        <h1>Newcomers</h1>
        <ColumnChart data={props.newComersData} />
      </div>
    </div>
  )
}

export default Differential

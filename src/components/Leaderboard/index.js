import React from 'react'
import 'chart.js'
import { ColumnChart } from 'react-chartkick'
import './index.scss'

class Leaderboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      crosshairValues: []
    }
    this.render = this.render.bind(this)
  }

  render () {
    return (
      <div id='leaderBoard' className='row'>
        <div className='col-md-6'>
          <h1>Leaderboard</h1>
          <ColumnChart
            data={this.props.data}
          />
        </div>
        <div className='col-md-6'>
          <h1>General Statistics</h1>
          <div className='counterCard row'>
            <h2 className='cardItem col-md-6'>10000 Words Analyzed</h2>
            <h2 className='cardItem col-md-6'>2200 Topics Counted</h2>
            <h2 className='cardItem col-md-6'>11 Websites Scraped</h2>
            <h2 className='cardItem col-md-6'>2 Languages</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Leaderboard

import React from 'react'
import { connect } from 'react-redux'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries
} from 'react-vis'
import { loadCurrentTopicData } from '../../actions'
import { location, lastDate, currentTopic } from '../../selectors'
import Spinner from '../../components/Spinner'
import DataCard from '../../components/DataCard'
import './index.scss'

const mapDispatchToProps = dispatch => ({
  loadCurrentTopicData: name => dispatch(loadCurrentTopicData(name))
})

const mapStateToProps = state => ({
  location: location(state),
  lastDate: lastDate(state),
  currentTopic: currentTopic(state)
})

class TopicPage extends React.Component {
  componentDidMount () {
    this.props.loadCurrentTopicData(this.props.location)
  }

  render () {
    const { currentTopic } = this.props
    const { counts } = currentTopic
    const countsVals = counts.map(item => item.count)

    const totalCounts = counts.reduce((acc, val) => acc + val.count, 0)
    const countAvg = Math.round((totalCounts / counts.length) * 10) / 10
    const maxCount = Math.max(...countsVals)
    const minCount = Math.min(...countsVals)

    return (
      <section id='topicPage'>
        <h1 id='mainTitle'>{this.props.location}</h1>
        {counts.length > 0 && (
          <h2 id='mainSubTitle'>
            (Last Update {this.props.lastDate} 22:00 CET)
          </h2>
        )}

        {counts.length === 0 && <Spinner />}
        {counts.length > 0 && (
          <div>
            <div id='stats' className='row'>
              <div className='col-md-1' />
              <DataCard name='Total Counts' count={totalCounts} size='2' />
              <DataCard name='Number of Days' count={counts.length} size='2' />
              <DataCard name='Average Count' count={countAvg} size='2' />
              <DataCard name='Max Count' count={maxCount} size='2' />
              <DataCard name='Min Count' count={minCount} size='2' />
            </div>
            <div id='countPlot'>
              <XYPlot height={500} width={(document.body.clientWidth / 5) * 3}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineMarkSeries
                  className='linemark-series-example'
                  lineStyle={{ stroke: 'white' }}
                  markStyle={{ stroke: 'white' }}
                  data={counts.map((item, i) => ({
                    x: i,
                    y: item.count
                  }))}
                />
              </XYPlot>
            </div>
          </div>
        )}
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicPage)

import React from 'react'
import { connect } from 'react-redux'
import { data, mostCountedTopics, lastDate, mostGained } from '../../selectors'
import Spinner from '../../components/Spinner'
import DataCard from '../../components/DataCard'
import Leaderboard from '../../components/Leaderboard'
import Differential from '../../components/Differential'
import './index.scss'

const newData = [
  { x: 0, y: 35 },
  { x: 1, y: 20 },
  { x: 2, y: 7 },
  { x: 3, y: 2 }
]

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  data: data(state),
  mostCountedTopics: mostCountedTopics(state),
  mostGainedTopics: mostGained(state),
  lastDate: lastDate(state)
})

class HomePage extends React.Component {
  render () {
    return (
      <section id='homePage'>
        <h1 id='mainTitle'>Football Topics DataVIZ</h1>
        {this.props.data.length > 0 && (
          <h2 id='mainSubTitle'>
            (Last Update {this.props.lastDate} 22:00 CET)
          </h2>
        )}

        {!this.props.mostCountedTopics && <Spinner />}

        {this.props.mostCountedTopics && (
          <div>
            <h1>Today's Top 5 Trending Topics</h1>
            <div id='top5' className='row'>
              <div className='col-md-1' />
              {this.props.mostCountedTopics.slice(0, 5).map(topic => (
                <DataCard
                  key={topic.name}
                  name={topic.name}
                  count={topic.count}
                  size='2'
                  percentage='+20%'
                />
              ))}
            </div>
          </div>
        )}
        {this.props.mostCountedTopics && (
          <Leaderboard
            data={this.props.mostCountedTopics.slice(0, 20).map((topic, i) => ({
              x: i,
              y: topic.count
            }))}
            labels={this.props.mostCountedTopics
              .slice(0, 20)
              .map(item => item.name)}
            newData={newData}
          />
        )}
        {this.props.mostCountedTopics && (
          <Differential
            data={newData}
            labels={this.props.mostGainedTopics.map(item => item.name)}
            diffData={this.props.mostGainedTopics.map((topic, i) => ({
              y: i,
              x: topic.delta
            }))}
          />
        )}
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

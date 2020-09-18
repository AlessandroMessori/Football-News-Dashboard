import React from 'react'
import { connect } from 'react-redux'
import { topics } from '../../selectors'
import DataCard from '../../components/DataCard'
import './index.scss'

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  topics: topics(state)
})

class SearchPage extends React.Component {
  render () {
    console.log(this.props.topics)
    return (
      <section id='searchPage'>
        <h1> Search Page</h1>
        <div id='resultsSection' className='row'>
          {this.props.topics.map(topic => (
            <DataCard
              className='resultCard'
              key={topic.id}
              name={topic.name}
              count={topic.category}
              size='4'
            />
          ))}
        </div>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

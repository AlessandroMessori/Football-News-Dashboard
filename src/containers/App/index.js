import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { loadInitialData } from '../../actions'
import './index.scss'

const mapDispatchToProps = dispatch => ({
  loadInitialData: () => dispatch(loadInitialData())
})

const mapStateToProps = state => ({})

class App extends React.Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    return (
      <div>
        <Navbar />
        {this.props.children}

        <Footer className='footer' />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

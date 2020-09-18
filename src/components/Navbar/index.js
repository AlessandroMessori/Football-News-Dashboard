import React from 'react'
import './index.scss'

const Navbar = props => (
  <nav className='navbar navbar-inverse navbar-fixed-top black'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <button
          type='button'
          className='navbar-toggle collapsed'
          data-toggle='collapse'
          data-target='#bs-example-navbar-collapse-1'
          aria-expanded='false'
        >
          <span className='sr-only'>Toggle navigation</span>
          <span className='icon-bar' />
          <span className='icon-bar' />
          <span className='icon-bar' />
        </button>
        <a className='navbar-brand' href='/'>
          FOOTBALL TOPICS
        </a>
      </div>

      <div
        className='collapse navbar-collapse'
        id='bs-example-navbar-collapse-1'
      >
        <ul className='nav navbar-nav navbar-right'>
          <li>
            <a href='/search'>Search Topic</a>
          </li>
          <li>
            <a href='/category/teams'>Teams</a>
          </li>
          <li>
            <a href='/category/players'>Players</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

export default Navbar

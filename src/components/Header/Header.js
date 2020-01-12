import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './header.css'

const isUserLoggined = () => {
  if (
    localStorage.getItem('access-token') &&
    localStorage.getItem('uid') &&
    localStorage.getItem('client')
  ) { return true
    }
      else {
        return false
      }
}

export class PageHeader extends React.Component {
    constructor(props) {
      super(props)
        this.state = {
           isLoggedIn: false
      }

      this.handleLogout = this.handleLogout.bind(this)
    }
  
    handleLogout() {
      localStorage.removeItem('access-token')
      localStorage.removeItem('uid')
      localStorage.removeItem('client')
      this.setState({
        isLoggedIn: false
      })
      isUserLoggined()
    }
  
    render() {
      console.log('store-user', this.props.user)
      return (
        <header className='header'>
            <nav className="container">
                <ul className='header-container'>
                    <li><Link to="/posts" >Simple Network</Link></li>
                    {isUserLoggined() ? 
                    (<React.Fragment>
                      <li><Link to="/user" className="button">User</Link></li>
                      <li><Link to="/login" className="button" onClick={this.handleLogout}>Logout</Link></li>
                    </React.Fragment>) 
                    :
                    (<li><Link to="/login" className="button">Login</Link></li>)}
                </ul>
            </nav>
        </header>
      )
    }
} 

const mapStateToProps = store => {
  return {
      user: store.user,
  }
}

export default connect(mapStateToProps)(PageHeader)
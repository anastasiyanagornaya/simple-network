import React from 'react'
//import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './header.css'
//import {isUserLoggined} from "../../index.js"


export class PageHeader extends React.Component {
    constructor(props) {
      super(props)
      // this.state = {
      //   isloggedIn: false
      // }

      this.handleLogout = this.handleLogout.bind(this)
      this.isUserLoggined = this.isUserLoggined.bind(this)
    }

    isUserLoggined = () => {
      return Boolean(
        localStorage.getItem('access-token') &&
        localStorage.getItem('uid') &&
        localStorage.getItem('client')
      )
    }
  
    handleLogout() {
      localStorage.removeItem('access-token')
      localStorage.removeItem('uid')
      localStorage.removeItem('client')
    }
  
    render() {
      return (
        <header className='header'>
            <nav className="container">
                <ul className='header-container'>
                    <li><Link to="/posts" >Simple Network</Link></li>
                    {/* {this.props.user.isLoggedIn ?  */}
                    {this.isUserLoggined() ?
                    (<React.Fragment>
                      <li><Link to="/user" className="button">User</Link></li>
                      <li><Link to="/login" className="button" onClick={this.handleLogout}>Logout</Link></li>
                    </React.Fragment>) :
                    (<li><Link to="/login" className="button">Login</Link></li>)}
                    {console.log('isLoggedIn', this.props.user.isLoggedIn)}
                    
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
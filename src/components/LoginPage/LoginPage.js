import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import './LoginPage.css'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { store } from '../../store/configureStore'

export class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        store.dispatch({type: 'FETCH_LOGIN_USER', body: this.state})
    }

    render() {
        const { email, password } = this.state
        if (this.props.user.redirect) {
            return <div><Redirect to='/posts' /></div> 
        } 
        return(
            <div className = "login">
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form className = "{classes.root} login_form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField type = "email" name = "email" required id="standard-required" label="email" onChange ={this.handleChange} value ={email}  onSubmit = {this.handleSubmit} />
                    <TextField type = "password" name = "password" required id="standard-required" label="password" onChange ={this.handleChange} value ={password}  onSubmit = {this.handleSubmit} />
                    <br/>
                    <Button type ="submit" className="login-submit button" variant="contained" color="primary">Login</Button>
                </form>
                <br/>
                <Link to="/register">
                    <Button variant="contained" color="primary">
                        Register
                    </Button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
    }
}

 export default connect(mapStateToProps)(LoginPage)
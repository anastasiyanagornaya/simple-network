import React, { Component } from 'react'
import './AddPost.css'
import {connect} from 'react-redux'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Card, CardActionArea, CardContent } from '@material-ui/core';
import { store } from '../../store/configureStore'

export class AddPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleAdd(e) {
        e.preventDefault()
        let state = this.state
        console.log(state)
        store.dispatch({type: 'FETCH_ADD_POST', body: {state}})
        this.setState({
            title: '',
            description: '',
        })
    }

    handleCancel(e) {
        e.preventDefault()
        this.setState({
            title: '',
            description: '',
        })
    }

    render() {
        const { title, description } = this.state
        return(
            <div className="edit-post-container">
                <Card className = "post-custom">
                    <CardActionArea>
                        <CardContent>
                            <div className="post-edit-form">
                                <div>
                                    <TextField
                                        id="outlined-password-input"
                                        label="title"
                                        name="title"
                                        type="text"
                                        autoComplete="current-password"
                                        variant="outlined"
                                        onChange ={this.handleChange} 
                                        value ={title}
                                        required
                                    />
                                </div>
                                <br/>
                                <FormControl fullWidth >
                                    <TextField
                                        id="outlined-password-input"
                                        label="description"
                                        name="description"
                                        type="text"
                                        multiline
                                        autoComplete="current-password"
                                        variant="outlined"
                                        onChange ={this.handleChange} 
                                        value ={description}
                                    />
                                </FormControl>
                                <div className="submit-buttons">
                                    <Button 
                                        type ="submit" 
                                        variant="contained" 
                                        color="primary" 
                                        className="save-submit"
                                        onClick ={this.handleAdd}>
                                            public
                                    </Button>
                                    <span className="margin-span">   </span>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        className="save-submit"
                                        onClick ={this.handleCancel}>
                                            cancel
                                    </Button>                        
                                    {/* <Button 
                                        variant="contained" 
                                        color="primary" 
                                        className="save-submit"
                                        onClick ={this.handleShowComments}>
                                            show comments
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        className="save-submit"
                                        onClick ={this.handleAddComments}>
                                            add comment
                                    </Button> */}
                                </div>   
                            </div>                
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        post: store.post,
    }
}

 export default connect(mapStateToProps)(AddPost)
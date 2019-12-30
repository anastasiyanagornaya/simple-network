import React, { Component } from 'react'
import "./Post.css"
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { Card, CardActionArea, CardContent } from '@material-ui/core';
import { store } from '../../store/configureStore'
//import PropTypes from 'prop-types'

export class Post extends Component {
    constructor () {
        super()
        this.state = {
            post: { 
                user_id: null,
                created_at: '',
                title: '',
                description: '',
            },
            reduct: false,
        }
        this.handleReduct = this.handleReduct.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleShowComments = this.handleShowComments.bind(this)
        this.handleAddComment = this.handleAddComment.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id || ''
        const { post } = this.state
        store.dispatch({type: 'FETCH_POST', body: {id, post}})
    }

    handleReduct() {
        this.setState({
            reduct: true
        })   
    }

    handleCancel(){
        this.setState ({
            reduct: false
        })   
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSave() {
        const id = this.props.match.params.id || ''
        const { post } = this.state

        store.dispatch({type: 'FETCH_SAVE_POST', body: {id, post}})
    }

    handleDelete() {
        const id = this.props.match.params.id || ''
        store.dispatch({type: 'FETCH_DELETE_POST', body: id})
    }

    handleShowComments() {
        // const id = this.props.match.params.id || ''

        // fetch(`https://postify-api.herokuapp.com/posts/comments`, { 
        //     method: "GET",
        //     //body: JSON.stringify(this.state),
        //     headers: {
        //         'access-token': localStorage.getItem("access-token"),
        //         'client': localStorage.getItem("client"),
        //         'uid': localStorage.getItem("uid")
        //     },
        //     }).then(response => response.json())
        //       .then(data => {
        //         console.log("Successful")
        //         console.log('data', data)
        //         console.log('state', this.state)
        //         {data.map((item) =>
        //             <li key={item.commentable_id}>
        //                 <Card>
        //                     <CardActionArea>
        //                         <CardContent>
        //                             <div className="comment">{item.commentable_id} <br/> {item.description}</div>
        //                         </CardContent>
        //                     </CardActionArea>
        //                 </Card>
        //            </li>
        //             )}
        //     })
        //this.setState({ reduct: false })
    }

    handleAddComment() {

    }

    render() {
        const { user_id, created_at, title, description } = this.props.post
        const { reduct } = this.state
        //const { user_id } = this.props
        return (
            <form className = "{classes.root} box-post-edit" noValidate autoComplete="off">
                {reduct ? 
                    (<Card>
                        <CardActionArea>
                            <CardContent>
                                <div className="post-edit-form">
                                    <TextField
                                        id="outlined-password-input"
                                        label="title"
                                        name="title"
                                        type="text"
                                        autoComplete="current-password"
                                        variant="outlined"
                                        onChange ={this.handleChange} 
                                        // value ={title}
                                        defaultValue = {title}
                                    />
                                    <TextField
                                        id="outlined-password-input"
                                        label="description"
                                        name="description"
                                        type="text"
                                        autoComplete="current-password"
                                        variant="outlined"
                                        onChange ={this.handleChange} 
                                        // value ={description}
                                        defaultValue = {description}
                                    />
                                </div>
                                <br/>
                                <br/>
                                <div className="submit-buttons">
                                    <Button 
                                        type ="submit" 
                                        variant="contained" 
                                        color="primary" 
                                        className="save-submit"
                                        onClick ={this.handleSave}>
                                            Save
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        className="save-submit"
                                        onClick ={this.handleCancel}>
                                            Cancel
                                    </Button>
                                    <Button 
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
                                    </Button>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    ) 
                    :
                    (<Card>
                        <CardActionArea>
                            <CardContent>
                                <div className="posts-edit">
                                    <h3>Created by <i>{user_id}</i> at <i>{created_at}</i></h3>
                                    <div className="post-box">
                                        <p>{title}</p>
                                        <p>{description}</p>
                                    </div>
                                    <div className = "post-buttons">
                                        <Button variant="contained" color="primary" onClick={this.handleReduct} >
                                            edit post
                                        </Button>
                                        <span className="margin-span">  </span>
                                        <Button variant="contained" color="primary" onClick={this.handleDelete}>
                                            delete post
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>)
                    }
            </form>
        )
    }
}

const mapStateToProps = store => {
    return {
        post: store.post.post,
        user: store.user
    }
}

 export default connect(mapStateToProps)(Post)
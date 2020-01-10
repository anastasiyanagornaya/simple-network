import React, { Component } from 'react'
import "./Post.css"
import CommentList from '../CommentList/CommentList.js'
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
            comment: {
                message: '',
            },
            reduct: false,
            isAdded: false,
            isVisible: false,
        }

        this.handleReduct = this.handleReduct.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCommentCancel = this.handleCommentCancel.bind(this)//the same functionalitys
        this.handleDelete = this.handleDelete.bind(this)
        this.handleShowComments = this.handleShowComments.bind(this)
        this.handleAddComment = this.handleAddComment.bind(this)
        this.handleSaveComment = this.handleSaveComment.bind(this)
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

    handleCancel() {
        this.setState ({
            reduct: false
        })   
    }

    handleCommentCancel() {
        this.setState ({
            isAdded: false
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
        console.log('id', id)
        store.dispatch({type: 'FETCH_DELETE_POST', body: id})
        // return <div><Redirect to='/posts' /></div> 
        this.props.history.push('/posts')
    }

    handleShowComments() {
        this.setState({
            isVisible: true
        })  
        console.log(this.state.isVisible)
    }

    handleHideComments() {
        this.setState({
            isVisible: false
        })
        console.log(this.state.isVisible)
    }

    handleAddComment() {
        this.setState({
            isAdded: true
        })
    }

    handleSaveComment(e) {
        e.preventDefault()
        const id = this.props.match.params.id || ''
        const { comment } = this.state
        store.dispatch({type: 'FETCH_ADD_COMMENT', body: {id, comment}})
    }

    render() {
        const { user_id, created_at, title, description } = this.props.post
        const { id } = this.props.user
        const { reduct, isAdded, isVisible } = this.state
        return (
            <div>
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
                                            className="save-submit controlled-buttons"
                                            onClick ={this.handleSave}>
                                                save
                                        </Button>
                                        <span className="margin-span">  </span>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            className="save-submit controlled-buttons"
                                            onClick ={this.handleCancel}>
                                                cancel
                                        </Button>
                                        <span className="margin-span">  </span>
                                        {/* <Button 
                                            type ="submit" 
                                            variant="contained" 
                                            color="secondary" 
                                            className="save-submit"
                                            onClick ={this.handleCancel}>
                                                cancel
                                        </Button>    */}
                                        {!isVisible && <Button 
                                            type ="submit" 
                                            variant="contained" 
                                            color="primary" 
                                            className="save-submit controlled-buttons"
                                            onClick ={this.handleShowComments}>
                                                show comments
                                        </Button>}
                                        <span className="margin-span">  </span>
                                        {isVisible && <Button 
                                            type ="submit" 
                                            variant="contained" 
                                            color="primary" 
                                            className="save-submit controlled-buttons"
                                            onClick ={this.handleHideComments}>
                                                hide comments
                                        </Button>}
                                        <span className="margin-span">  </span>
                                        {isAdded ?
                                        (<div>
                                            <TextField
                                                id="outlined-password-input"
                                                label="title"
                                                name="message"
                                                type="text"
                                                autoComplete="current-password"
                                                variant="outlined"
                                                onChange ={this.handleChange} 
                                            />
                                            <Button 
                                                type ="submit" 
                                                variant="contained" 
                                                color="primary" 
                                                className="save-submit controlled-buttons"
                                                onClick ={this.handleSaveComment}>
                                                    save comment
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                className="save-submit controlled-buttons"
                                                onClick ={this.handleCommentCancel}>
                                                    cancel
                                            </Button>
                                        </div>)
                                        :
                                        (<Button 
                                            type ="submit" 
                                            variant="contained" 
                                            color="primary" 
                                            className="save-submit controlled-buttons"
                                            onClick ={this.handleAddComment}>
                                                add comment
                                        </Button>)}
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
                                        {id===user_id ?
                                        (<div className = "post-buttons">
                                            <Button variant="contained" color="primary" onClick={this.handleReduct} >
                                                edit post
                                            </Button>
                                            <span className="margin-span">  </span>
                                            <Button variant="contained" color="primary" onClick={this.handleDelete}>
                                                delete post
                                            </Button>
                                        </div>
                                        )
                                        :
                                        (<div></div>)
                                        }
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>)
                        }
                </form>
                {isVisible && <CommentList />}
            </div>
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
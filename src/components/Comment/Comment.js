import React, { Component } from 'react'
import "./Comment.css"
import { store } from '../../store/configureStore'
import { connect } from 'react-redux'
import { Card, CardActionArea, CardContent } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

export class Comment extends Component {
    constructor (props) {
        super(props)
        this.state = {
            reduct: false,
            add: false,
            message: '',
            messageAdd: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleSaveNew = this.handleSaveNew.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleReduct = this.handleReduct.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleReduct() {
        const id = this.props.id
        store.dispatch({type: 'FETCH_SHOW_COMMENT', body: id})
        this.setState({
            reduct: true,
        })
    }

    handleSave() {
        const id = this.props.id
        let message = this.state
        console.log('message', message)
        console.log('state', this.state)
        store.dispatch({type: 'FETCH_SAVE_COMMENT', body: {id, message}})
        console.log('id path in post', this.props.post.id)
        this.setState({
            reduct: false,
        })
    }

    handleSaveNew() {
        const id = this.props.id
        let message = this.state.messageAdd
        let commentable_id = this.props.id
        let commentable_type = 'Comment'
        let body= {message, commentable_id, commentable_type}
        console.log(body)
        console.log('message', message)
        console.log('state', this.state)
        store.dispatch({type: 'FETCH_ADD_COMMENT', body: {body}})
        console.log('id path in post', this.props.post.id)
        this.setState({
            add: false,
        })
    }    

    handleDelete() {
        const id = this.props.id
        store.dispatch({type: 'FETCH_DELETE_COMMENT', body: id})
        console.log('id', id)
    }

    handleAdd() {
        this.setState({
            add: true
        })
    } 
    handleCancel() {
        this.setState({
            reduct: false,
            add: false
        })
    }

    render() {
        let prevMessage = this.props.comment.comment.message
        console.log(prevMessage)
        let author_id = this.props.author_id
        console.log('this.props.comment', this.props.comment)
        console.log('this.props.comment.comment', this.props.comment.comment)
        let user_id = this.props.user.id
        console.log('user_id', user_id)
        console.log('author_id', author_id)
        const { reduct } = this.state
        const { add } = this.state
        const { message } = this.state
        console.log('message', this.props.message)
        console.log('user', this.props.user)
        console.log('id', this.props.id)

        let prelimiter = []

        for (let i=1; i <= this.props.recurs_num; i++){
            console.log(i)
            prelimiter.push(<SubdirectoryArrowRightIcon />) 
        }

        return (
            <div className="comment-template">
                {prelimiter}
                {author_id===user_id ? 
                    (!reduct ?
                        (<Card>
                            <CardActionArea>
                                <CardContent>
                                    <div className="comment-edit-icons">
                                        <EditIcon 
                                            onClick ={this.handleReduct}
                                        />
                                        <DeleteIcon 
                                            onClick ={this.handleDelete}
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <p><b>{this.props.message}</b></p>
                                        <br/> 
                                        <p>User: {this.props.user.id}</p>
                                        <br/> 
                                        <p>Created at: {this.props.created_at}</p>
                                        {/* {this.props.recurs_num ? 'Вложенность:'+this.props.recurs_num : ''} */}
                                    </div> 
                                    {add ? 
                                        (<div className="add-comment">
                                            <TextField
                                                label="message"
                                                name="messageAdd"
                                                type="text"
                                                autoComplete="current-password"
                                                variant="outlined"
                                                onChange ={this.handleChange}
                                                defaultValue = ''
                                                required
                                            />
                                            <div className = "post-buttons">
                                                <Button 
                                                    variant="contained" 
                                                    color="primary" 
                                                    onClick={this.handleSaveNew} >
                                                        save comment
                                                </Button>
                                                <Button 
                                                    variant="contained" 
                                                    color="secondary" 
                                                    onClick={this.handleCancel} >
                                                        cancel
                                                </Button>
                                            </div>
                                        </div>)
                                        :
                                        (<div className="comment-add-icon">
                                            <AddCircleIcon 
                                                className="fa fa-plus-circle" 
                                                fontSize="small" 
                                                onClick = {this.handleAdd}
                                            />
                                            </div>)
                                    }
                                </CardContent>
                            </CardActionArea>
                        </Card>)
                        :
                        (<Card>
                            <CardActionArea>
                                <CardContent>
                                    <div className="posts-edit">
                                        <h3>Created by <i>{this.props.commentable_id}</i> at <i>{this.props.created_at}</i></h3>
                                        <TextField
                                            label="message"
                                            name="message"
                                            type="text"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            onChange ={this.handleChange}
                                            defaultValue = {this.props.message}
                                            required
                                        />
                                        <div className = "post-buttons">
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                onClick={this.handleSave} >
                                                    save comment
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                onClick={this.handleCancel} >
                                                    cancel
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>)   
                    )
                    
                    :

                    (
                        add ? (
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                    <div>
                                        <p><b>{this.props.message}</b></p>
                                        <br/> 
                                        <p>User: {this.props.user.id}</p>
                                        <br/> 
                                        <p>Created at: {this.props.created_at}</p>
                                    </div>
                                    <div className="add-comment">
                                        <TextField
                                            label="message"
                                            name="messageAdd"
                                            type="text"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            onChange ={this.handleChange}
                                            defaultValue = ''
                                            required
                                        />
                                        <div className = "post-buttons">
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                onClick={this.handleSaveNew} >
                                                    save comment
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                onClick={this.handleCancel} >
                                                    cancel
                                            </Button>
                                        </div>
                                </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>)
                                :
                                (<Card>
                                    <CardActionArea>
                                        <CardContent>
                                            <div>
                                                <p><b>{this.props.message}</b></p>
                                                <br/> 
                                                <p>User: {this.props.user.id}</p>
                                                <br/> 
                                                <p>Created at: {this.props.created_at}</p>
                                            </div>
                                            <div className="comment-add-icon">
                                                <AddCircleIcon 
                                                    className="fa fa-plus-circle" 
                                                    fontSize="small" 
                                                    onClick = {this.handleAdd}
                                                />
                                            </div>
                                            </CardContent>
                                    </CardActionArea>
                                </Card>)

                    )}
                        </div>
                    )
                }
            }

const mapStateToProps = store => {
    return {
        post: store.post.post,
        comment: store.comment,
        user: store.user
    }
}

 export default connect(mapStateToProps)(Comment)
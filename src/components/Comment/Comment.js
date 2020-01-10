import React, { Component } from 'react'
import "./Comment.css"

export class Comment extends Component {
    constructor () {
        super()
        this.state = {
            message: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id || ''
        store.dispatch({type: 'FETCH_SHOW_COMMENT', body: id})
    }

    handleChange() {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSave() {
        const id = this.props.match.params.id || ''
        const { message } = this.state
        store.dispatch({type: 'FETCH_SAVE_COMMENT', body: {id, message}})
    }

    handleDelete() {
        const id = this.props.match.params.id || ''
        store.dispatch({type: 'FETCH_DELETE_COMMENT', body: id})
    }

    render() {
        const { user_id } = this.props.user
        const { message, commentable_id, created_at } = this.props.comment
        return(
            <Card>
                <CardActionArea>
                    <CardContent>
                        {commentable_id===user_id ?
                        (<div className="posts-edit">
                            <h3>Created by <i>{commentable_id}</i> at <i>{created_at}</i></h3>
                             <TextField
                                id="outlined-password-input"
                                label="message"
                                name="message"
                                type="text"
                                autoComplete="current-password"
                                variant="outlined"
                                onChange ={this.handleChange}
                                defaultValue = {message}
                                />
                            <div className = "post-buttons">
                                <Button variant="contained" color="primary" onClick={this.handleSave} >
                                    save comment
                                </Button>
                                <span className="margin-span">  </span>
                                <Button variant="contained" color="primary" onClick={this.handleDelete}>
                                    delete comment
                                </Button>
                            </div>
                        </div>
                        )
                        :
                        (<div className="posts-edit">
                            <h3>Created by <i>{commentable_id}</i> at <i>{created_at}</i></h3>
                            <div className="post-box">
                                <p>{message}</p>
                            </div>
                        </div>)}
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

const mapStateToProps = store => {
    return {
        comment: store.comment,
        user: store.user
    }
}

 export default connect(mapStateToProps)(Comment)
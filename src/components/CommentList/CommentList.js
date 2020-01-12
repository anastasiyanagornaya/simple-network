import React from 'react'
import './CommentList.css'
import { Card, CardActionArea, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from '../../store/configureStore'

export class CommentList extends React.Component {
    constructor() {
        super()
        this.state = {
            message: '',
            commentable_id: null,
            time: '',
            loading: false,
        }
    }

    componentDidMount() {
        store.dispatch({type: 'FETCH_SHOW_COMMENTS'})
    }

    render() { 
        const { data, loading } = this.props.comment 
        if (loading) {
            return <div className="posts-container"><h2>loading...</h2></div>
        }
        let post_data = this.props.post
        console.log(post_data.id)
        let filtered_data = data.filter(function(el) {
            return el.commentable_type==="Post" &&
                   el.commentable_id===post_data.id
        })
        console.log(filtered_data)
        return (
            <div className="comment-template">
                <h2>comments: {filtered_data.length}</h2>
                {/* {console.log('post',data)} */}
                <ul>
                    {filtered_data.map((item) =>
                        <li key={item.id}>
                            <Link to={`/comments/${item.id}`}>
                                <Card>
                                    <CardActionArea>
                                        <CardContent>
                                            <div className="">{item.message} <br/> {item.commentable_id}</div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </li>
                    )}
                </ul> 
            </div>    
        )
    }
}
const mapStateToProps = store => {
    return {
        comment: store.comment,
        post: store.post.post
    }
}

export default connect(mapStateToProps)(CommentList)
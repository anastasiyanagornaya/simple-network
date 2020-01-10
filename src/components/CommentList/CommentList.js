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
        //const id = this.props.match.params.id || ''
        store.dispatch({type: 'FETCH_SHOW_COMMENT'})
    }

    render() { 
        const { loading, data } = this.props.comment 
        // if (loading) {
        //     return <div className="posts-container"><h2>loading...</h2></div>
        // }
        return (
            <div className="">
                <h2>comments: {data.length}</h2>
                <ul className="">
                    {data.map((item) =>
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
    }
}

export default connect(mapStateToProps)(CommentList)
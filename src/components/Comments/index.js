import {Component} from 'react'
import {v4 as uudiv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentItemsList: [],
    userName: '',
    userComment: '',
    isErrorName: false,
    isErrorComment: false,
  }

  onChangeName = event => {
    this.setState({userName: event.target.value})
  }

  onChangeComments = event => {
    this.setState({userComment: event.target.value})
  }

  onClickAddComment = event => {
    event.preventDefault()

    const bgColors = initialContainerBackgroundClassNames

    const randomBgColor = () => {
      const lengthOfItems = bgColors.length
      const index = Math.ceil(Math.random() * lengthOfItems - 1)
      return bgColors[index]
    }

    const {userName, userComment} = this.state
    const addNewComment = {
      id: uudiv4(),
      name: userName,
      comment: userComment,
      date: new Date(),
      isLike: false,
      randomBgColor: randomBgColor(),
    }

    if (userName !== '' && userComment !== '') {
      this.setState(prevState => ({
        commentItemsList: [...prevState.commentItemsList, addNewComment],
        userName: '',
        userComment: '',
        isErrorName: false,
        isErrorComment: false,
      }))
    }

    if (userName === '') {
      this.setState({isErrorName: true})
    } else {
      this.setState({isErrorName: false})
    }

    if (userComment === '') {
      this.setState({isErrorComment: true})
    } else {
      this.setState({isErrorComment: false})
    }
  }

  toggleFunction = id => {
    this.setState(prevState => ({
      commentItemsList: prevState.commentItemsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isLike: !eachItem.isLike}
        }
        return eachItem
      }),
    }))
  }

  removeComment = id => {
    const {commentItemsList} = this.state
    this.setState({
      commentItemsList: commentItemsList.filter(
        eachComment => eachComment.id !== id,
      ),
    })
  }

  render() {
    const {
      commentItemsList,
      userName,
      userComment,
      isErrorName,
      isErrorComment,
    } = this.state

    const isEmptyComment = commentItemsList.length === 0

    return (
      <div className="comment-section-bg-container">
        <h1 className="comment-heading">Comments</h1>
        <div className="comment-section-container">
          <form
            className="inputs-element-container"
            onSubmit={this.onClickAddComment}
          >
            <p className="sub-text">Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              onChange={this.onChangeName}
              className="name-input"
              value={userName}
            />
            {isErrorName ? (
              <p className="error-msg">*Please enter your name</p>
            ) : (
              ''
            )}
            <textarea
              cols="12"
              rows="9"
              placeholder="Your Comment"
              onChange={this.onChangeComments}
              className="textArea-comment"
              value={userComment}
            />
            {isErrorComment ? (
              <p className="error-msg">*Please enter your comments</p>
            ) : (
              ''
            )}
            <div>
              <button className="add-comment" type="submit">
                Add Comment
              </button>
            </div>
          </form>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="side-Animate-image"
            />
          </div>
        </div>
        <hr className="under-line" />
        <div className="comment-display-container">
          <p className="comment-text">
            <span className="comment-count">{commentItemsList.length}</span>
            Comments
          </p>
          {isEmptyComment ? (
            <div className="empty-container">
              <p className="empty-text">Empty Comment</p>
            </div>
          ) : (
            <ul className="comments-main-container">
              {commentItemsList.map(eachComment => (
                <CommentItem
                  key={eachComment.id}
                  commentDetails={eachComment}
                  removeComment={this.removeComment}
                  toggleFunction={this.toggleFunction}
                  randomBgColor={eachComment.randomBgColor}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Comments

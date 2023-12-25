import {AiFillLike} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'

import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleFunction, removeComment, randomBgColor} = props
  const {id, name, comment, isLike, date} = commentDetails

  const likeOrDislike = isLike ? '#5291f5' : '#e1e4e7'

  const likeTextColor = isLike ? 'like' : 'disLike'

  const onClickLike = () => {
    toggleFunction(id)
  }

  const onClickDeleteComment = () => {
    removeComment(id)
  }

  const postedTime = formatDistanceToNow(date)

  return (
    <li className="comment-items-container">
      <div className="user-comments-details-container">
        <div>
          <h1 className={`logo-icon ${randomBgColor}`}>
            {name[0].toUpperCase()}
          </h1>
        </div>
        <div className="name-and-comment-item">
          <div className="name-and-time-ago">
            <h1 className="user-name">{name}</h1>
            <p className="post-time">{postedTime} ago</p>
          </div>
          <p className="user-comment">{comment}</p>
        </div>
      </div>
      <div className="like-and-delete-icon-container">
        <button type="button" className="like-button" onClick={onClickLike}>
          <div className="like-container">
            <AiFillLike size="20" color={likeOrDislike} />
            <p className={likeTextColor}>Like</p>
          </div>
        </button>

        <button
          type="button"
          data-testid="delete"
          className="delete-button"
          onClick={onClickDeleteComment}
        >
          <MdDelete size="22" color="white" />
        </button>
      </div>
    </li>
  )
}

export default CommentItem

import { useState, useEffect, useCallback } from 'react'
import { DateTime } from 'luxon'

export function ReviewView(props) {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [comments, setComments] = useState([])
  const [commentReplyStatuses, setCommentReplyStatuses] = useState({})
  const [inputValues, setInputValues] = useState({})
  const [avatarsForNewComments, setAvatarsForNewComments] = useState({})

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch('/comments')
      if (response.ok) {
        const data = await response.json()
        const comments = data.comments
        comments.forEach(comment => {
          comment.commentDate = DateTime.fromISO(comment.commentDate)
        })
        comments.sort((a, b) => b.commentDate - a.commentDate)

        const inputValues = { null: '' }
        comments.filter(comment => comment.parentCommentId === null).forEach(comment => {
          inputValues[comment.id] = ''
        })
        setInputValues(inputValues)

        const avatars = { null: generateAvatar() }
        comments.filter(comment => comment.parentCommentId === null).forEach(comment => {
          avatars[comment.id] = generateAvatar()
        })
        setAvatarsForNewComments(avatars)

        setIsLoaded(true)
        setComments(comments)
      } else {
        throw Error(`${response.statusText} Error message: ${await response.text()}`)
      }
    } catch (e) {
      setIsLoaded(true)
      setError(e)
    }
  }, [])

  const createComment = async comment => {
    let commentFromClass = null
    if (!comment) {
      const commentInputValue = inputValues[null]
      commentFromClass = new Comment({
        avatar: avatarsForNewComments[null],
        commentText: commentInputValue
      })
    } else {
      const commentId = comment.id
      const commentInputValue = inputValues[commentId]
      commentFromClass = new Comment({
        avatar: avatarsForNewComments[commentId],
        commentText: commentInputValue,
        parentCommentId: commentId
      })
      setCommentReplyStatuses({ ...commentReplyStatuses, ...({ [commentId]: false }) })
    }

    try {
      const response = await fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: commentFromClass })
      })

      if (response.ok) {
        fetchComments()
      } else {
        throw Error(`${response.statusText} Error message: ${await response.text()}`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const upvoteComment = async comment => {
    const commentId = comment.id
    const upvotesValue = comment.upvotes
    try {
      const response = await fetch(`/comments/${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: { upvotes: upvotesValue + 1 } })
      })

      if (response.ok) {
        fetchComments()
      } else {
        throw Error(`${response.statusText} Error message: ${await response.text()}`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const replyComment = comment => {
    setCommentReplyStatuses({ ...commentReplyStatuses, ...({ [comment.id]: true }) })
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <h1>Discussion</h1>
        <div id="new-comment">
          <input
            type="text"
            value={inputValues[null]}
            onChange={event => setInputValues({ ...inputValues, ...({ null: event.target.value }) })}
          />
          <button onClick={() => createComment()}>Comment</button>
        </div>

        <ul>
          {comments.filter(comment => comment.parentCommentId === null).map(comment => (
            <li key={comment.id}>
              <div>{comment.username} - {comment.commentDate.toRelative()}</div>
              <div>{comment.commentText}</div>
              <button onClick={() => upvoteComment(comment)}>Upvote</button>
              <span>{comment.upvotes}</span>
              <button onClick={() => replyComment(comment)}>Reply</button>
              {commentReplyStatuses[comment.id] && (
                <div>
                  <input
                    type="text"
                    value={inputValues[comment.id]}
                    onChange={event => setInputValues({ ...inputValues, ...({ [comment.id]: event.target.value }) })}
                  />
                  <button onClick={() => createComment(comment)}>Comment</button>
                </div>
              )}
              <ul>
                {props.getChildComments(comment, comments).map(subComment => (
                  <li key={subComment.id}>
                    <div>{subComment.username} - {subComment.commentDate.toRelative()}</div>
                    <div>{subComment.commentText}</div>
                    <button onClick={() => upvoteComment(subComment)}>Upvote</button>
                    <span>{subComment.upvotes}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}


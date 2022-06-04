import { ChangeEvent, FormEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Comment } from './Comment'
import { Avatar } from './Avatar'

import styles from './Post.module.css'

interface Author {
  name: string
  avatarUrl: string
  role: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

export interface PostProps {
  author: Author
  content: Content[]
  publishedAt: Date
}

export function Post({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState([
    'Muito bom Devon, parabéns!! 👏👏'
  ])

  const [newCommentContent, setNewCommentContent] = useState('')

  const publishedAtFormatted = format(publishedAt, "d 'de' LLL 'as' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment (e: FormEvent) {
    e.preventDefault()

    setComments([...comments, newCommentContent])

    setNewCommentContent('')
  }

  function handleNewCommentContent (e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('')
    setNewCommentContent(e.target.value)
  }

  function handleNewCommentInvalid (e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('Obrigatório aqui vadia')
  }

  function deleteComment (content: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => comment !== content)

    setComments(commentsWithoutDeletedOne)
  }

  const isNewCommentEmpty = newCommentContent.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time 
          title={publishedAtFormatted} 
          dateTime={publishedAt.toISOString()}
        >
            Publicado {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => (
          line.type === 'paragraph' ? <p key={line.content}>{line.content}</p> : <p key={line.content}><a href="#">{line.content}</a></p>
        ))}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
          placeholder="Deixe um comentário"
          name="comment"
          value={newCommentContent}
          onChange={handleNewCommentContent}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment 
            key={comment} 
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  ) 
}
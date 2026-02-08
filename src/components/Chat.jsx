import { useState, useEffect, useRef } from 'react'
import { useChat } from '@kapaai/react-sdk'
import ReactMarkdown from 'react-markdown'
import { LuSend, LuThumbsUp, LuThumbsDown, LuRotateCw } from 'react-icons/lu'
import styles from './Chat.module.css'

function ChatMessage({ qa, addFeedback }) {
  const [feedback, setFeedback] = useState(null)

  const handleFeedback = (type) => {
    setFeedback(type)
    addFeedback(qa.id, type)
  }

  return (
    <div className={styles.messageGroup}>
      <div className={styles.userMessage}>
        <p>{qa.question}</p>
      </div>
      <div className={styles.aiMessage}>
        {qa.answer ? (
          <>
            <div className={styles.markdown}>
              <ReactMarkdown>{qa.answer}</ReactMarkdown>
            </div>

            {qa.sources && qa.sources.length > 0 && (
              <div className={styles.sources}>
                <span className={styles.sourcesLabel}>Sources</span>
                <div className={styles.sourcesList}>
                  {qa.sources.map((source, i) => (
                    <a
                      key={i}
                      href={source.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceLink}
                    >
                      {source.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {qa.id && (
              <div className={styles.feedback}>
                <button
                  className={`${styles.feedbackBtn} ${feedback === 'upvote' ? styles.feedbackPositive : ''}`}
                  onClick={() => handleFeedback('upvote')}
                >
                  <LuThumbsUp size={14} />
                </button>
                <button
                  className={`${styles.feedbackBtn} ${feedback === 'downvote' ? styles.feedbackNegative : ''}`}
                  onClick={() => handleFeedback('downvote')}
                >
                  <LuThumbsDown size={14} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.thinking}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Chat() {
  const [question, setQuestion] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { conversation, submitQuery, resetConversation, addFeedback } = useChat()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = question.trim()
    if (!trimmed) return
    submitQuery(trimmed)
    setQuestion('')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <img src="https://www.django-cms.org/static/img/django-logo.svg" alt="django CMS" className={styles.logo} />
          <h1 className={styles.title}>AI Assistant</h1>
        </div>
        <button
          className={styles.resetBtn}
          onClick={resetConversation}
          disabled={conversation.length === 0}
          title="New conversation"
        >
          <LuRotateCw size={16} />
          <span>New Chat</span>
        </button>
      </header>

      <div className={styles.messages}>
        {conversation.length === 0 ? (
          <div className={styles.empty}>
            <img src="https://www.django-cms.org/static/img/django-logo.svg" alt="django CMS" className={styles.emptyLogo} />
            <p className={styles.emptyTitle}>django CMS AI Assistant</p>
            <p className={styles.emptyHint}>Ask anything about django CMS.</p>
          </div>
        ) : (
          <>
            {conversation.map((qa, i) => (
              <ChatMessage key={i} qa={qa} addFeedback={addFeedback} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className={styles.inputArea}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            className={styles.input}
          />
          <button
            type="submit"
            disabled={!question.trim()}
            className={styles.sendBtn}
          >
            <LuSend size={18} />
          </button>
        </form>
        <div className={styles.attribution}>
          Powered by <a href="https://kapa.ai" target="_blank" rel="noopener noreferrer">kapa.ai</a>
          {' · '}
          Protected by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">reCAPTCHA</a>
        </div>
      </div>
    </div>
  )
}

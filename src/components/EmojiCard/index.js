// Write your code here.

import './index.css'
import { Component } from 'react'

class EmojiCard extends Component {
	render() {
		const { emoji, onClickEmoji } = this.props
		const { emojiName, check } = emoji
		const onclickEmojiItem = () => {
			onClickEmoji(check)
		}
		return (
			<li className="emoji-item" onClick={onclickEmojiItem}>
				<span className="emoji-image">{emojiName}</span>
			</li>
		)
	}
}

export default EmojiCard

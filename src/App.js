import EmojiGame from './components/EmojiGame'

import './App.css'

export const emojisList = [
	{
		id: 0,
		emojiRest: '⛰️',
		emojiOdd: '🏔️',
	},
	{
		id: 1,
		emojiRest: '⏮️',
		emojiOdd: '⏭️',
	},
	{
		id: 2,
		emojiRest: '🔒',
		emojiOdd: '🔓',
	},
	{
		id: 3,
		emojiRest: '🌎',
		emojiOdd: '🌏',
	},
	{
		id: 4,
		emojiRest: '🕒',
		emojiOdd: '🕗',
	},
]

const App = () => <EmojiGame emojisList={emojisList} />

export default App

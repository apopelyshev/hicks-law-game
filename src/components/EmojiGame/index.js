import './index.css'
import { Component } from 'react'
import moment from 'moment'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

const roundExpansion = [6, 16, 30, 50, 70]

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
}

class EmojiGame extends Component {
	state = {
		currRound: -1,
		isGameEnd: false,
		isGameStart: false,
		lastRoundStartTime: null,
		times: [],
	}

	/* a method that shuffles the emojis order randomly  */
	/* this method gets called each time a emoji is clicked since state gets
   updates each time a emoji is clicked. SO after every click emojis get shuffled randomly */
	getShuffledEmojisList = () => {
		const { currRound } = this.state
		const emojiForRound = this.props.emojisList[currRound]
		const roundAmount = roundExpansion[currRound]
		const newRoundList = Array.from(Array(roundAmount - 1)).map(() => ({
			check: false,
			emojiName: emojiForRound.emojiRest,
		}))
		newRoundList.push({
			check: true,
			emojiName: emojiForRound.emojiOdd,
		})
		shuffleArray(newRoundList)
		return newRoundList
	}

	getRoundTime = (start, stop) => {
		const diff = stop - start
		const secs = moment.duration(diff).seconds()
		const msecs = moment.duration(diff).milliseconds()
		return `${secs}.${msecs}s`
	}

	/* a method for actions to happen when a emoji is clicked  */
	onClickEmoji = (check) => {
		const { emojisList } = this.props
		const { times, lastRoundStartTime, currRound } = this.state

		if (!check) {
			this.setIsGameEnd(true)
		} else {
			if (emojisList.length - 1 === times.length) {
				this.setIsGameEnd(true)
			}
			this.setState({
				times: [
					...times,
					this.getRoundTime(lastRoundStartTime, Date.now()),
				],
				lastRoundStartTime: Date.now(),
				currRound: currRound + 1,
			})
		}
	}

	restartGame = () => {
		this.setState({ currRound: 0, lastRoundStartTime: null, times: [] })
		this.setIsGameEnd(false)
	}

	setIsGameEnd = (value) => {
		this.setState({ isGameEnd: value })
	}

	renderWinOrLose = () => {
		const { times } = this.state
		const isWon = times.length === 5
		return (
			<WinOrLoseCard
				isWon={isWon}
				onClickPlayAgain={this.restartGame}
				times={times}
			/>
		)
	}

	renderEmojiList = () => {
		const shuffledEmojiList = this.getShuffledEmojisList()
		return (
			<ul className={`emoji-list round-${this.state.currRound}`}>
				{shuffledEmojiList.map((emojiItem, ind) => (
					<EmojiCard
						key={ind}
						emoji={emojiItem}
						onClickEmoji={this.onClickEmoji}
					/>
				))}
			</ul>
		)
	}

	handleStart = () => {
		this.setState({
			isGameStart: true,
			currRound: 0,
		})
	}

	componentDidUpdate(_, prevState) {
		if (prevState.currRound !== this.state.currRound) {
			this.setState({
				lastRoundStartTime: Date.now(),
			})
		}
	}

	/* main render method of EmojiGame application  */
	render() {
		const { isGameEnd, isGameStart, times } = this.state
		const currentScore = times.length
		return (
			<div className="app-container">
				<NavBar currentScore={currentScore} isGameEnd={isGameEnd} />
				<div className="emoji-body-container">
					{!isGameStart && (
						<button
							className="winOrLose-button"
							type="button"
							onClick={this.handleStart}
						>
							Start the game
						</button>
					)}
					{isGameStart && !isGameEnd && this.renderEmojiList()}
					{isGameEnd && this.renderWinOrLose()}
				</div>
			</div>
		)
	}
}

export default EmojiGame

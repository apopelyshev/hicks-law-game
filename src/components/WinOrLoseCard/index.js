// Write your code here.

import './index.css'
import { Component } from 'react'

/* on win an and on fail image urls */
const winImage = 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
const loseImage = 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'

class WinOrLoseCard extends Component {
	render() {
		const { isWon, onClickPlayAgain, times } = this.props
		const imageURL = isWon ? winImage : loseImage
		const altText = isWon ? 'happyFace' : 'sadFace'
		const gameStatus = isWon ? 'You Won' : 'You Lose'
		const ScoreLabel = isWon ? 'Best Score' : 'Score'
		return (
			<div className="winOrLose-container">
				<div className="winOrLose-text-container">
					<h1 className="winOrLose-status">{gameStatus}</h1>
					<p className="winOrLose-label">{ScoreLabel}</p>
					<p className="winOrLose-current-score">{times.length}/5</p>
					<button
						className="winOrLose-button"
						type="button"
						onClick={onClickPlayAgain}
					>
						Play Again
					</button>
				</div>
				<div className="winOrLose-stats-container">
					<h4>Stats:</h4>
					<ul>
						{times.map((el, ind) => (
							<li key={`time-${ind}`}>
								Round {ind + 1}:&nbsp;&nbsp;&nbsp;{el}
							</li>
						))}
					</ul>
				</div>
				<div className="winOrLose-image-container">
					<img
						className="win-or-lose-image"
						src={imageURL}
						alt={altText}
					/>
				</div>
			</div>
		)
	}
}

export default WinOrLoseCard

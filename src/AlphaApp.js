import React, {Component} from 'react';
import alphabets from './alphabets.json';
import classNames from 'classnames';

class AlphaApp extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	alphabets: alphabets,
	  	currentPosition: 0,
	  	currentTick: 0,
	  	random: false,
	  	sound: true
	  };
	  this.next = this.next.bind(this);
	  this.prev = this.prev.bind(this);
	  this.switchRandom = this.switchRandom.bind(this);
	}

	randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	next() {
		if(this.state.random) {
			if(this.state.currentTick < 2) {
				this.setState({currentTick: this.state.currentTick + 1});
			} else {
				this.setState({currentPosition: this.randomNumber(0,25), currentTick: 0});
			}
		} else {
			if(this.state.currentPosition === this.state.alphabets.length-1){
				if(this.state.currentTick < 2) {
					this.setState({currentTick: this.state.currentTick+1});
				} else {
					this.setState({currentPosition: 0, currentTick: 0});
				}
			} else {
				if(this.state.currentTick < 2) {
					this.setState({currentTick: this.state.currentTick+1});
				} else {
					this.setState({currentPosition: this.state.currentPosition + 1, currentTick: 0});
				}
			}
		}
	}

	prev() {
		if(this.state.currentPosition > 0){
			this.setState({currentPosition: this.state.currentPosition-1});
		} else {
			this.setState({currentPosition: this.state.alphabets.length-1});
		}
	}

	switchRandom(){
		this.setState({random: !this.state.random});
	}

	render() {
		let showImage = this.state.currentTick !== 0 ? true : false;
		let showWord = this.state.currentTick === 2 ? true : false;
		return (
			<div className="game">
				<span className="random-label">Random Letters: </span>
				<label className="switch">
					<input type="checkbox"
						onClick={this.switchRandom}
						defaultValue = "false"
						checked={this.state.random} />
					<div className="slider round"></div>
				</label>
				<div className="option">
					<div className="fields">
						<div className="field-block">
							{this.state.alphabets[this.state.currentPosition].letter}
						</div>
					</div>
					<div className="buttons">
						<button onClick={this.prev} className="button prev">Previous</button>
						<button onClick={this.next} className="button next">Next</button>
					</div>
					<div className="fields">
						<div className="field-block">
							<div className="left-field">
								<div className={classNames('placeholder-span', {hide: showImage})}>Click Next to view Image</div>
								<img className={classNames('letter-image', {hide: !showImage})}
								alt={this.state.alphabets[this.state.currentPosition].word}
								src={this.state.alphabets[this.state.currentPosition].image} />
								<audio src={this.state.alphabets[this.state.currentPosition].wordSound}
									 data-key="word" />
							</div>
							<div className="right-field">
								<div className={classNames('placeholder-span', {hide: showWord})}>Click Next to view Spelling</div>
								<div className={classNames('word', {hide: !showWord})}>
									{this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default AlphaApp;
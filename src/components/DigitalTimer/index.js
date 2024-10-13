// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timerLimit: 25 * 60, intervalId: null}

  timer = () => {
    const {intervalId} = this.state
    this.setState(prevState => {
      if (prevState.timerLimit <= 0) {
        clearInterval(intervalId)
        return {isTimerRunning: false}
      }
      return {timerLimit: prevState.timerLimit - 1}
    })
  }
  /*
  startTimer = () => {
    const {isTimerRunning} = this.state

    if (!isTimerRunning) {
      this.setState({isTimerRunning: true})
      const intervalId = setInterval(this.timer, 1000)
      this.setState({intervalId})
    }
  }

  pauseTimer = () => {
    const {intervalId} = this.state
    clearInterval({intervalId})
    this.setState({isTimerRunning: false})
  }
*/

  onStartOrPauseTimer = () => {
    const {isTimerRunning, intervalId} = this.state
    if (isTimerRunning) {
      this.clearInterval(intervalId)
    } else {
      this.intervalId = setInterval(this.timer, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  resetTimer = () => {
    const {intervalId} = this.state
    clearInterval(intervalId)
    this.setState({timerLimit: 25 * 60, isTimerRunning: false})
  }

  incrementTimer = () => {
    this.setState(prevState => ({timerLimit: prevState.timerLimit + 60}))
  }

  decrementTimer = () => {
    this.setState(prevState => ({
      timerLimit: Math.max(prevState.timerLimit - 60, 0),
    }))
  }

  render() {
    const {isTimerRunning, timerLimit} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? ' pause icon' : 'play icon'

    const minutes = Math.floor(timerLimit / 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const seconds = timerLimit % 60
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="time-running-container">
            <div className="time-running-card">
              <h1 className="timer">{`${stringifiedMinutes}:${stringifiedSeconds}`}</h1>
              <p className="timer-status ">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-functions-container">
            <div className="timer-start-pause-container">
              <div className="timer-start-function-card">
                <button
                  type="button"
                  className="btn-bg"
                  onClick={this.onStartOrPauseTimer}
                >
                  <img
                    src={startOrPauseImgUrl}
                    alt={startOrPauseAltText}
                    className="icons"
                  />
                </button>
                <p className="timer-start-pause">
                  {isTimerRunning ? 'Pause' : 'Start'}
                </p>
              </div>
              <div className="timer-start-function-card">
                <button
                  type="button"
                  className="btn-bg"
                  onClick={this.resetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icons"
                  />
                </button>
                <p className="timer-start-pause">Reset</p>
              </div>
            </div>
            <div className="set-timer-card">
              <p className="set-timer">Set Timer limit</p>
              <div className="button-container">
                <button
                  type="button"
                  className="add-minus-btn"
                  onClick={isTimerRunning ? '-' : this.decrementTimer}
                >
                  -
                </button>
                <p className="btn">25</p>
                <button
                  type="button"
                  className="add-minus-btn"
                  onClick={isTimerRunning ? '+' : this.incrementTimer}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

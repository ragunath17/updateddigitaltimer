// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerLimit: 25 * 60,
    intervalId: null,
  }

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
      this.setState({
        isTimerRunning: true,
        status: 'Running',
      })
      this.setState({intervalId: setInterval(this.timer, 1000)})
    }
  }

  pauseTimer = () => {
    const {intervalId} = this.state
    clearInterval({intervalId})
    this.setState({isTimerRunning: false, status: 'Paused'})
  }
*/

  onStartOrPauseTimer = () => {
    const {isTimerRunning, intervalId} = this.state
    if (isTimerRunning) {
      clearInterval(intervalId)
    } else {
      const newIntervalId = setInterval(this.timer, 1000)
      this.setState({intervalId: newIntervalId})
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  resetTimer = () => {
    const {intervalId} = this.state
    this.setState({
      timerLimit: 25 * 60,
      isTimerRunning: false,
      intervalId: clearInterval(intervalId),
    })
  }

  incrementTimer = () => {
    this.setState(prevState => {
      if (!prevState.isTimerRunning) {
        return {timerLimit: prevState.timerLimit + 60}
      }
      return null
    })
  }

  decrementTimer = () => {
    this.setState(prevState => {
      if (!prevState.isTimerRunning) {
        return {timerLimit: prevState.timerLimit - 60}
      }
      return null
    })
  }

  render() {
    const {isTimerRunning, timerLimit} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

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
                <button type="button" className="btn-bg">
                  <img
                    src={startOrPauseImgUrl}
                    alt={startOrPauseAltText}
                    className="icons"
                  />
                </button>
                <button
                  type="button"
                  className="timer-start-pause"
                  onClick={this.onStartOrPauseTimer}
                >
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="timer-start-function-card">
                <button type="button" className="btn-bg">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icons"
                  />
                </button>
                <p
                  type="button"
                  className="timer-start-pause"
                  onClick={this.resetTimer}
                >
                  Reset
                </p>
              </div>
            </div>
            <div className="set-timer-card">
              <p className="set-timer">Set Timer limit</p>
              <div className="button-container">
                <button
                  type="button"
                  className="add-minus-btn"
                  onClick={this.decrementTimer}
                  disabled={isTimerRunning}
                >
                  -
                </button>
                <p className="btn">{stringifiedMinutes}</p>
                <button
                  type="button"
                  className="add-minus-btn"
                  onClick={this.incrementTimer}
                  disabled={isTimerRunning}
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

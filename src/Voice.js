import React, { Component } from 'react'

class Voice extends Component {
  constructor(props) {
    super(props)

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition

    if (SpeechRecognition != null) {
      this.recognition = this.createRecognition(SpeechRecognition)
    } else {
      console.warn('SpeechRecognition API not supported.')
    }

    this.state = { recording: false }
  }

  createRecognition = SpeechRecognition => {
    let recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = 'en-US'

    return recognition
  }

  handleClick = () => {
    this.setState({ recording: !this.state.recording }, this.toggleRecord)
  }

  toggleRecord = () => {
    if (this.state.recording) {
      this.recognition.start()
    } else {
      this.recognition.stop()
    }
  }

  start = () => {
    this.recognition.start()
  }

  stop = () => {
    this.recognition.stop()
  }

  abort = () => {
    this.recognition.abort()
  }

  getResult = event => {
    const finalResult = Array.from(event.results)
      .map(results => results[0].transcript)
      .reduce((accumulator, currentValue) => accumulator + currentValue, '')

    const itemList = finalResult.split(', ').filter(Boolean)

    // console.log(itemList)

    this.props.onResult(itemList)
  }

  componentDidMount() {
    const events = [
      { name: 'start', action: this.props.onStart },
      { name: 'end', action: this.props.onEnd },
      { name: 'error', action: this.props.onError },
    ]

    events.forEach(event => {
      this.recognition.addEventListener(event.name, event.action)
    })

    this.recognition.addEventListener('result', this.getResult)
  }

  componentWillUnmount() {
    this.abort()
  }

  render() {
    return (
      <div style={{ position: 'absolute', right: 0, top: 0 }}>
        <button
          className="flex items-center justify-center bn"
          style={{
            background: 'transparent',
            padding: 0,
            width: 50,
            height: 50,
          }}
          onClick={this.handleClick}
        >
          {/* {this.state.recording ? (
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
              }}
              className="flash bg-dark-red"
            />
          ) : ( */}
          <svg
            className={this.state.recording ? 'flash' : ''}
            color="#2D9CDB"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              fill={this.state.recording ? 'currentColor' : 'none'}
              d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
            />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          {/* )} */}
        </button>
      </div>
    )
  }
}

export default Voice

import * as React from 'react'

interface Props {
    date: string
}

interface State {
    seconds: number,
    minutes: number,
    hours: number,
    days: number
}

export default class Countdown extends React.PureComponent<Props, State> {
    private readonly second: number = 1000
    private readonly minute: number = this.second * 60
    private readonly hour: number = this.minute * 60
    private readonly day: number = this.hour * 24
    private readonly eventDate:number

    constructor(props: Props) {
        super(props)

        this.eventDate = new Date(props.date).getTime()

        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0
        }
    }

    updateCountDown() {
        const now = new Date().getTime()
        const gap = this.eventDate - now

        const d = Math.floor(gap / this.day)
        const h = Math.floor((gap % this.day) / this.hour)
        const m = Math.floor((gap % this.hour) / this.minute)
        const s = Math.floor((gap % this.minute) / this.second)

        this.setState({
            ...this.state,
            seconds: s,
            minutes: m,
            hours: h,
            days: d
        })
    }

    fillWithZero(i: number): string {
        return ("0"+i).slice(-2)
    }

    componentDidMount() {
        const now = new Date().getTime()
        const gap = this.eventDate - now

        if (gap > 0) {
            setInterval(() => this.updateCountDown(), this.second)
        }
    }

    render() {
        return <div className="countdown">
            <div className="circle">
                <div className="dots" style={{transform: "rotate(" + (360 / 30) * this.state.days  + "deg)"}}/>
                <svg>
                    <circle cx="70" cy="70" r="70" />
                    <circle cx="70" cy="70" r="70" style={{strokeDashoffset: 440 - (440 * this.state.days) / 30}}/>
                </svg>
                <div className="days">{this.fillWithZero(this.state.days)}<br/><span>Jours</span></div>
            </div>
            <div className="circle">
                <div className="dots" style={{transform: "rotate(" + (360 / 24) * this.state.hours  + "deg)"}}/>
                <svg>
                    <circle cx="70" cy="70" r="70" />
                    <circle cx="70" cy="70" r="70" style={{strokeDashoffset: 440 - (440 * this.state.hours) / 24}} />
                </svg>
                <div className="hours">{this.fillWithZero(this.state.hours)}<br/><span>heures</span></div>
            </div>
            <div className="circle">
                <div className="dots" style={{transform: "rotate(" + (360 / 60) * this.state.minutes  + "deg)"}}/>
                <svg>
                    <circle cx="70" cy="70" r="70" />
                    <circle cx="70" cy="70" r="70" style={{strokeDashoffset: 440 - (440 * this.state.minutes) / 60}} />
                </svg>
                <div className="minutes">{this.fillWithZero(this.state.minutes)}<br/><span>minutes</span></div>
            </div>
            <div className="circle">
                <div className="dots" style={{transform: "rotate(" + (360 / 60) * this.state.seconds  + "deg)"}}/>
                <svg>
                    <circle cx="70" cy="70" r="70" />
                    <circle cx="70" cy="70" r="70" style={{strokeDashoffset: 440  -(440 * this.state.seconds) / 60}} />
                </svg>
                <div className="seconds">{this.fillWithZero(this.state.seconds)}<br/><span>secondes</span></div>
            </div>
        </div>
    }
}
import * as React from 'react'

interface Props {
    text: string,
    onClick: (event: React.MouseEvent) => void
}

interface State {
}

export default class Button extends React.PureComponent<Props, State> {
    private readonly text: string
    private readonly onClick: (event: React.MouseEvent) => void

    constructor(props: Props) {
        super(props)

        this.text = props.text
        this.onClick = props.onClick
    }

    render() {
        return <button className="my-btn" onClick={this.onClick}>
            {this.text}
            <span/>
            <span/>
            <span/>
            <span/>
        </button>
    }
}
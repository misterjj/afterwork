import * as React from 'react'
import {FontAwesomeIcon} from '../node_modules/@fortawesome/react-fontawesome/index';
import Countdown from "./Countdown";
import Button from "./Button";
import Form from "./Form";


enum Stepper {
    step1,
    step2,
    step3,
    step4
}

interface Props {
}

interface State {
    step: Stepper
}

export default class Afterwork extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            step: Stepper.step1
        }
    }

    componentDidMount() {
    }

    render() {
        return <div>
            <h2 className="mb-5">Afterwork 2.0</h2>
            {this.state.step == Stepper.step1 && [
                <Countdown date="2022-05-03 18:30:00" key="step-1-1"/>,
                <div className="mt-5" key="step-1-2"/>,
                <Button
                    key="step-1-3"
                    text="Ca fait quelle date ?"
                    onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        this.setState({...this.state, step: Stepper.step2})
                    }}
                />
            ]}
            {this.state.step == Stepper.step2 && [
                <div className="info" key="step-2-1">
                    <div className="d-flex flex-wrap align-items-center justify-content-center">
                        <div className="date d-flex justify-content-center mt-4 mb-4">
                            <div className="day">03</div>
                            <div className="month">Mai<br/>2022 <br/>18h30</div>
                        </div>
                        <div>
                            <div className="row mb-1">
                                <div className="col-3 text-end">
                                    <FontAwesomeIcon icon="bacon" size="2x"/>
                                </div>
                                <div className="col-9 align-self-center"><h5>Je m'occupe de la nouriture</h5></div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end">
                                    <FontAwesomeIcon icon="beer" size="2x" />
                                </div>
                                <div className="col-9 align-self-center"><h5>Vous êtes en charge des boissons <br/>
                                    <small>*Penssez aux softs, bande de poches*</small></h5></div>
                            </div>
                        </div>
                    </div>
                </div>,
                <Button
                    key="step-2-2"
                    text="Je participe !"
                    onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        this.setState({...this.state, step: Stepper.step3})
                    }}
                />
            ]}
            {this.state.step == Stepper.step3 &&  <Form onSentEmail={() => this.setState({...this.state, step: Stepper.step4})}/>}
            {this.state.step == Stepper.step4 && <h2>Merci</h2>}
        </div>
    }
}
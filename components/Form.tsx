import * as React from 'react'
import Switch from "react-switch";
import {FontAwesomeIcon} from '../node_modules/@fortawesome/react-fontawesome/index';
import Button from "./Button";
const axios = require('axios');

interface Props {
    onSentEmail: () => void
}

interface State {
    loveJJ: boolean,
    withPartner: boolean
}

export default class Form extends React.PureComponent<Props, State> {
    private readonly firstNameRef: React.RefObject<HTMLInputElement>
    private readonly lastNameRef: React.RefObject<HTMLInputElement>
    private readonly onSentEmail: () => void

    constructor(props: Props) {
        super(props)

        this.firstNameRef = React.createRef()
        this.lastNameRef = React.createRef()
        this.onSentEmail = props.onSentEmail

        this.state = {
            loveJJ: true,
            withPartner: false
        }
    }

    componentDidMount() {
    }

    render() {
        return <form className="mb-4" action="">
            <div className="row p-3">
                <div className="col-md-6 col-sm-12">
                    <input ref={this.firstNameRef} type="text" className="form-control"
                           placeholder="Nom" required={true}/> <br/>
                    <input ref={this.lastNameRef} type="text" className="form-control"
                           placeholder="Prénom" required={true}/>
                </div>
                <div className="col-md-6 col-sm-12">
                    <label className="d-flex">
                        <Switch onChange={(checked) => this.setState({...this.state, withPartner: checked})}
                                checked={this.state.withPartner}
                                onColor="#ff0000"/>
                        <span className="flex-grow-1 align-self-center ms-1">Je viens accompagné.e</span>
                    </label>
                    <label className="d-flex mt-4">
                        <Switch onChange={(checked) => {
                            this.setState({...this.state, loveJJ: checked})
                            setTimeout(() => this.setState({...this.state, loveJJ: true}), 500)
                        }}
                                checked={this.state.loveJJ}
                                onColor="#ff0000"
                                checkedIcon={<FontAwesomeIcon icon="heart" transform={{x: 7, y: 3}} />}
                        />
                        <span className="flex-grow-1 align-self-center ms-1">J'aime d'amour l'organisateur de cet afterwork</span>
                    </label>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Button text="envoyer" onClick={this.sendEmail.bind(this)}/>
            </div>
        </form>
    }

    async sendEmail(e: React.FormEvent): Promise<boolean> {
        e.preventDefault()

        let formData = new FormData();
        formData.append('nom', this.firstNameRef.current.value);
        formData.append('prenom', this.lastNameRef.current.value);
        formData.append('mail', "afterwork@afterwork.com");
        formData.append('sujet', "afterwork");
        formData.append('msg', "Vient accompagné(e) : " + this.state.withPartner);

        axios.post('https://www.jonathanjorand.fr/mail.php', formData)
            .then((response) => {
                this.onSentEmail()
            })
            .catch((error) => {
                alert("error")
                console.log(error)
            });

        return false
    }
}
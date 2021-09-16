import * as React from 'react'
import {FontAwesomeIcon} from '../node_modules/@fortawesome/react-fontawesome/index';
import {IconProp} from '../node_modules/@fortawesome/fontawesome-svg-core/index';
import Switch from "react-switch";
const axios = require('axios');

interface Props {
}

interface State {
    icons: IconProp[][][]
    displayForm: boolean,
    endForm: boolean,
    loveJJ: boolean,
    withPartner: boolean
}

export default class Afterwork extends React.PureComponent<Props, State> {
    private readonly possibleIcons: IconProp[]
    private readonly firstNameRef: React.RefObject<HTMLInputElement>
    private readonly lastNameRef: React.RefObject<HTMLInputElement>

    constructor(props: Props) {
        super(props)

        this.possibleIcons = [
            "glass-cheers",
            "handshake",
            "beer",
            "cocktail",
            "hamburger",
            "wine-bottle",
            "utensils",
            "pizza-slice",
            "drumstick-bite",
            "bacon",
            "gamepad",
            "comments",
            "comment-alt",
            "bicycle",
            "thumbs-up",
            "calendar-alt",
            "dizzy",
            "user-ninja",
            "tshirt",
        ]
        this.firstNameRef = React.createRef()
        this.lastNameRef = React.createRef()

        this.state = {
            icons: [],
            displayForm: false,
            endForm: false,
            loveJJ: true,
            withPartner: false
        }
    }

    componentDidMount() {
        let possibleIconsLength = this.possibleIcons.length;
        let rows: IconProp[][][] = []
        for (let i = 0; i < 30; i++) {
            let part: IconProp[][] = []
            for (let j = 0; j < 2; j++) {
                let icons: IconProp[] = []
                for (let k = 0; k < 30; k++) {
                    icons.push(this.possibleIcons[Math.floor(Math.random() * possibleIconsLength)]);
                }
                part.push(icons)
            }
            rows.push(part)
        }

        this.setState({...this.state, icons: rows})
    }

    render() {
        return <div>
            <section className="background">
                {
                    this.state.icons.map((row, idxRow) => {
                        return <div className="icon-row" key={"row" + idxRow}> {row.map((part, idxPart) => {
                            return <div key={"part" + idxRow + "-" + idxPart}> {
                                part.map((icon, idxIcon) => <FontAwesomeIcon
                                    key={"icon - " + "-" + idxRow + "-" + idxPart + "-" + idxIcon}
                                    icon={icon}/>)} </div>
                        })
                        } </div>
                    })
                }
            </section>
            <div className="invitation-box">
                <div className="invitation">
                    <h1 className="mb-0">
                        AFTER<br/>
                        WORK
                    </h1>
                    <h2 className="text-center mb-4 mt-4">Chez Jonathan J.</h2>
                    <div>
                        {!this.state.displayForm && <div className="presentation">
                            <div className="row mb-1">
                                <div className="col-3 text-end">
                                    <FontAwesomeIcon icon="hamburger" size="3x"/>
                                </div>
                                <div className="col-9 align-self-center">
                                    <h5>Je m'occupe de la nouriture</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end">
                                    <FontAwesomeIcon icon="beer" size="3x"/>
                                </div>
                                <div className="col-9 align-self-center">
                                    <h5>Vous êtes en charge des boissons <br/> <small>*Penssez aux softs, bande de
                                        poches*</small></h5>
                                </div>
                            </div>
                            <div className="date d-flex justify-content-center mt-4 mb-4">
                                <div className="day">22</div>
                                <div className="month">
                                    Septembre<br/>
                                    2021 <br/>
                                    <small>18h00</small>
                                </div>
                            </div>
                            <a className="btn mb-4" onClick={() => this.setState({...this.state, displayForm: true})}>
                                <span>Je viens !</span>
                                <span>Je viens !</span>
                            </a>
                        </div>}
                        {this.state.displayForm && !this.state.endForm &&
                        <form className="mb-4" action="" onSubmit={this.sendEmail.bind(this)}>
                            <div className="row">
                                <div className="col">
                                    <input ref={this.firstNameRef} type="text" className="form-control"
                                           placeholder="Nom" required={true}/>
                                </div>
                                <div className="col">
                                    <input ref={this.lastNameRef} type="text" className="form-control"
                                           placeholder="Prénom" required={true}/>
                                </div>
                            </div>
                            <label className="d-flex mt-2">
                                <Switch onChange={(checked) => this.setState({...this.state, withPartner: checked})}
                                        checked={this.state.withPartner}
                                        onColor="#09647b"/>
                                <span className="flex-grow-1 align-self-center ms-1">Je viens accompagné.e</span>
                            </label>
                            <label className="d-flex mt-2">
                                <Switch onChange={(checked) => {
                                    this.setState({...this.state, loveJJ: checked})
                                    setTimeout(() => this.setState({...this.state, loveJJ: true}), 500)
                                }}
                                        checked={this.state.loveJJ}
                                        onColor="#09647b"/>
                                <span className="flex-grow-1 align-self-center ms-1">J'aime d'amour l'organisateur de cet afterwork &lt;3</span>
                            </label>
                            <button type="submit" className="btn mb-4 mt-4">
                                <span>Envoyer</span>
                                <span>Envoyer</span>
                            </button>
                        </form>
                        }
                        {this.state.displayForm && this.state.endForm &&
                        <div className="endForm mb-3">
                            <h2 className="text-center mb-4">Merci !<br/><small>DES BISOUS</small></h2>
                            <div className="row">
                                <div className="col-3 text-end">
                                    <FontAwesomeIcon icon="map-marker-alt" size="3x"/>
                                </div>
                                <div className="col-9 align-self-center">
                                    <a href="https://www.google.com/maps/place/57+Rue+du+Mar%C3%A9chal+Foch,+59100+Roubaix/@50.688217,3.1723133,17z/data=!3m1!4b1!4m5!3m4!1s0x47c328ed910524e7:0x81cd6c906ed6e130!8m2!3d50.688217!4d3.174502" target="_blank">57 rue de maréchal Foch, 59100 Roubaix</a>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    <p className="text-center">
                        <FontAwesomeIcon icon="exclamation-triangle"/> Attention <FontAwesomeIcon
                        icon="exclamation-triangle"/> <br/>
                        je vous demande de vacciné.e où testé.e avant de venir
                    </p>
                </div>
            </div>
        </div>
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
                this.setState({...this.state, endForm: true})
            })
            .catch((error) => {
                alert("error")
                console.log(error)
            });

        return false
    }
}
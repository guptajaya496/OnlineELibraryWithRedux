
import React, {Component} from 'react';

class ContactUs extends Component{
    render(){
        return(
            <div className="container">
                <div className="row row-header">
                    <div className="col-sm-12">
                        <div className="container">
                            <div className="row-content">
                                <h1> Our Leaders </h1>

                                <div className="list-group-item">

                                    <ul className="media-list">
                                        <li className="media">
                                            <div className="media-left media-middle">
                                                <a>
                                                    <img className="media-object img-thumbnail imgContact" src="../images/Nicholas-Stephanie.jpg"
                                                         alt="Nicolas Stephanie" ></img>
                                                </a>
                                            </div>
                                            <div className="media-body">
                                                <h3 className="media-heading">Nicolas Stephanie</h3>
                                                <span>Head Library Incharge</span>
                                            </div>
                                        </li>

                                        <li className="media">
                                            <div className="media-left media-middle">
                                                <a>
                                                    <img className="media-object img-thumbnail imgContact" src="../images/Sonia_Sodha.png"
                                                         alt="Sonia Sodha" ></img>
                                                </a>
                                            </div>
                                            <div className="media-body">
                                                <h3 className="media-heading">Sonia Sodha</h3>
                                                <span>Asst. Library Incharge</span>
                                            </div>
                                        </li>
                                        <li className="media">
                                            <div className="media-left media-middle">
                                                <a>
                                                    <img className="media-object img-thumbnail imgContact" src="../images/Stephne.jpg"
                                                         alt="Stephne" ></img>
                                                </a>
                                            </div>
                                            <div className="media-body">
                                                <h3 className="media-heading">Stephne</h3>
                                                <span>Librarian</span>
                                            </div>
                                        </li>
                                        <li className="media">
                                            <div className="media-left media-middle">
                                                <a>
                                                    <img className="media-object img-thumbnail imgContact" src="../images/Rosy.jpeg"
                                                         alt="Rosy" ></img>
                                                </a>
                                            </div>
                                            <div className="media-body">
                                                <h3 className="media-heading">Rosy</h3>
                                                <span>Founder & CEO </span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactUs;


import React from 'react';
import '../profile.css';
import  { Redirect } from 'react-router-dom';

class Profile extends React.Component {
    state = {
        email: '',
        fullName: '',
        createdDate: '',
        isLogged: false,
    }
    componentWillMount(){
        this.loadProfile();
    }

    loadProfile = () => {
        fetch(`http://localhost:3001/users/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

            }),
            credentials: 'include',
        })
        .then((res) =>{
            return res.json();
        })
        .then((data) =>{
            if(data.success === false){
                this.setState({
                    isLogged: false,
                })
            } else {
                this.setState({
                    isLogged: true,
                    email: data.data.email,
                    fullName: data.data.fullName,
                    createdDate: data.data.createdDate,
                })
            }
        })
        .catch((error) => {
            if(error){
                console.log(error);
                window.alert(error.message);
            }
        })
    }

    render() {

        return this.state.isLogged ? 
        (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <br/>
                        <div className="panel-body">
                            <div className="col-md-8 col-xs-12 col-sm-6 col-lg-8">
                                <div className="container">
                                    <h2>{this.state.fullName}</h2>
                                </div>
                                <hr />
                                <ul className="container details">
                                    <li>
                                        <h6>Email: {this.state.email}</h6>
                                    </li>
                                    <li>
                                        <h6>Join Date: {this.state.createdDate}</h6>
                                    </li>
                                </ul>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <Redirect to="/login"/>
        )
    }
}

export default Profile
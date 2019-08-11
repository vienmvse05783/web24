import React from 'react';
import '../App.css'

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Register extends React.Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        isEmpty: false,
        error: '',
    }

    handleInput = (event) => {
        this.setState({
            isEmpty: false,
        })
    }

    handleSubmit = (event) => {
        if (this.state.email.trim() === '') {
            this.setState({
                isEmpty: true,
                error: 'email',
            })
        } else if (this.state.password.trim() === '') {
            this.setState({
                isEmpty: true,
                error: 'password',
            })
        } else if (this.state.confirmPassword.trim() === '') {
            this.setState({
                isEmpty: true,
                error: 'confirm password',
            })
        } else if (this.state.fullName.trim() === '') {
            this.setState({
                isEmpty: true,
                error: 'Full Name',
            })
        } else if (!emailRegex.test(this.state.email)) {
            this.setState({
                isEmpty: true,
                error: 'true email!',
            })
        } else if (this.state.password.length < 6) {
            this.setState({
                isEmpty: true,
                error: 'password > 6 character!',
            })
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                isEmpty: true,
                error: 'true password!',
            })
        } else {
            this.setState({
                isEmpty: false,
            })
            fetch('http://localhost:3001/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    fullName: this.state.fullName,
                })
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    // window.location.replace("http://localhost:3001/");
                    if (data.message === 'Email has been used!') {
                        this.setState({
                            isEmpty: true,
                            error: 'Email has been used!'
                        });
                    } else {
                        window.alert('Register succesfully!');
                    }
                })
                .catch((error) => {
                    if (error) {
                        console.log(error);
                        window.alert(error.message);
                    }
                })
        }
    };

    render() {
        return (
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Welcome.</h3>
                        <input type="submit" name="" value="Login" /><br />
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Register</h3>
                                <div className="row register-form">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" onInput={this.handleInput} placeholder="Email"
                                                value={this.state.email}
                                                onChange={(event) => {
                                                    this.setState({
                                                        email: event.target.value,
                                                    })
                                                }} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" onInput={this.handleInput} placeholder="Password"
                                                value={this.state.password}
                                                onChange={(event) => {
                                                    this.setState({
                                                        password: event.target.value,
                                                    })
                                                }} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" onInput={this.handleInput} placeholder="Confirm Password"
                                                value={this.state.confirmPassword}
                                                onChange={(event) => {
                                                    this.setState({
                                                        confirmPassword: event.target.value,
                                                    })
                                                }} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" onInput={this.handleInput} placeholder="Fullname"
                                                value={this.state.fullName}
                                                onChange={(event) => {
                                                    this.setState({
                                                        fullName: event.target.value,
                                                    })
                                                }} />
                                        </div>
                                        {this.state.isEmpty ? (
                                            <div className="form-group">
                                                <p>Please input {this.state.error}</p>
                                            </div>
                                        ) : (
                                                <div></div>
                                            )}
                                        <div className="col-md-9">
                                            <input type="submit" className="btnRegister" value="Register"
                                                onClick={this.handleSubmit} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
import React from 'react';
import '../login.css';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Register extends React.Component {
    state = {
        email: '',
        password: '',
        isEmpty: false,
        message: '',
    }

    handleInput = () => {
        this.setState({
            isEmpty: false,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.email.trim() === ''){
            this.setState({
                isEmpty: true,
                message: 'Email'
            })
        } else if(this.state.password.trim() === ''){
            this.setState({
                isEmpty: true,
                message: 'Password'
            })
        } else if(!emailRegex.test(this.state.email)){
            this.setState({
                isEmpty: true,
                message: 'true Email!',
            })
        } else if(this.state.password.length < 6){
            this.setState({
                isEmpty: true,
                message: 'Password > 6!',
            })
        } else {
            fetch(`http://localhost:3001/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                }),
                credentials: 'include',
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data.message === 'Email not Exist!'){
                    this.setState({
                        isEmpty: true,
                        message: data.message,
                    })
                } else if(data.message === 'Password is not correct'){
                    this.setState({
                        isEmpty: true,
                        message: data.message,
                    })
                } else {
                    //luu thong tin vao local storage
                    localStorage.setItem('email',  data.data.email);
                    localStorage.setItem('fullName', data.data.fullName)

                    //chuyen trang
                    window.location.href = "http://localhost:3000/";
                    // console.log(data.message);
                    // console.log(data.data);
                }
            })
        }
    }

    render() {
        const status = this.state.isEmpty;
        return (
            <div className="main dflex">
                <div className="login dflex">
                    <h1>Login</h1>
                    <form action="" className="login_form" onSubmit={this.handleSubmit}>
                        <div className="input_bg">
                            <input className="login_input" type="text" placeholder="Username" 
                                   value={this.state.email} 
                                   onChange={(event) => {
                                    this.setState({
                                        email: event.target.value,
                                    })
                                }}
                                onInput={this.handleInput} />
                        </div>
                        <div className="input_bg">
                            <input className="login_input" type="password" placeholder="Password"
                                    value={this.state.password} 
                                    onChange={(event) => {
                                     this.setState({
                                         password: event.target.value,
                                     })
                                 }} 
                                 onInput={this.handleInput} />
                        </div>
                        {
                            status ? (
                                <div>
                                    <p>Please input {this.state.message}</p>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                        <div className="submit_bg">
                            <input type="submit" value="SUBMIT" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register
import React from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
class CreatePost extends React.Component {

    handleImageChange = (event) => {
        const imageFile = event.target.file[0]
        const fileReader = new fileReader()
        fileReader.readAsDataURL(imageFile)
        fileReader.onloadend = (data) => {
            console.log(`data:`, data);
            this.setState({

            })
        }
    }
    state = {
        content: '',
        imageUrl: '',
        isEmpty: false,
        error: '',
        isLogged: false,
    }

    componentWillMount() {
        if (window.localStorage.length !== 0) {
            this.setState({
                isLogged: true,
            })
        }
        else {
            this.setState({
                isLogged: false,
            })
        }
    }

    handleInput = (event) => {
        this.setState({
            isEmpty: false,
            content: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.state.content.trim() === '') {
            this.setState({
                isEmpty: true,
                error: 'Please input content',
            })
        } else if (this.state.content.trim().length > 500) {
            this.setState({
                isEmpty: true,
                error: 'Content must be < 500 characters',
            })
        } else if (this.state.imageUrl.trim() === '') {
            this.setState({
                isEmpty: true,
                error: 'Please input image url',
            })
        } else if (!urlRegex.test(this.state.imageUrl)) {
            this.setState({
                isEmpty: true,
                error: 'image url not match',
            })
        }
        else {
            this.setState({
                isEmpty: false,
            })
            const formData = new formData();
            formData.append(`image`, this.state.imageFile)
            //upload file
            fetch('http://localhost:3001/upload/image', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.success) {
                        window.alert("Post Successfully!")
                    }
                })
                .catch((error) => {
                    if (error) {
                        console.log(error);
                        window.alert(error.message);
                    }
                })
        }
        ////

        fetch('http://localhost:3001/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: this.state.content,
                imageUrl: this.state.imageUrl,
            }),
            credentials: 'include',
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    window.alert("Post Successfully!")
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

render(){
    return this.state.isLogged ?
        (
            <div className="row mt-5" >
                <div className="col-3"></div>
                <div className="col-6">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Content</label>
                            <textarea className="form-control" placeholder="Content..." maxLength="500" rows="10" onChange={this.handleInput}
                                value={this.state.content}
                                onChange={(event) => {
                                    this.setState({
                                        content: event.target.value,
                                    })
                                }} ></textarea>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Image Url</label>
                            <input type="file" className="form-control flex" style={{ color: 'transparent', }} />
                        </div>
                        <div>
                            <img src="{this.state.imageUrl}" alt="preview"> </img>
                        </div>
                        {this.state.isEmpty ? (
                            <div className="form-group">
                                <p>{this.state.error}</p>
                            </div>
                        ) : (
                                <div></div>
                            )}
                        <button type="submit" className="btn btn-primary">Create Post</button>
                    </form>
                </div>
                <div className="col-3"></div>

            </div>
        ) :
        (
            <Redirect to="/login" />
        )
}
export default CreatePost
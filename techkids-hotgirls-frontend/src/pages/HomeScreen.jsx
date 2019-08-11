import React from 'react';
import '../App.css'

class HomeScreen extends React.Component {
    
    componentDidMount() {
        fetch('http://localhost:3001/users/test', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                
            })
               
                .catch((error) => {
                    if (error) {
                        console.log(error);
                        window.alert(error.message);
                    }
                })
    }

    render() {
        return (
            <div>Home Page </div>
        )
    }

 }

 export default HomeScreen
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

function Home() {

    const [data, setData] = useState(null);

    useEffect(() => {

        axios.get(process.env.REACT_APP_SERVER_HOSTED_ON + "/protectedAPI", {
            headers: {
                Authorization: "Bearer " + Cookies.get('token')
            }
        }).then(response => {
            console.log(response.data);
            if(response.data.success == false)
            {
                alert(response.data.message);
                Cookies.remove('token');
                window.location.href = '/';
            }
            else
                setData(response.data.message);

        }).catch(error => {
                console.log(error);
        })
 
    }, []);

    const Logout = () => {
        Cookies.remove('token');
        window.location.href = '/';
    }

    return (data == null ? (
        <div className="Home">
            <h1>Home</h1>
            <p>loading...</p>
        </div>
    ) : (
        <div className="Home">
            <h1>Home</h1>
            <p>{data}</p>
            <button className="btn btn-danger" onClick={Logout}>Logout</button>
        </div>
    )
    );
}

export default Home;
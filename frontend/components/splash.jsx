import React from 'react';
import { Link } from 'react-router-dom';


const Splash = () => {
    return(
        <div className="splashPage">
            <div>
                <Link to={"/signup"}>Sign Up</Link>
            </div>
            <div>

            </div>
        </div>

    )
};

export default Splash;
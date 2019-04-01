import React from 'react';
import { Link } from 'react-router-dom';
import Splash from '../splash';
import { LineChart, Line } from 'recharts';



const Greeting = ({currentUser, chart, logout, fetChart}) => {
    
    class PersonalGreeting extends React.Component {

        // componentDidMount(){
        //     fetChart("aapl", "1m");
        // }

        render(){
            return(
                <div className="greet-page">
                    <nav className="greet-nav">
                        <div className="login-logo-link">
                            <Link to={"/"}
                                className="logo-link">
                                    BetterCapital
                                </Link>
                        </div>
                    </nav>
                    <div className="greet-chart">
    
                        <LineChart width={600} height={400} data={chart}>

                            <Line type="monotone" dataKey="high" stroke="#8884d8" />
                        </LineChart>
    
                    </div>
    
                    <button className="header-button" onClick={()=> logout()}>Log Out</button>
                </div>
            )
        }
    }

    return currentUser ? <PersonalGreeting/> : Splash();
}


export default Greeting;
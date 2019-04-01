import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


class Asset extends React.Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.props.fetChart("tsla", "1m");
        
    }

    render(){
        const parsedData = this.props.chart.map((ele, idx) => {
            return {name: idx, price: ele.high};
        });

        // const dataMin = parsedData.forEach(obj => {
        //     let prices = [];
        //     prices.push(obj.price);
        //     return Math.min(...prices);

        // });

        // const dataMax = parsedData.forEach(obj => {
        //     let prices = [];
        //     prices.push(obj.price);
        //     return Math.max(...prices);
        // });
        
        debugger
        return(


            <div className="asset-chart">
                <LineChart
                    width={700}
                    height={300}
                    data={parsedData}>
                    <Line type="linear" 
                        dataKey="price" 
                        stroke="#21ce99"
                        strokeWidth={2}
                        dot={false} 
                        
                    />
                    <XAxis dataKey="name" 
                        hide={true}
                    />
                    <YAxis dataKey="price"
                        domain={['dataMin - 20', 'dataMax + 20']}  
                        hide={true}  
                    />
                </LineChart>

            </div>
        )
    }
}

export default Asset;
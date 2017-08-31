import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import ReactTooltip from 'react-tooltip';


class WeatherList extends Component {

    constructor(props) {
        super(props);

        this.state = { tempUnit: 'K', clicked: false };

        this.renderWeather = this.renderWeather.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map(weather => weather.main.temp);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);

        return (
            <tr key={name}>
                <td>{name}</td>
                <td><Chart data={temps} color="orange" units={this.state.tempUnit}/></td>
                <td><Chart data={pressures} color="green" units="hPA"/></td>
                <td><Chart data={humidities} color="black" units="%" /></td>
            </tr>
        );
    }
    
    handleClick() {
        if(!(this.state.clicked)){
            return this.setState({ tempUnit: "C", clicked: true });
        }

        return this.setState({ tempUnit: "K", clicked: false });
    }

    render(){
        console.log(this.state);
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th data-tip="Click Here to Convert Between F to C " className="table-temperature" onClick={this.handleClick}>Temperature ({this.state.tempUnit})</th>
                            <th>Pressure (hPA)</th>
                            <th>Humudity (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.weather.map(this.renderWeather)}
                    </tbody>
                </table>
                <ReactTooltip type="info"/>
            </div>
        );
    }
}


//function mapStateToProps(state) {
//    return {weather: state.weather};
//}

function mapStateToProps({weather}) {
    return {weather};
}

export default connect(mapStateToProps)(WeatherList);
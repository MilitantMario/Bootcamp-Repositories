import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import 'font-awesome/css/font-awesome.css'
import Table from 'react-bootstrap/lib/Table'
import Image from 'react-bootstrap/lib/Image'
// import Row from './Row';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            top100Days: [],
            top100AllTime: [],
            current: true
        }

    }
    getFCCData(url, stateName) {
        axios.get(url)
            .then(({ data }) => {
                this.setState({ [stateName]: data });
                console.log(this.state.top100Days);
                // this.setState({current: true})
            })
    }

    pointChange(value) {

        if (this.state.current !== value) {
            this.setState({ current: value });
            console.log(2);
        }
    }

    componentDidMount() {

        this.getFCCData("https://fcctop100.herokuapp.com/api/fccusers/top/recent", "top100Days");
        this.getFCCData("https://fcctop100.herokuapp.com/api/fccusers/top/alltime", "top100AllTime");

    }

    render() {
        const { top100Days, top100AllTime, current } = this.state;
        return (
            <div className="App container text-center">
                <header>
                    <h1>Camper Leaderboard</h1>
                    <h3>by Militant Mario</h3>
                </header>
                <Table striped bordered condensed hover className="colorBlack">

                    <thead>
                    <tr>
                        <th># </th>
                        <th>Camper Name</th>
                        <th onClick={(event) => this.pointChange(true)}>Points in past 30 days {current && (<i className="fa fa-caret-down" aria-hidden="true"></i>)}</th>
                        <th onClick={(event) => this.pointChange(false)}>All Time Points {current === false && (<i className="fa fa-caret-down" aria-hidden="true"></i>)}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {current && (
                        top100Days.map((row, index) => (
                            <tr key={row.username}>
                                <td>{index + 1}</td>
                                <td><a href={`https://www.freecodecamp.org/${row.username}`} ><Image src={row.img} className='imgHeight' circle alt='User' /> {row.username}</a></td>
                                <td>{row.recent}</td>
                                <td>{row.alltime}</td>
                            </tr>
                        ))
                    )}

                    {current === false && (
                        top100AllTime.map((row, index) => (
                            <tr key={row.username}>
                                <td>{index + 1}</td>
                                <td><a href={`https://www.freecodecamp.org/${row.username}`} ><Image src={row.img} className='imgHeight' circle alt='User' /> {row.username}</a></td>
                                <td>{row.recent}</td>
                                <td>{row.alltime}</td>
                            </tr>
                        ))
                    )}

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default App;
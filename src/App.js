import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import ehealth from './ehealth';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      pasien: [],
      penyakit: [],
      nama: '',
      umur: '',
      alamat: '',
      tenkes_status: false,
      pasien_status: false,
      manager: false,
      idPasien:0,
      addPenyakit: ''
    }
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const result_status_tenkes = await ehealth.methods.check_tenkes().call({from:accounts[0]});
    const result_status_pasien = await ehealth.methods.check_pasien().call({from:accounts[0]});
    this.setState({pasien_status: result_status_pasien})
    this.setState({tenkes_status: result_status_tenkes})
    const result_pasien = await ehealth.methods.getpasien_pasien().call({from:accounts[0]});
    const result_penyakit = await ehealth.methods.getpenyakit_pasien().call({from:accounts[0]});
    const manager = await ehealth.methods.getManager().call({from:accounts[0]})
    if (manager == accounts[0]) {
      this.setState({manager: true})
    }
    var a = [];
    var obj = JSON.parse(JSON.stringify(result_pasien));

    for(var i in obj){
      a.push(obj[i]);
    }
    this.setState({penyakit:result_penyakit})
    this.setState({pasien:a})
  }

  submitPasien = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await ehealth.methods.addPasien(this.state.nama, this.state.umur, this.state.alamat)
    .send({from: accounts[0]});
  }
  submitTenkes = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await ehealth.methods.addTenkes(this.state.nama, this.state.umur, this.state.alamat)
    .send({from:accounts[0]})
  }
  submitPenyakit = async (event) => {
    console.log("id pasien: ", this.state.idPasien, "penyakit: ", this.state.addPenyakit)
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await ehealth.methods.addPenyakit(this.state.idPasien, this.state.addPenyakit)
    .send({from: accounts[0]})
  }

  render(){
    return (
      <div>
        <h1>E Health</h1>
        {!this.state.tenkes_status ? 
        <form onSubmit={this.submitTenkes}>
          <div>
            <hr/>
            <h2>Form Tenkes</h2>
            <label>Nama: </label>
            <input placeholder="Nama Lengkap" required nama={this.state.nama} onChange={e => this.setState({nama : e.target.value})}/>
            <br/>
            <label>Umur: </label>
            <input 
            value1={this.state.umur}
            onChange={event => this.setState({ umur: event.target.value1 })}
            />
            <br/>
            <label>Alamat: </label>
            <input 
            value1={this.state.alamat}
            onChange={event => this.setState({ alamat: event.target.value1 })}
            />
            <button>Enter</button>
          </div>
        </form>
        : null}

        {this.state.tenkes_status ?
        <div>
          <hr/>
          <h2>Form add penyakit</h2>
          <form onSubmit={this.submitPenyakit}>
            <label>ID Pasien: </label>
            <input placeholder="id Pasien" required idPasien={this.state.idPasien} onChange={e => this.setState({idPasien : e.target.value})}/>
            <br/>
            <label>Penyakit: </label>
            <input placeholder="Penyakit" required addPenyakit={this.state.addPenyakit} onChange={e => this.setState({addPenyakit : e.target.value})}/>
            <button>Enter</button>
          </form>
        </div>: null}        
        
        {!this.state.pasien_status ? 
        <form onSubmit={this.submitPasien}>
          <div>
            <hr/>
            <h2>Form Pasien</h2>
            <label>Nama: </label>
            <input 
            value={this.state.nama}
            onChange={event => this.setState({ nama: event.target.value })}
            />
            <br/>
            <label>Umur: </label>
            <input 
            value={this.state.umur}
            onChange={event => this.setState({ umur: event.target.value })}
            />
            <br/>
            <label>Alamat: </label>
            <input 
            value={this.state.alamat}
            onChange={event => this.setState({ alamat: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        : null}
        
        <hr />
        <p>Informasi pasien: </p>
        <ul><ul>{this.state.pasien.map(i => <li key={i}> {i} </li>)}</ul></ul>
        <p>penyakit: </p>
        <ul><ul>{this.state.penyakit.map(i => <li key={i}> {i} </li>)}</ul></ul>

      </div>
    );
  }
}

export default App;
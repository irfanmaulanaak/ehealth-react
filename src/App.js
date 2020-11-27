import React, { Component } from 'react'
import './App.css'
import web3 from './web3'
import ehealth from './ehealth'
import FormPasien from './components/form_pasien'
import FormTenkes from './components/form_tenkes'
import FormPenyakit from './components/form_penyakit'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pasien: [],
      penyakit: [],
      nama: '',
      umur: '',
      alamat: '',
      tenkes_status: false,
      pasien_status: false,
      manager: false,
      idPasien: 0,
      addPenyakit: '',
    }
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts()
    const result_status_tenkes = await ehealth.methods
      .check_tenkes()
      .call({ from: accounts[0] })
    const result_status_pasien = await ehealth.methods
      .check_pasien()
      .call({ from: accounts[0] })
    this.setState({
      pasien_status: result_status_pasien,
      tenkes_status: result_status_tenkes,
    })
    const result_pasien = await ehealth.methods
      .getpasien_pasien()
      .call({ from: accounts[0] })
    const result_penyakit = await ehealth.methods
      .getpenyakit_pasien()
      .call({ from: accounts[0] })
    const manager = await ehealth.methods
      .getManager()
      .call({ from: accounts[0] })
    if (manager == accounts[0]) {
      this.setState({ manager: true })
    }
    var a = []
    var obj = JSON.parse(JSON.stringify(result_pasien))

    for (var i in obj) {
      a.push(obj[i])
    }
    this.setState({ penyakit: result_penyakit })
    this.setState({ pasien: a })
  }
  render() {
    return (
      <div>
        <h1>E Health</h1>
        {!this.state.tenkes_status ? (
          <FormTenkes
            nama={this.state.nama}
            umur={this.state.umur}
            alamat={this.state.alamat}
          />
        ) : null}

        {this.state.tenkes_status ? (
          <FormPenyakit
            idPasien={this.state.idPasien}
            addPenyakit={this.state.addPenyakit}
          />
        ) : null}

        {!this.state.pasien_status ? (
          <FormPasien
            nama={this.state.nama}
            umur={this.state.umur}
            alamat={this.state.alamat}
          />
        ) : (
          <div>
            <hr />
            <p>Informasi pasien: </p>
            <ul>
              <ul>
                {this.state.pasien.map((i) => (
                  <li key={i}> {i} </li>
                ))}
              </ul>
            </ul>
            <p>penyakit: </p>
            <ul>
              <ul>
                {this.state.penyakit.map((i) => (
                  <li key={i}> {i} </li>
                ))}
              </ul>
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default App

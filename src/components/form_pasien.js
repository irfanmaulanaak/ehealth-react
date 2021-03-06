import React, { Component } from 'react'
import web3 from '../web3'
import ehealth from '../ehealth'

class FormPasien extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nik: '',
      nama: '',
      umur: '',
      alamat: '',
    }
  }
  componentDidMount() {
    const {nik, nama, umur, alamat } = this.props
    this.setState({nik: nik, nama: nama, umur: umur, alamat: alamat })
  }
  submitPasien = async (event) => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0])
    try {
      await ehealth.methods
        .addPasien(this.state.nik, this.state.nama, this.state.umur, this.state.alamat)
        .send({ from: accounts[0] })
    } catch (error) {
      console.log(error)
      
    }
  }
  render() {
    return (
      <form onSubmit={this.submitPasien}>
        <div>
          <hr />
          <h2>Form Pasien</h2>
          <label>NIK: </label>
          <input
            value={this.state.nik}
            onChange={(event) => this.setState({ nik: event.target.value })}
          />
          <br />
          <label>Nama: </label>
          <input
            value={this.state.nama}
            onChange={(event) => this.setState({ nama: event.target.value })}
          />
          <br />
          <label>Umur: </label>
          <input
            value={this.state.umur}
            onChange={(event) => this.setState({ umur: event.target.value })}
          />
          <br />
          <label>Alamat: </label>
          <input
            value={this.state.alamat}
            onChange={(event) => this.setState({ alamat: event.target.value })}
          />
        </div>
        <button>Enter</button>
      </form>
    )
  }
}
export default FormPasien

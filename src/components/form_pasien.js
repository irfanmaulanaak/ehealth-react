import React, { Component } from 'react'
import web3 from '../web3'
import ehealth from '../ehealth'

class FormPasien extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nama: '',
      umur: '',
      alamat: '',
    }
  }
  componentDidMount() {
    const { nama, umur, alamat } = this.props
    this.setState({ nama: nama, umur: umur, alamat: alamat })
  }
  submitPasien = async (event) => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()

    await ehealth.methods
      .addPasien(this.state.nama, this.state.umur, this.state.alamat)
      .send({ from: accounts[0] })
  }
  render() {
    return (
      <form onSubmit={this.submitPasien}>
        <div>
          <hr />
          <h2>Form Pasien</h2>
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
export default FormPasien;
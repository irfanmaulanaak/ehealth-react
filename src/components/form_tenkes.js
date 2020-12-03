import React, { Component } from 'react'
import web3 from '../web3'
import ehealth from '../ehealth'

class FormTenkes extends Component {
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
  submitTenkes = async (event) => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()
    console.log(this.state.nama,", ", this.state.umur,", ", this.state.alamat)
    await ehealth.methods
      .addTenkes(this.state.nama, this.state.umur, this.state.alamat)
      .send({ from: accounts[0] })
  }
  render() {
    return (
      <form onSubmit={this.submitTenkes}>
        <div>
          <hr />
          <h2>Form Tenkes</h2>
          <label>*Nama: </label>
          <input
            placeholder="Nama Lengkap"
            required
            nama={this.state.nama}
            onChange={(e) => this.setState({ nama: e.target.value })}
          />
          <br />
          <label>*Umur: </label>
          <input
            placeholder="Umur"
            required
            umur={this.state.umur}
            onChange={(e) => this.setState({ umur: e.target.value })}
          />
          <br />
          <label>*Alamat: </label>
          <input
            placeholder="Alamat"
            required
            alamat={this.state.alamat}
            onChange={(e) => this.setState({ alamat: e.target.value })}
          />
          <button>Enter</button>
        </div>
      </form>
    )
  }
}
export default FormTenkes;

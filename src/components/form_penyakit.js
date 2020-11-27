import React, { Component } from 'react'
import web3 from '../web3'
import ehealth from '../ehealth'

class FormPenyakit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idPasien: 0,
      addPenyakit: '',
    }
  }
  submitPenyakit = async (event) => {
    console.log(
      'id pasien: ',
      this.state.idPasien,
      'penyakit: ',
      this.state.addPenyakit,
    )
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()

    await ehealth.methods
      .addPenyakit(this.state.idPasien, this.state.addPenyakit)
      .send({ from: accounts[0] })
  }
  render() {
    return (
      <div>
        <hr />
        <h2>Form add penyakit</h2>
        <form onSubmit={this.submitPenyakit}>
          <label>ID Pasien: </label>
          <input
            placeholder="id Pasien"
            required
            idPasien={this.state.idPasien}
            onChange={(e) => this.setState({ idPasien: e.target.value })}
          />
          <br />
          <label>Penyakit: </label>
          <input
            placeholder="Penyakit"
            required
            addPenyakit={this.state.addPenyakit}
            onChange={(e) => this.setState({ addPenyakit: e.target.value })}
          />
          <button>Enter</button>
        </form>
      </div>
    )
  }
}
export default FormPenyakit

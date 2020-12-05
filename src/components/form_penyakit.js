import React, { Component } from 'react'
import web3 from '../web3'
import ehealth from '../ehealth'

class FormPenyakit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idPasien: 0,
      addPenyakit: '',
      pasien: [],
      penyakit: [],
      status: false,
    }
  }
  submitPenyakit = async (event) => {
    console.log(
      'nik pasien: ',
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
  getPasien = async (event) => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()

    const result_pasien = await ehealth.methods
      .getpasien_tenkes(this.state.idPasien)
      .call({ from: accounts[0] })
    const result_penyakit = await ehealth.methods
      .getpenyakit_tenkes(this.state.idPasien)
      .call({ from: accounts[0] })
    var a = []
    var obj = JSON.parse(JSON.stringify(result_pasien))

    for (var i in obj) {
      a.push(obj[i])
    }
    //pengecekan untuk nik pasien apakah valid atau tidak
    if (a[1] == 0) {
      this.setState({ status: false })
      alert("Data pasien tidak ditemukan!")
    }else{
      this.setState({ penyakit: result_penyakit })
      this.setState({ pasien: a })
      this.setState({ status: true })
    }
  }
  render() {
    return (
      <div>
        <hr />
        <h2>Form add penyakit</h2>
        <form onSubmit={this.getPasien}>
          <label>NIK Pasien: </label>
          <input
            placeholder="NIK Pasien"
            required
            idPasien={this.state.idPasien}
            onChange={(e) => this.setState({ idPasien: e.target.value })}
          />
          <button>Search Pasien</button>
        </form>
        <form onSubmit={this.submitPenyakit}>
          <label>Penyakit: </label>
          <input
            placeholder="Penyakit"
            required
            addPenyakit={this.state.addPenyakit}
            onChange={(e) => this.setState({ addPenyakit: e.target.value })}
          />
          <br />
          <button>Enter</button>
        </form>
        {this.state.status ? (
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
        ) : null}
      </div>
    )
  }
}
export default FormPenyakit

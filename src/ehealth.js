import web3 from './web3'

const address = '0x859Ff0a06DF9029E6782Be772b33E4077e3D19DC'

const abi = [
  {
    constant: true,
    inputs: [],
    name: 'check_tenkes',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getpasien_pasien',
    outputs: [
      { name: '', type: 'uint256' },
      { name: '', type: 'string' },
      { name: '', type: 'uint8' },
      { name: '', type: 'string' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_nama', type: 'string' },
      { name: '_umur', type: 'uint8' },
      { name: '_alamat', type: 'string' },
    ],
    name: 'addTenkes',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'check_pasien',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_nama', type: 'string' },
      { name: '_umur', type: 'uint8' },
      { name: '_alamat', type: 'string' },
    ],
    name: 'addPasien',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getpenyakit_pasien',
    outputs: [{ name: '', type: 'string[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_id', type: 'uint256' },
      { name: '_penyakit', type: 'string' },
    ],
    name: 'addPenyakit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getManager',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
];

export default new web3.eth.Contract(abi, address)

// imporatando as dependencias

const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir rede
//bitcoin - rede princial 
//testnet - rede teste
const newtork = bitcoin.networks.testnet

//deirivacao de carteiras HD
const path = `m/49'/1'/0'/0`

//Criando o mnemonic para a seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Criando raiz da carteira HD
let root = bip32.fromSeed(seed, newtork)

//criando uma conta
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

//gerar endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: newtork,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic)

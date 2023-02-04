import Web3 from "web3";

import Meme from "./abis/Meme.json";

import { abiDeployed, addressDeployed } from "./testNetwork";

export const convertToBuffer = (data, setFileBuffer) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
        setFileBuffer(Buffer(reader.result));
    };
};

export const loadWeb3 = async () => {
    if (window.ethereum) {
        console.log("eth");
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        console.log("web3");
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log("please download metamask");
    }
};

export const loadBlockchainData = async (
    setAccount,
    setContract,
    setList,
    auth
) => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length) setAccount(accounts[0]);
    // const networkId = await web3.eth.net.getId();
    // const networkData = Meme.networks[networkId];
    // if (networkData) {
    // const abi = Meme.abi;
    // const address = networkData.address;
    // console.log({ addressDeployed, address });
    const contract = web3.eth.Contract(abiDeployed, addressDeployed);
    setContract(contract);
    console.log({ methods: contract.methods });
    const files = await contract.methods.getAll().call();
    console.log({ files })
    setList(files);
    // } else {
    // console.log("not deployed");
    // }
};

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";
import PersonsData from "./components/personsData";
import Child from "./components/child";
import {BrowserRouter ,Route , Switch} from 'react-router-dom'
import About from './components/About'
import ErrorComponent from './components/PageNotFound'
import Home from './components/Home'
import Profile  from './components/Profile';
import StellarSdk from 'stellar-sdk'
import Navigation from './components/Navigation'
const fetch = require('node-fetch');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const pair = StellarSdk.Keypair.random();

class APP extends Component {
  constructor(props) {
    super(props);
    this.state={
      message:"",
      ShowInput:false,
      Balances:[],
      destinationId:"",
      secret:'',
      error:'',
      TransactionStatus:''

    }
  }
    CreateAccount=async()=>{

  
     const secret= pair.secret();
     console.log(secret)
     this.setState({secret})
      const key=  pair.publicKey();
      console.log(key)
      try {
        const response = await fetch(
          `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
        );
        const responseJSON = await response.json();
        console.log("SUCCESS! You have a new account :)\n", responseJSON);
        this.setState({message:"congratulation You have a new account"})
      } catch (e) {
        console.error("ERROR!", e);
      }
      
    }
GetDetails=async()=>{
  const{Balances}=this.state
  const account = await server.loadAccount(pair.publicKey());
console.log("account",account)
  console.log("Balances for account: " + pair.publicKey());
  account.balances.forEach((balance)=>{
    // Balances.push(balance)
    this.setState({Balances:[...Balances,{...balance}]})
    console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
  });

}
toggle=()=>{
  const{ShowInput}=this.state
  this.setState({ShowInput:true})
}
CreateTransaction=(e)=>{

  e.preventDefault()
  const{secret,destinationId}=this.state
  console.log("secret",secret)
 StellarSdk.Network.useTestNetwork();

  var sourceKeys = StellarSdk.Keypair
  .fromSecret(secret);
  console.log(sourceKeys)
var transaction;
console.log(destinationId)
if(destinationId)
{
server.loadAccount(destinationId)
  // If the account is not found, surface a nicer error message for logging.
  .catch(StellarSdk.NotFoundError, function (error) {
    throw new Error('The destination account does not exist!');
    this.setState({error:'The destination account does not exist!'})
  })
  // If there was no error, load up-to-date information on your account.
  .then(function() {
    return server.loadAccount(sourceKeys.publicKey());
  })
  .then((sourceAccount)=> {
    // Start building the transaction.
    console.log("Start building the transaction")
    this.setState({TransactionStatus:'Start building the transaction please wait'})

    transaction = new StellarSdk.TransactionBuilder(sourceAccount)
      .addOperation(StellarSdk.Operation.payment({
        destination: destinationId,
        // Because Stellar allows transaction in many currencies, you must
        // specify the asset type. The special "native" asset represents Lumens.
        asset: StellarSdk.Asset.native(),
        amount: "1000"
      }))
      // A memo allows you to add your own metadata to a transaction. It's
      // optional and does not affect how Stellar treats the transaction.
      .addMemo(StellarSdk.Memo.text('Test Transaction'))
      // Wait a maximum of three minutes for the transaction
      .setTimeout(180)
      .build();
    // Sign the transaction to prove you are actually the person sending it.
    transaction.sign(sourceKeys);
    // And finally, send it off to Stellar!
    return server.submitTransaction(transaction);
  })
  .then((result)=> {
    console.log('Success! Results:', result);
    this.setState({TransactionStatus:'congratulation Transaction is done'})
    this.GetDetails()
  })
  .catch(function(error) {
    console.error('Something went wrong!', error);
    // If the result is unknown (no response body, timeout etc.) we simply resubmit
    // already built transaction:
    // server.submitTransaction(transaction);
  });

}
else{
  return;
}

}
 render() {

   const{message,Balances,ShowInput,TransactionStatus}=this.state

 let currentBalances= Balances.map((balance)=>{

  return(
    <div style={{color:'red',fontSize:'1.2em'}}>Type {balance.asset_type}Balance {balance.balance}</div>
  )
 })
 console.log(currentBalances,"currentBalances")
   return(
      <div style={{textAlign:"center"}}>
      <button onClick={()=>this.CreateAccount()}>CreateAccount</button>
      <br/>
    <div style={{color:'red',fontSize:'1em'}}>{message}</div> 
      {
    message&&<button onClick={()=>this.GetDetails()}>Show My Details and Balance</button>
      }
      <br/>
      <div>
      {currentBalances}
      </div>
      <br/>
     {currentBalances.length>0&& <button onClick={()=>this.toggle()}>CreateTransaction</button>
     }
      {
        ShowInput&&( <form>
          <input onChange={(e)=>this.setState({destinationId:e.target.value})}/>
          <button onClick={(e)=>this.CreateTransaction(e)}>Submit</button>
          <div style={{color:"green"}}>
          <p>
            you can use this Public_Key for testing Transaction 
          </p>
          GB4V2YWDZB2JYVY7VUVOH6O3OQEUDEISHPGNZJGLQIAXCT4ZYMUJKXR5</div>
            </form>)
      }
      
      <br/>
    <div style={{color:'blue',fontFamily:'1.4em'}}>  {TransactionStatus}</div>


      </div>
   );
  }
}

export default APP;

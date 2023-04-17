import './App.css'
import React, {useEffect, useState } from 'react';
import TransactionComp from './components/TransactionComponent'; 


function App() {

  const [item, setItem] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [])
  
  async function getTransactions () {
    const url = 'http://localhost:4040/api/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  // const renderTransactions = () => {
  //   return (
  //     <>
  //       {transactions.length > 0 && transactions.map(transaction => (
  //         <TransactionComp
  //           item={transaction.item}
  //           price={transaction.price}
  //           datetime={transaction.dateTime}
  //           description={transaction.description}
  //         /> 
  //       ))}
  //     </>
  //   );
  // }
  
  

  function submitTransaction (e) {
    e.preventDefault(); 

    const url = 'http://localhost:4040/api/transaction';
    const price = item.split(" ")[0];
    fetch (url, {
      method: 'POST',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify({
        price,
        item:item.substring(price.length+1), 
        description, 
        dateTime
      })
    }).then(response => {
      response.json().then(json => {
        console.log('result', json);
        setItem('');
        setDescription('');
        setDateTime('');
      })
    })
      // renderTransactions();
  };

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split(".")[0];

  return (
    <div className="App">
      <main>
      <h1>${balance}<span>{fraction}</span></h1>
      <form onSubmit={submitTransaction}>
        <div className="basic">
        <input 
        type="text" 
        placeholder="+200 Monthly Income"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        />

        <input 
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        />
        </div>
        <div className="description">
        <input 
        type="text" 
        placeholder="Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <button type="submit">Add new transaction</button>
        {transactions.length}
      </form>
      <div className="transactions">
        {/* {renderTransactions()}; */}
        {transactions.length > 0 && transactions.map(transaction => (
        <TransactionComp
         item={transaction.item}
         price={transaction.price}
         datetime={transaction.dateTime}
         description={transaction.description}
        /> 
        ))}
      </div>
      </main>
    </div>
  );
}

export default App;

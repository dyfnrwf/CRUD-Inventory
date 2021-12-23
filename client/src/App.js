import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState(0);

  const [newAmount, setNewAmount] = useState(0);

  const [itemList, setItemList] = useState([]);

  const addItem = () => {
    Axios.post("http://localhost:3001/create", {
      itemName: itemName, 
      itemAmount: itemAmount
    }).then(() => {
      console.log("Item successfully added");
    });
  };

  const getItem = () => {
    Axios.get("http://localhost:3001/items").then((response) => {
      setItemList(response.data);
    });
  };

  const updateAmount = (id) => {
    Axios.put("http://localhost:3001/update", { itemAmount: newAmount, id: id }).then(
      (response) => {
        alert("Updated successfully, please refresh this page");
    });
  };
  
const deleteItem = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`).then(
    (response) => {
      alert("Deleted successfully, please refresh this page");
    }
  );
};

  return (
    <div className="App">
      <h1>CRUD Inventory</h1>
      <div className='form'>
        <label>Item Name</label>
        <input 
          type="text" 
          onChange={(event) => {
            setItemName(event.target.value);
          }} 
        />
        <label>Item Amount</label>
        <input 
          type="number"
          onChange={(event) => {
            setItemAmount(event.target.value);
          }} 
        />
        <button onClick={addItem}>Submit</button>
      </div>
      <div className='items'>
      <button onClick={getItem}>Show Items</button>

          
          
          
          
          {itemList.map((val, key) => {
            return (
            <div>
              <div>
                <table>
                    <tr>
                      <th>Item Name</th>
                      <th>Item Amount</th>
                    </tr>
                    <tr>
                      <td>{val.item_name} </td>
                      <td>{val.item_amount}</td>
                    </tr>
                </table>
              </div>
              <div>
              <input
                className='updateAmount' 
                type="number" 
                onChange={(event) => {
                  setNewAmount(event.target.value);
              }}
              />
              <button className='updateButton' onClick={() => { updateAmount(val.id);}}>Update</button>
              <button onClick={() => { deleteItem(val.id);}}>Delete</button>
              </div>
            </div>
            );
          })}

      </div>
    </div>
  );
}

export default App;

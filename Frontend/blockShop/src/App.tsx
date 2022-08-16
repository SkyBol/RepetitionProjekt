import axios from "axios";
import { useEffect, useState } from "react";


type Block = {
  id : number;
  name : string;
  imageLink : string;
}

function App() {
  const axiosIns = axios.create({baseURL: 'http://localhost:8080/api/'});
  const {list, setList} = useState<Block>;

  useEffect(() => {
    axiosIns.get('block')
    .then((res) => {
      list
    })
  }, []);

  return (
    <div className="App">
      
    </div>
  );
}

export default App;

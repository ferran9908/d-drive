// import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ipfsClient = require("ipfs-http-client");


const projectId = '2LFeE3wZ6hWGmyJeGXzXLnZJdCD';   // <---------- your Infura Project ID

const projectSecret = '97d32ac6eabdd7b9dfdbc6cfa7889836';  // <---------- your Infura Secret

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});
//
// export const ipfs = ipfsClient({
//   protocol: "http",
//   port: 5001,
//   host: "ec2-15-207-162-68.ap-south-1.compute.amazonaws.com",
// });

function App() {
  return (
    <div className="">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React, { Component } from "react";
// import logo from './logo.svg';
// import "./App.css";

function Button(props) {
  return (
    <button
      onClick={() => {
        console.log("hihihih", document.asyncreacttoolboxqueue);
        document.asyncreacttoolboxqueue && document.asyncreacttoolboxqueue[0](0);
      }}
    >
      {" "}
      hello world{" "}
    </button>
  );
}

class App extends Component {
  componentDidMount() {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML = `
    console.log('injected js')
    XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(value) {
      this.addEventListener(
        "loadstart",
        function() {
          console.log("Loading");
        },
        false
      );
      console.log("********************");
      document.asyncreacttoolboxqueue = [
        () => this.realSend(value)
      ]
    };
    `;
    document.body.appendChild(s);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <Button />
        </p>
      </div>
    );
  }
}

export default App;

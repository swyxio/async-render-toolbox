import React from 'react';

export default class Radar extends React.Component {
  componentDidMount() {
    const s = document.createElement("script");
    s.type = "text/javascript";
    // s.async = true;
    s.innerHTML = `
    console.log('injected js')
    XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(value) {
      console.log('caught')
      this.addEventListener(
        "loadstart",
        function() {
          console.log("Loading");
        },
        false
      );
      // var trap = document.getElementById('trapcounter')
      // trap.innerHTML = trap.innerHTML + " 3 "
      window.asyncreacttoolboxqueue = []
      console.log("********************", window);
      // if (!window.asyncreacttoolboxqueue) window.asyncreacttoolboxqueue = []
      // window.asyncreacttoolboxqueue.push(() => this.realSend(value))
      // console.log('xmlhttp', window.asyncreacttoolboxqueue, this);
    };
    `;
    // document.body.appendChild(s);
    document.body.prepend(s);
  }
  render() {
    return (
      <div>
        <div id="trapcounter">traps</div>
        <button
          onClick={() => {
            console.log("hihihih", window);
            window.asyncreacttoolboxqueue && window.asyncreacttoolboxqueue[0](0);
          }}
        >
          {" "}
          hello world{" "}
        </button>
      </div>
    )
  }
}

import React from "react";
import _ from "lodash";
import Prism from "prismjs";
import data from "./data.json";
import "./App.css";
import "./prism.css";

var randomProperty = obj => {
  var keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

function Code(props) {
  return (
    <pre>
      <code className="language-javascript">{props.text}</code>
    </pre>
  );
}

class App extends React.Component {
  state = {
    technique: {
      before: "",
      after: "",
      imgName: "",
      title: "",
      linkUrl: "",
      index: 0
    },
    techniques: Object.keys(data).length
  };

  componentDidMount() {
    const technique = randomProperty(data);
    this.setState({ technique });

    Prism.highlightAll();

    document.addEventListener("keydown", this.onKeyPress.bind(this), false);
  }

  onKeyPress(event) {
    if (event.key === "ArrowLeft") {
      this.setTechniqueByIndex(this.state.technique.index - 1);
    }
    if (event.key === "ArrowRight") {
      this.setTechniqueByIndex(this.state.technique.index + 1);
    }
  }

  setTechniqueByIndex(index) {
    let technique;
    if (index >= this.state.techniques) technique = _.find(data, ['index', 1]);
    else if (index <= 1) technique = _.find(data, ['index', this.state.techniques]);
    else technique = _.find(data, ['index', index]);
    this.setState({ technique });
    Prism.highlightAll();
  }

  render() {
    const { before, after, imgName, title, linkUrl } = this.state.technique;

    return (
      <div className="App">
        <a href={linkUrl} target="_blank">
          <h1>{title}</h1>
        </a>
        <img src={`${process.env.PUBLIC_URL}/images/${imgName}`} alt="" />
        <div className="code-examples">
          <Code text={before} />
          <p>↓</p>
          <Code text={after} />
        </div>
      </div>
    );
  }
}

export default App;

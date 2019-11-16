'use strict';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, date: new Date() };
  }

  componentDidMount() {
    console.log('did mount');
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    console.log('did unmount');
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    const temporalizador = <h2>It is {this.state.date.toLocaleTimeString()}.</h2>;
    let base = <button onClick={() => this.setState({ liked: true })}>{this.props.text}  {temporalizador}</button>;
    if (this.state.liked) {
      base = <button onClick={() => this.setState({ liked: false })}>You liked this.</button>;
    }

    return base;
    // JSX solo proporciona azúcar sintáctica para la función React.createElement(component, props, ...children).
    // return React.createElement(
    //   'button',
    //   { onClick: () => this.setState({ liked: true }) },
    //   'Like'
    // );
  }
}

// const domContainer = document.querySelector('#root');
// ReactDOM.render(React.createElement(LikeButton), domContainer);




function Welcome(props) {
  return <div> <h1>Hello, {props.name} </h1> <span>{props.children}</span> <LikeButton text="Give me a like"></LikeButton> </div>;
}
const element = <Welcome name="Sara">Soy un children like a slot</Welcome>;
ReactDOM.render(
  element,
  document.querySelector('#jsxroot')
);


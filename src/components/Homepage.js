import Button from './Button.js'
import Logo from "../images/temp.png"
import "./Homepage.css"

function Login() {
    return (
      <div className="Login">
        <h1> Welcome To ByteBod </h1>
        <img src={Logo}/>
        <h2> Join our community </h2>
        <div className="Buttons">
        <Button class="loginbuttons">Login</Button>
        <Button class="loginbuttons">Sign Up</Button>
        </div>
      </div>
    );
  }
  
  export default Login;
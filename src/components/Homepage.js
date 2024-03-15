import Button from './Button.js'
import Logo from "../images/temp.png"
import "./Homepage.css"

/**
 * The homepage that users see before they are logged in. The "Welcome To ByteBod" page.
 * From this page, a user can either create an account, sign in with their existing account or reset their password
 * 
* @return Renders the homepage.
 */

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
import React from "react"
import "./style.scss"
import LoginModal from "../LoginModal/index"



class UserLogin extends React.Component {

  render(){
    return (
      <section>
        <LoginModal />
      </section> 
    )
  }
}   


export default UserLogin;

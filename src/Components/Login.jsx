import React, { useState } from 'react'
import './users.css'
import axios from 'axios'
import { tz } from '../tz'

const Login = () => {
function login(){
axios.post(`${tz}/login`,{
    email:email,
    password:pass
}).then(res=>{
    console.log(res)
    if(res.data.message==='500'){
        alert('Invalid credentials')
    }
    else{
        localStorage.setItem('token',res.data.message)
        window.location.pathname='/'

    }
})

}
    
const [useername, setuseername] = useState('')

const [pass, setpass] = useState('')

const [sea, setsea] = useState('')
const [email, setemail] = useState('')
const [userr, setuserr] = useState([])
  return (
    <div className="bllurr">
    <div className="blurrlogin">
<h3>Login</h3>
<h4>Email</h4>
<input type="text" onChange={e=>setemail(e.target.value)} placeholder='Enter Email' name="" id="" />

<h4>Password</h4>
<input type="text" onChange={e=>setpass(e.target.value)} placeholder='Enter Password' name="" id="" />

<button onClick={e=>login()} >Login</button>
    </div>
</div>
  )
}

export default Login

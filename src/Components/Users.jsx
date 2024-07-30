import React, { useEffect, useState } from 'react'
import logo2 from '../images/sf.png'
import { GoHomeFill, GoSearch } from "react-icons/go";
import './users.css'
import { MdClose, MdDelete, MdLogout } from "react-icons/md";
import { AiFillBell } from "react-icons/ai";
import { MdInsights } from "react-icons/md";
import axios from 'axios'
import { BiSolidDashboard } from "react-icons/bi";
import { BsClipboard2Data } from "react-icons/bs";
import { SiFormspree } from "react-icons/si";

import Leads from './Leads';
import Form from './Form';
import { tz } from '../tz';
const Users = () => {
const [showadd, setshowadd] = useState(false)
const [useername, setuseername] = useState('')

const [pass, setpass] = useState('')
const [k, setk] = useState(0)
const [sea, setsea] = useState('')
const [email, setemail] = useState('')
const [sums, setsums] = useState(0)
const [user, setuser] = useState(null)
const [userr, setuserr] = useState([])
const [delids, setdelids] = useState([])
function deleteusers(){
    axios.post(`${tz}/deleteusers`,{
        deleteids:delids
    }).then(resa=>{
        console.log(resa)
        axios.get(`${tz}/getall`).then(res=>{
            console.log(res.data)
            setuserr(res.data)
        })
    })
}
useEffect(() => {
    const token=localStorage.getItem('token')
    if(token&&token.length>=12){

        axios.post(`${tz}/verifytoken`,{
            token:token
        }).then(ress=>{
if(ress.data.message==='Expired'){
    window.location.pathname='/login'
}
else{
    axios.get(`${tz}/getall`).then(res=>{
        console.log(res.data)
        setuser(ress.data.message)
        setuserr(res.data)
var sum=0
        res.data.forEach(element => {
          sum=sum+  element.leadsCount.reduce((acc, obj) => acc + obj.leads, 0);
        });
        setsums(sum)
    })
}

        })

    
    }
    else{
        window.location.pathname='login'
    }




  return () => {
    
  }
}, [])
function checkthis(val){
    var t=delids.includes(val)
    if(t){

        setdelids(delids.filter(vl=>vl!==val))

    }
    else{
        setdelids([...delids,val])
    }
}
async function logout(){
    await localStorage.removeItem('token')
    window.location.pathname='/login'
}
    function createaccount(){
        axios.post(`${tz}/createuser`,{
            username:useername,
            email:email,
            password:pass
        }).then(res=>{
            alert('User record is created')
            setshowadd(false)
            axios.get(`${tz}/getall`).then(res=>{
                console.log(res.data)
                setuserr(res.data)
            })
        })

    }
  return (
   <div className="maindash">
    {showadd&&
    
    <div className="bllurr">
        <div className="blurrlogin">
            <MdClose className='clo' onClick={e=>setshowadd(false)} />
    <h3>Create a new user..</h3>
    <h4>Username</h4>
    <input type="text" onChange={e=>setuseername(e.target.value)} placeholder='Enter Username' name="" id="" />
    <h4>Email</h4>
    <input type="text" onChange={e=>setemail(e.target.value)} placeholder='Enter Email' name="" id="" />

    <h4>Password</h4>
    <input type="text" onChange={e=>setpass(e.target.value)} placeholder='Enter Password' name="" id="" />

<button onClick={e=>createaccount()} >Create Account</button>
        </div>
    </div>
    }
    <div className="firstside">
<img src={logo2} alt="" />
<h3 onClick={e=>setk(0)} className={`${k===0?'active':''}`} >


    <BiSolidDashboard className='nkl' />


</h3>
<h3  onClick={e=>setk(1)} className={`${k===1?'active':''}`}>
 
<BsClipboard2Data className='nkl' />


</h3>
<h3  onClick={e=>setk(2)} className={`${k===2?'active':''}`}>
 
<SiFormspree className='nkl' />


</h3>

<h3 onClick={e=>logout()} >
    <MdLogout className='nkl' />

    


</h3>
    </div>
    {
        k===2&&
        <Form user={user} />
    }
 {k===0&&
    <div className="secondside">
    <div className="header">
        <h4>User management </h4>

        <div className="usm">
            <AiFillBell className='bell' />

            <div className="njk">
                U
            </div>
            <div className="name">
                <h1>{user&&user.username}</h1>
                <h6>{user&&user.email}</h6>
            </div>
            
        </div>
    </div>
    <div className="insi">
        <div className="insi1">
            <div className="nk2">
<MdInsights />



            </div>
            <div className="nk3">
                <h5>Leads Generated</h5>
                <h4>{sums}</h4>
            </div>
        </div>
        <div className="insi1">
            <div className="nk2">
<MdInsights />



            </div>
            <div className="nk3">
                <h5>Total Users</h5>
                <h4>{userr.length}</h4>
            </div>
        </div>
        <div className="insi1">
            <div className="nk2">
<MdInsights />



            </div>
            <div className="nk3">
                <h5>Active Users</h5>
                <h4>{userr.length}</h4>
            </div>
        </div>
        <div className="insi1">
            <div className="nk2">
<MdInsights />



            </div>
            <div className="nk3">
                <h5>Inactive Users</h5>
                <h4>0</h4>
            </div>
        </div>
        <div className="insi1">
            <div className="nk2">
<MdInsights />



            </div>
            <div className="nk3">
                <h5>Today Leads</h5>
                <h4>0</h4>
            </div>
        </div>
    </div>
<div className="btninsi">
<div className="searchinp">
    <input type="text" placeholder='Search user' onChange={e=>setsea(e.target.value)} />
    <GoSearch />

</div>
<div className="bttnn">

<button onClick={e=>setshowadd(true)}>+ Create User</button>

<button className='delbtn' onClick={e=>deleteusers()}><MdDelete  /> Delete</button>
</div>
</div>

    <div className="tableinsi">
        <div className="tablehead">
        <div className="che">
                    <input type="checkbox" />
                </div>
            <h1>Name</h1>
            <h1>Email</h1>
            <h1>password</h1>
            <h1>Leads Extracted</h1>
        </div>
        {userr&&userr.map(val=>(

            (sea.length>0?val.username.toLowerCase().search(sea.toLowerCase())>=0:sea===sea)&&

            <>
            
            <div className="tablebody">
                <div className="che">
                    <input onClick={e=>checkthis(val._id)} checked={delids.includes(val._id)} type="checkbox" />
                </div>
                  <h1>{val.username}</h1>
            <h1>{val.email}</h1>
            <h1>{val.password}</h1>
            <h1>{val.leadsCount.reduce((acc, obj) => acc + obj.leads, 0)}</h1>
            </div>
            </>
        ))}
    </div>

</div>}

{k===1&&
<Leads user={user} />

}
   </div>
  )
}

export default Users

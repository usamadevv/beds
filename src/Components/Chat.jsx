import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import phone from '../images/phone.png'
import { BiLogoTelegram } from 'react-icons/bi'
import axios from 'axios'
import { tz } from '../tz'

const Chat = (props) => {
  const [acctivelead, setacctivelead] = useState(null)
  const [msg, setmsg] = useState('')
  const [senderttype, setsenderttype] = useState('Me')
  function changesender(val){
    setsenderttype(val)

  }
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function getCurrentDate() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    return `${month}/${day}/${year}`;
}
  function sendmsg(){
    axios.post(`${tz}/createchat`,{
      senderid:senderttype==='Me'?props.user._id:acctivelead._id,
      sender:senderttype==='Me'?props.user.username:acctivelead.title,
      recieverid:senderttype==='Me'?acctivelead._id:props.user._id,
      reciever:senderttype==='Me'?acctivelead.title:props.user.username,
      msg:msg,
      time:getCurrentTime(),
      date:getCurrentDate(),


    })
    .then(resa=>{
      axios.post(`${tz}/getchatbyreciever`,{id:acctivelead._id}).then(res=>{
        console.log(res)
        setmsgs(res.data)
        setmsg('')
      })
      console.log(resa)
      setTimeout(()=>{
        var element = document.getElementById("cht");
        element.scrollTop = element.scrollHeight+100;
      }, 100); 
    })
  }
const [msgs, setmsgs] = useState([])
  function selectthis(val){

    setacctivelead(val)
    setmsgs([])

    axios.post(`${tz}/getchatbyreciever`,{id:val._id}).then(res=>{
      console.log(res)
      setmsgs(res.data)
  
      setTimeout(()=>{
        var element = document.getElementById("cht");
        element.scrollTop = element.scrollHeight+100;
      }, 100); 
   
    })

  }
  const [leads, setleads] = useState(props.leads)
  return (
   <div className="chatapp">
    <div className="chatfirst">
      <h4>Messages</h4>
      <div className="inputs">
        <AiOutlineSearch />
        <input type="text" placeholder='Search Contacts....'/>
      </div>

      {leads&&leads.map(val=>(
        val.status&&val.status!=='Pending'&&
        <div className="leadchat" onClick={e=>selectthis(val)}>
        <div className="fgr">
          {val.title.charAt(0)}
        </div>
        <div className="descc">
        <h1>{val.title}</h1>
          <div className="pds fx"
                          
                          style={{
                              backgroundColor:val.status==='Contacted'?'rgb(247, 250, 255)':val.status==='Qualified'?'rgb(245, 255, 250)':val.status==='Proposal Sent'?'rgb(254, 248, 255)':val.status==='Negotiation'?'rgb(255, 241, 242)':val.status==='Closed'?'rgb(241, 255, 246)':'rgb(255, 249, 237)',
                              color:val.status==='Contacted'?'rgb(70, 128, 227)':val.status==='Qualified'?'rgb(81, 193, 135)':val.status==='Proposal Sent'?'rgb(181, 92, 195)':val.status==='Negotiation'?'rgb(204, 113, 119)':val.status==='Closed'?'rgb(2, 214, 80)':'rgb(219, 167, 64)',
                              borderColor:val.status==='Contacted'?'rgb(70, 128, 227)':val.status==='Qualified'?'rgb(81, 193, 135)':val.status==='Proposal Sent'?'rgb(181, 92, 195)':val.status==='Negotiation'?'rgb(204, 113, 119)':val.status==='Closed'?'rgb(2, 214, 80)':'rgb(219, 167, 64)',
                     
                     
                     
                          }}
                         >{val.status?val.status:'Pending'}


                         </div>
                         <div className="pho">
                         <img src={phone} alt="" />
                         <p>{val.phone}</p>
                         </div>
        </div>


        </div>
      ))}

    </div>
    <div className="chatsecond">
{acctivelead&&
<>
<div className="chatheader">
<div className="fgr">
          {acctivelead.title.charAt(0)}
        </div>
         <div className="descc">
        <h1>{acctivelead.title}</h1>
       
                      
        </div>


</div>
<div className="chatbody" id='cht'>


  {
    msgs&&msgs.map(val=>(

      acctivelead._id===val.senderid?

      <div className="chatdiv">
        <p>{val.msg}</p>
        <h5>{val.time}</h5>
        <h6>{val.date}</h6>

      </div>
      :
      <div className="chatdiv2">
      <p>{val.msg}</p>
      <h5>{val.time}</h5>
      <h6>{val.date}</h6>

    </div>
    ))
  }

  <div className="inputchat">

  <select name="" id="" onChange={e=>changesender(e.target.value)} >
    <option value="Me">Me</option>
    <option value="Client">Client</option>

    </select>
    <input type="text" onChange={e=>setmsg(e.target.value)} value={msg} placeholder={senderttype==='Me'?'Enter new message':'Enter client response..'} />


    <button onClick={e=>sendmsg()}><BiLogoTelegram /></button>
  </div>


</div>
</>}
    </div>
    
   </div>
  )
}

export default Chat

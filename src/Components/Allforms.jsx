import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdFormatAlignCenter } from 'react-icons/md'
import { tz } from '../tz'

const Allforms = () => {
    const [allforms, setallforms] = useState([])
    const [activeform, setactiveform] = useState({})
    useEffect(() => {
      
        axios.get(`${tz}/getallforms`).then(res=>{
            console.log(res)
            setallforms(res.data)
          })
      return () => {
        
      }
    }, [])
    const [resdata, setresdata] = useState([])
    function getformdata(val){
        setactiveform(val)
        axios.post(`${tz}/getformresbyid`,{
            id:val._id
        }).then(res=>{
            console.log(res)
            setresdata(res.data)
          })
    }
  return (
   <div className="allforms">
    <div className="allform1">
        <h5>All Forms</h5>
    {allforms&&allforms.map(val=>(
            <div className="alf" onClick={e=>getformdata(val)} >
            <div className="mjj">
            <MdFormatAlignCenter />
            </div>
            {val.name}
            </div>
    ))}

    </div>
    <div className="allform2">
        <div className="bgh">
            <div className="bgheader2">
                {activeform&&activeform.elements&&activeform.elements.map(val=>(
                    <div className="iteml">

{val.question}
                    </div>
                )
                )}

            </div>
            {resdata&&resdata.map(val=>(
                <div className="bgheader">
                      {activeform&&activeform.elements&&activeform.elements.map(val2=>(
                   val.answers.map(vl=>(
                   val2.id===vl.id&& vl.question===val2.question&&
                    <div className="iteml">
                        {vl.answer}
                    </div>
                   ))
                )
                )}
                </div>
            ))}


        </div>



    </div>
   </div>
  )
}

export default Allforms

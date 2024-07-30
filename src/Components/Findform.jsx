import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './users.css'
import { tz } from '../tz'
const Findform = () => {

    const [form, setform] = useState({})
    const [formresponses, setformresponses] = useState({})
const [activestep, setactivestep] = useState(0)
    const [answers, setanswers] = useState([])

function createformRsponse(){
    axios.post(`${tz}/createformresponse`,{
        formid:form._id,
        answers:answers

      }).then(res=>{
        console.log(res)
        alert('Form submited ')
        window.close()

      })
}



    useEffect(() => {
        const loc=window.location.pathname
        var loc2=loc.split('/')
        console.log(loc2)
      axios.post(`${tz}/getformbyid`,{
        _id:loc2[2]

      }).then(res=>{
        console.log(res)
        setform(res.data)
        setformresponses({formid:res.data._id})
        setactivestep(0)
        res.data.elements.forEach(element => {
            setanswers(pres=>[...pres,element])

            
        });
      })

    
      return () => {
      
        
      }
    }, [])
    
  return (
    <div className="formpage">
    <div className="formpage1">


    </div>
    <div className="formpage2">
        <div className="formstepss">
            {form&&form.formsteps&&form.formsteps.map((val,index)=>(
<>


<div className="crc">
    {index+1}

</div>
<p>{val.name}</p>
</>
            ))}
        </div>
        <h4>{form&&form.name}</h4>

        {answers&&answers&&answers.map((val,index)=>(
            activestep+1===val.id&&
            <div className="formelement">
                <h5>
                    {val.question}
                    {val.required&&'*'}
                </h5>
           {(val.answertype==='short'||val.answertype==='para')&&
                <input type="text"  
                value={val.answer}
                onChange={e=> setanswers(prevAnswers =>
                    prevAnswers.map((item, i) =>
                      i === index ? { ...item, answer: e.target.value } : item
                    )
                  )}
                />
           }

{(val.answertype==='msqs')&&
                <div className="formmcoptions">
                {val.mcoptions.map(vl=>(
                      <div className="rd1">
                      <input type="radio" onClick={e=>
setanswers(prevAnswers =>
    prevAnswers.map((item, i) =>
      i === index ? { ...item, answer: vl } : item
    )
  )
                        
                      } checked={val.answer===vl?true:false} />
                      <p>{vl}</p>
                  </div>
                ))}
                </div>
           }

{(val.answertype==='chkbox')&&
                <div className="formmcoptions">
                {val.chkboxoptions.map(vl=>(
                      <div className="rd1">
                      <input type="checkbox" onClick={e=>
setanswers(prevAnswers =>
    prevAnswers.map((item, i) => {
      if (i === index) {
        // Get current answers
        const currentAnswers = item.answer ? item.answer.split(',') : [];
        
        // Add or remove the option from the answer array
        const updatedAnswers = currentAnswers.includes(vl)
          ? currentAnswers.filter(a => a !== vl)  // Remove vl if already present
          : [...currentAnswers, vl];              // Add option if not present

        // Join the array into a comma-separated string
        const updatedAnswerString = updatedAnswers.join(',');

        return { ...item, answer: updatedAnswerString };
      }
      return item;
    })
  )
  
  
                      } checked={val.answer&&val.answer.search(vl)>=0?true:false} />
                      <p>{vl}</p>
                  </div>
                ))}
                </div>
           }
           {(val.answertype==='dd')&&
              
                      <select value={val.answer} name="" id="" 
                      onChange={e=>
                        setanswers(prevAnswers =>
                            prevAnswers.map((item, i) =>
                              i === index ? { ...item, answer: e.target.value } : item
                            )
                          )
                                          
                      }
                      >
                      {val.ddoptions.map(vl=>(
                        <option value={vl}>{vl}</option>
                      ))}

                      </select>
                   
              
           }


            </div>
        ))}
     <div className="formelement">
       <div className="ggs">
       {form&&form.formsteps&&
        
        (form.formsteps.length-1===activestep)?

        <>
        {form.formsteps.length-1>=activestep?

             <div className="submitbtnp">
   <button onClick={e=>setactivestep(activestep=>activestep-1)} className='submitbtn pre' >Previous </button>
  
   </div>:
   <></>
        }
         <div className="submitbtnp">
             <button onClick={e=>createformRsponse()} className='submitbtn' >Submit </button>
            
             </div>
        </>

 :
 <>
 {form&&form.formsteps&& (form.formsteps.length-1>=activestep)&& (activestep>0)?
   <div className="submitbtnp">
   <button onClick={e=>setactivestep(activestep=>activestep-1)} className='submitbtn pre' >Previous </button>
  
   </div>:
   <></>
 }
  <div className="submitbtnp">
 <button onClick={e=>setactivestep(activestep=>activestep+1)} className='submitbtn' >Next </button>

 </div>
 </>


        }
    
       </div>
     </div>


    </div>
</div>
  )
}

export default Findform

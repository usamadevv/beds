import React, { useEffect, useState } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { MdDeleteOutline, MdOutlineForest } from 'react-icons/md'
import { Fa1, FaAddressBook, FaCaretDown, FaCircleCheck, FaSearchengin } from "react-icons/fa6";
import { GoMail } from 'react-icons/go';
import { BiCheckSquare, BiPhone, BiUser } from 'react-icons/bi';
import axios from 'axios';
import {FaCheckCircle} from 'react-icons/fa'
import Allforms from './Allforms';
import { tz } from '../tz';

const Form = (props) => {
    const [showdr, setshowdr] = useState(false)
    const [formlink, setformlink] = useState('')
    const [formpublished, setformpublished] = useState(false)
    const [form, setform] = useState([])
    useEffect(() => {
        axios.get(`${tz}/getallforms`).then(res => {
            console.log(res)
        })

        return () => {

        }
    }, [])

    const [Defaultname, setDefaultname] = useState("Untitled Form")
    function createForm() {

        axios.post(`${tz}/createform`, {
            name: Defaultname,
            status: 'Active',
            userid: props.user._id,
            formsteps: formsteps,
            elements: form



        })
            .then(res => {

                setformlink('http://13.59.30.246:3000/form/'+res.data._id)
                setformpublished(true)
                console.log(res)
            })
    }
    function addstep() {
        setformsteps(formstep => [...formstep, {
            name: 'New Form',
            id: formsteps.length + 1
        }])
        setactivestep({
            name: 'New Form',
            id: formsteps.length + 1
        }

        )
    }
    const [formsteps, setformsteps] = useState([{ name: 'New Form', id: 1 }])
    const [activestep, setactivestep] = useState({ name: 'New Form', id: 1 })

    function deletethis(val, index) {
        setform((prevItems) => {
            // Create a new array without the item at the specified index
            return prevItems.filter((_, i) => i !== index);
        });
        setactiveinput({})
    }
    function setactiveinputnew(val) {
        console.log(val)
        console.log(form)
        setactiveinput(val)

    }
    const [elements, setelements] = useState([
        {
            icon: <GoMail className='fgd' />,
            question: 'Email',
            answertype: 'short'

        },
        {
            icon: <BiPhone className='fgd' />,
            question: 'Phone no',
            answertype: 'short'

        }, {
            icon: <BiUser className='fgd' />,
            question: 'Name',
            answertype: 'short'

        },
        {
            icon: <FaAddressBook className='fgd' />,
            question: 'Address',
            answertype: 'short'

        },
        {
            icon: <BiCheckSquare className='fgd' />,
            question: 'Checkbox',
            answertype: 'chkbox'

        },

    ])


    function addthis() {


        setform(form => ([...form, { ...activeinput, id: activestep.id }]))
        setactiveinput({})
        console.log(form)
    }
    function addthiselement(val) {
        var tr = { ...val }
        tr.icon = ''

        setactiveinput(tr)

        console.log(form)
    }
    const [activeinput, setactiveinput] = useState({ chkboxoptions: [''] })
    function changetype(val) {



        setactiveinput(activeinput => ({ ...activeinput, answertype: val }))
        console.log(activeinput)
        console.log(val)
        setshowdr(false)
    }




    const [k, setk] = useState(0)
    function addoption() {


        setactiveinput(prevState => ({
            ...prevState,
            chkboxoptions: prevState.chkboxoptions ? [...prevState.chkboxoptions, ''] : ['']
        }));
        console.log(activeinput)
    }
    function addddoption() {


        setactiveinput(prevState => ({
            ...prevState,
            ddoptions: prevState.ddoptions ? [...prevState.ddoptions, ''] : ['']
        }));
        console.log(activeinput)
    }
    function addmcoption() {


        setactiveinput(prevState => ({
            ...prevState,
            mcoptions: prevState.mcoptions ? [...prevState.mcoptions, ''] : ['']
        }));
        console.log(activeinput)
    }
    return (
        <div className="secondside">
            <div className="header">
                <div className="leadsmenu">
                    <h4>Forms management </h4>
                    <button className={`${k === 0 ? 'activebtn' : ''}`} onClick={e => setk(0)}>+ Create</button>
                    <button onClick={e => setk(1)} className={`${k === 1 ? 'activebtn' : ''}`} >All Forms</button>

                </div>

                <div className="usm">
                    <AiFillBell className='bell' />

                    <div className="njk">
                        U
                    </div>
                    <div className="name">
                        <h1>{props.user.username}</h1>
                        <h6>{props.user.email}</h6>
                    </div>

                </div>
            </div>

            {k === 0 ?
                <div className="formbody">
                    <div className="formheader">
                        <h5>+ Create New Form</h5>
                        <button onClick={e => createForm()}>Publish</button>
                    </div>
                    <div className="formpart">
                        <div className="formpart1">


                            {formsteps.map((val, index) => (
                                val.id === activestep.id ?

                                    <div className="btnop1 btnop1active" onClick={e => setactivestep(val)}>
                                        <div className="crcl">
                                            {val.id}
                                        </div>
                                        <input type="text" value={val.name}
                                            onChange={(e) => {
                                                const newName = e.target.value;
                                                setformsteps((prevState) =>
                                                    prevState.map((item, i) =>
                                                        i === index ? { ...item, name: newName } : item
                                                    )
                                                );
                                            }}
                                            className='inactivestep' />
                                    </div>
                                    :

                                    <div className="btnop1" onClick={e => setactivestep(val)}>
                                        <div className="crcl">
                                            {val.id}
                                        </div>
                                        <input type="text" value={val.name}
                                            onChange={(e) => {
                                                const newName = e.target.value;
                                                setformsteps((prevState) =>
                                                    prevState.map((item, i) =>
                                                        i === index ? { ...item, name: newName } : item
                                                    )
                                                );
                                            }}
                                            className='inactivestep' />
                                    </div>
                            ))}


                            <div className="btnop1" onClick={e => addstep()} >
                                <div className="crcl">
                                    +
                                </div>
                                <p>  Add Step</p>
                            </div>

                        </div>
                       {!formpublished ?
                       
                       <div className="formpart2">
                            <input type="text" className='unt' onChange={e => setDefaultname(e.target.value)} value={Defaultname} />


                            {form && form.map((val, index) => (
                                val.id === activestep.id && <>
                                    {


                                        (activeinput && activeinput.index && activeinput.index === index) ?

                                            <div className="activeinp" >
                                                <MdDeleteOutline className='itemfx' onClick={e => deletethis(val, index)} />
                                                <div className="activeinpheader" >
                                                    <input type="text" placeholder='Question' value={activeinput ? activeinput.question : 'Question'} onChange={e => setactiveinput(activeinput => ({ ...activeinput, question: e.target.value }))} />
                                                    <div className="selectdr" onClick={e => showdr ? setshowdr(false) : setshowdr(true)}   >
                                                        {activeinput.answertype ? activeinput.answertype : 'Choose option'}
                                                        <FaCaretDown />

                                                        {showdr &&
                                                            <div className="dr" onClick={(e) => e.stopPropagation()}>
                                                                <div onClick={e => changetype('chkbox')} > <FaCircleCheck className='chkk' />  Checkboxes</div>
                                                                <div onClick={e => changetype('short')} > <MdOutlineForest className='chkk' />  Short answer</div>
                                                                <div onClick={e => changetype('para')} > <FaCircleCheck className='chkk' />  Paragraph</div>
                                                                <div onClick={e => changetype('msqs')} > <FaCircleCheck className='chkk' />  Multiple Choices</div>
                                                                <div onClick={e => changetype('dd')} > <FaCircleCheck className='chkk' />  Dropdown</div>

                                                            </div>

                                                        }
                                                    </div>
                                                </div>


                                                {activeinput && activeinput.answertype === 'para' &&
                                                    <div className="boxpara">
                                                        <p>Paragraph</p>
                                                    </div>
                                                }

                                                {activeinput && activeinput.answertype === 'short' &&
                                                    <div className="boxpara">
                                                        <p>Short Answer</p>
                                                    </div>
                                                }



                                                {activeinput && activeinput.answertype === 'chkbox' &&

                                                    <>

                                                        {

                                                            activeinput && activeinput.chkboxoptions && activeinput.chkboxoptions.length > 0 &&
                                                            activeinput.chkboxoptions.map((val, index) => (

                                                                <div className="inpopt">
                                                                    <p>{index + 1}</p>
                                                                    <input type="text"
                                                                        placeholder={`Option ${index + 1}`}

                                                                        onChange={e =>
                                                                            setactiveinput(prevState => ({
                                                                                ...prevState,
                                                                                chkboxoptions: prevState.chkboxoptions.map((item, i) =>
                                                                                    i === index ? e.target.value : item
                                                                                )
                                                                            }))
                                                                        }
                                                                    />
                                                                </div>

                                                            ))
                                                        }

                                                        <button onClick={e => addoption()} className='addpp' >+ Add Option</button>


                                                    </>
                                                }

                                                {activeinput && activeinput.answertype === 'dd' &&

                                                    <>

                                                        {

                                                            activeinput && activeinput.ddoptions && activeinput.ddoptions.length > 0 &&
                                                            activeinput.ddoptions.map((val, index) => (
                                                                <div className="inpopt">
                                                                    <p>{index + 1}</p>
                                                                    <input type="text"
                                                                        placeholder={`Option ${index + 1}`}
                                                                        value={val}
                                                                        onChange={e =>
                                                                            setactiveinput(prevState => ({
                                                                                ...prevState,
                                                                                ddoptions: prevState.ddoptions.map((item, i) =>
                                                                                    i === index ? e.target.value : item
                                                                                )
                                                                            }))
                                                                        }
                                                                    />

                                                                </div>

                                                            ))
                                                        }

                                                        <button onClick={e => addddoption()} className='addpp' >+ Add Option</button>


                                                    </>
                                                }
                                                {activeinput && activeinput.answertype === 'msqs' &&

                                                    <>

                                                        {

                                                            activeinput && activeinput.mcoptions && activeinput.mcoptions.length > 0 &&
                                                            activeinput.mcoptions.map((val, index) => (
                                                                <div className="inpopt">
                                                                    <p>{`${index + 1}`}</p>
                                                                    <input type="text"
                                                                        placeholder={`Option ${index + 1}`}
                                                                        value={val}
                                                                        onChange={e =>
                                                                            setactiveinput(prevState => ({
                                                                                ...prevState,
                                                                                mcoptions: prevState.mcoptions.map((item, i) =>
                                                                                    i === index ? e.target.value : item
                                                                                )
                                                                            }))
                                                                        }
                                                                    />
                                                                </div>


                                                            ))
                                                        }

                                                        <button onClick={e => addmcoption()} className='addpp' >+ Add Option</button>


                                                    </>
                                                }

                                                <div className="req">
                                                    <p>Required </p>
                                                    {activeinput.required && activeinput.required ?
                                                        <div className="required" onClick={e =>
                                                            setactiveinput(prevState => ({
                                                                ...prevState,
                                                                required: false
                                                            }))
                                                        } >
                                                            <div className="subrequired">

                                                            </div>
                                                        </div> :
                                                        <div className="required"
                                                            onClick={e =>
                                                                setactiveinput(prevState => ({
                                                                    ...prevState,
                                                                    required: true
                                                                }))
                                                            }>
                                                            <div className="nosubrequired">

                                                            </div>
                                                        </div>

                                                    }

                                                </div>




                                            </div>
                                            :

                                            <div className="activeinpmap" onClick={e => setactiveinputnew({ ...val, index })}  >
                                                <p>{val.question}{val.required && val.required === true && ' *'}</p>



                                                {val && val.answertype === 'para' &&
                                                    <div className="boxparamap">
                                                        <p>{val.question}</p>
                                                    </div>
                                                }


                                                {val && val.answertype === 'chkbox' &&

                                                    <>

                                                        <div className="boxparamap">
                                                            <p>{val.chkboxoptions.length} Options</p>
                                                        </div>




                                                    </>
                                                }

                                                {val && val.answertype === 'dd' &&

                                                    <>


                                                        <div className="boxparamap">
                                                            <p>{val.ddoptions.length} Options</p>
                                                        </div>





                                                    </>
                                                }
                                                {val && val.answertype === 'msqs' &&

                                                    <>


                                                        <div className="boxparamap">
                                                            <p>{val.mcoptions.length} Options</p>
                                                        </div>





                                                    </>
                                                }
                                                {val && val.answertype === 'short' &&

                                                    <>


                                                        <div className="boxparamap">
                                                            <p>{val.question}</p>
                                                        </div>





                                                    </>
                                                }





                                            </div>
                                    }

                                </>
                            ))

                            }

                            {(activeinput.index && activeinput.index <= form.length) ?
                                <></>
                                : <div className="activeinp">
                                    <MdDeleteOutline className='itemfx' />
                                    <div className="activeinpheader" >
                                        <input type="text" placeholder='Question' value={activeinput ? activeinput.question : 'Question'} onChange={e => setactiveinput(activeinput => ({ ...activeinput, question: e.target.value }))} />
                                        <div className="selectdr" onClick={e => showdr ? setshowdr(false) : setshowdr(true)}   >
                                            {activeinput.answertype ? activeinput.answertype : 'Choose option'}
                                            <FaCaretDown />

                                            {showdr &&
                                                <div className="dr" onClick={(e) => e.stopPropagation()}>
                                                    <div onClick={e => changetype('chkbox')} > <FaCircleCheck className='chkk' />  Checkboxes</div>
                                                    <div onClick={e => changetype('short')} > <MdOutlineForest className='chkk' />  Short answer</div>
                                                    <div onClick={e => changetype('para')} > <FaCircleCheck className='chkk' />  Paragraph</div>
                                                    <div onClick={e => changetype('msqs')} > <FaCircleCheck className='chkk' />  Multiple Choices</div>
                                                    <div onClick={e => changetype('dd')} > <FaCircleCheck className='chkk' />  Dropdown</div>

                                                </div>

                                            }
                                        </div>
                                    </div>


                                    {activeinput && activeinput.answertype === 'para' &&
                                        <div className="boxpara">
                                            <p>Paragraph</p>
                                        </div>
                                    }

                                    {activeinput && activeinput.answertype === 'short' &&
                                        <div className="boxpara">
                                            <p>Short Answer</p>
                                        </div>
                                    }



                                    {activeinput && activeinput.answertype === 'chkbox' &&

                                        <>

                                            {

                                                activeinput && activeinput.chkboxoptions && activeinput.chkboxoptions.length > 0 &&
                                                activeinput.chkboxoptions.map((val, index) => (

                                                    <div className="inpopt">
                                                        <p>{index + 1}</p>
                                                        <input type="text"
                                                            placeholder={`Option ${index + 1}`}

                                                            onChange={e =>
                                                                setactiveinput(prevState => ({
                                                                    ...prevState,
                                                                    chkboxoptions: prevState.chkboxoptions.map((item, i) =>
                                                                        i === index ? e.target.value : item
                                                                    )
                                                                }))
                                                            }
                                                        />
                                                    </div>

                                                ))
                                            }

                                            <button onClick={e => addoption()} className='addpp' >+ Add Option</button>


                                        </>
                                    }

                                    {activeinput && activeinput.answertype === 'dd' &&

                                        <>

                                            {

                                                activeinput && activeinput.ddoptions && activeinput.ddoptions.length > 0 &&
                                                activeinput.ddoptions.map((val, index) => (
                                                    <div className="inpopt">
                                                        <p>{index + 1}</p>
                                                        <input type="text"
                                                            placeholder={`Option ${index + 1}`}
                                                            value={val}
                                                            onChange={e =>
                                                                setactiveinput(prevState => ({
                                                                    ...prevState,
                                                                    ddoptions: prevState.ddoptions.map((item, i) =>
                                                                        i === index ? e.target.value : item
                                                                    )
                                                                }))
                                                            }
                                                        />

                                                    </div>

                                                ))
                                            }

                                            <button onClick={e => addddoption()} className='addpp' >+ Add Option</button>


                                        </>
                                    }
                                    {activeinput && activeinput.answertype === 'msqs' &&

                                        <>

                                            {

                                                activeinput && activeinput.mcoptions && activeinput.mcoptions.length > 0 &&
                                                activeinput.mcoptions.map((val, index) => (
                                                    <div className="inpopt">
                                                        <p>{`${index + 1}`}</p>
                                                        <input type="text"
                                                            placeholder={`Option ${index + 1}`}
                                                            value={val}
                                                            onChange={e =>
                                                                setactiveinput(prevState => ({
                                                                    ...prevState,
                                                                    mcoptions: prevState.mcoptions.map((item, i) =>
                                                                        i === index ? e.target.value : item
                                                                    )
                                                                }))
                                                            }
                                                        />
                                                    </div>


                                                ))
                                            }

                                            <button onClick={e => addmcoption()} className='addpp' >+ Add Option</button>


                                        </>
                                    }

                                    <div className="req">
                                        <p>Required </p>
                                        {activeinput.required && activeinput.required ?
                                            <div className="required" onClick={e =>
                                                setactiveinput(prevState => ({
                                                    ...prevState,
                                                    required: false
                                                }))
                                            } >
                                                <div className="subrequired">

                                                </div>
                                            </div> :
                                            <div className="required"
                                                onClick={e =>
                                                    setactiveinput(prevState => ({
                                                        ...prevState,
                                                        required: true
                                                    }))
                                                }>
                                                <div className="nosubrequired">

                                                </div>
                                            </div>

                                        }

                                    </div>




                                </div>

                            }
                            <button className='addmm' onClick={e => addthis()}>+ </button>
                        </div>:
                        <div className="formpart2">
                            <div className="msgbox">
                                <div className="cfd">
                                <FaCheckCircle />

                                </div>
                                <p>Your form is published!</p>
                                <button>Copy Link</button>
                                <p>{formlink&&formlink}</p>

                            </div>

                        </div>
}
                        <div className="formpart3">
                            <div className="inptt">
                                <FaSearchengin className='fas' />
                                <input type="text" placeholder='Search element..' />
                            </div>
                            {elements.map(val => (
                                <div className="rowelement" onClick={e => addthiselement(val)} >
                                    {val.icon}
                                    <p>{val.question}</p>
                                </div>
                            ))}



                        </div>
                    </div>
                </div>

                :
                <Allforms />

            }

        </div>
    )
}

export default Form

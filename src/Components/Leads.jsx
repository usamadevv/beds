import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { GoArrowDown } from 'react-icons/go'
import expo from '../utils/states.json'
import world from '../images/world.png'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import pend from '../images/pend.png'
import prop from '../images/prop.png'
import cont from '../images/cont.png'
import nego from '../images/nego.png'
import qual from '../images/qual.png'
import clos from '../images/clos.png'
import conv from '../images/conv.png'
import total from '../images/total.png'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import phone from '../images/phone.png'
import { PiMicrosoftExcelLogo } from "react-icons/pi";


import map from '../images/map.png'
import Chat from './Chat'
import { tz } from '../tz'
const Leads = (props) => {
    const [leadss, setleadss] = useState([])
    const [data, setData] = useState(null)
const [searchstate, setsearchstate] = useState('')
const [pendleads, setpendleads] = useState(0)
const [qualleads, setqualleads] = useState(0)
const [propleads, setpropleads] = useState(0)
const [contleads, setcontleads] = useState(0)
const [closleads, setclosleads] = useState(0)
const [negoleads, setnegoleads] = useState(0)
const [convrate, setconvrate] = useState(0)
const exportToExcel = () => {

    const keyMapping = {
        title: 'Company',
        category: 'Category',
        createdby: 'Createdby',
        link: 'Website',
        phone: 'Phone',
        bdy: 'Description',
        street: 'Address',
        state: 'State',
        town: 'Town',
        keyword: 'Industry',
        status: 'Status'
      };
      const transformedData = filteredleads.map(item => {
        const newItem = {};
        for (const key in item) {
          if (keyMapping[key]) {
            newItem[keyMapping[key]] = item[key];
          }
        }
        return newItem;
      });
      
    const worksheet = XLSX.utils.json_to_sheet(transformedData);

// Define column widths
const wscols = [
    { wpx: 150 },  { wpx: 150 }, 
    { wpx: 150 },  { wpx: 150 }, 
    { wpx: 150 },  { wpx: 150 },  { wpx: 150 },  { wpx: 150 },  { wpx: 150 },  { wpx: 150 },  { wpx: 150 }// Width for 'Email Address'
  ];
  
  // Apply column widths
  worksheet['!cols'] = wscols;
  
  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
  // Write the Excel file to a buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  
  // Save the file
  
  
  saveAs(blob, `${selectedstatename || 'All_States'}_${selectedtown}_${keyword}.xlsx`);
};
function changestatus(value,val,index){
    console.log(value)
    var lds=leadss
var lead=lds.findIndex(vall=>vall._id===val._id)
lds[lead].status=value
setleadss(lds)

    axios.post(`${tz}/updateleadstatus`,{
        _id:val._id,
        status:value
    }).then(res=>{
        console.log(res)
      alert('Status Updated')
      filterthis()


        })

}

const [searchtown, setsearchtown] = useState('')
    const [filteredleads, setfilteredleads] = useState([])
    const [initialData, setinitialData] = useState(null)
    const [states, setstates] = useState([])
    const [keyword, setkeyword] = useState('')

    const [savedby, setsavedby] = useState('')
    const [selectedstate, setselectedstate] = useState('')
const [userr, setuserr] = useState([])
    const [selectedtown, setselectedtown] = useState('')
    const [selectedstatename, setselectedstatename] = useState('')
    const [towns, settowns] = useState([])
    const [selectedfilter, setselectedfilter] = useState('')
function selectstate(val){
setselectedtown('')
setselectedfilter('')
settowns(val.towns)
setselectedstate(val.id)
setselectedstatename(val.name)

}
function selectuser(val){
    setselectedfilter('')
    setsavedby(val.username)
    
    }
    function  filterthis(){
        console.log(leadss)

    setpendleads(0)
    setpropleads(0)
    setcontleads(0)
    setqualleads(0)
    setnegoleads(0)
    setclosleads(0)
        var filtered=[]
        leadss.forEach(element => {
if(element.town.toLowerCase().search(selectedtown.toLowerCase().replace(' ','-'))>=0&&
element.state.toLowerCase().search(selectedstate.toLowerCase())>=0&&
element.createdbyname.toLowerCase().search(savedby.toLowerCase())>=0&&
        (
element.keyword.toLowerCase().search(keyword.toLowerCase())>=0||
element.category.toLowerCase().search(keyword.toLowerCase())>=0
        )


){

    if(element.status==='Contacted'){
        setcontleads(contleads=>contleads+1)
    }
    else if(element.status==='Negotiation'){
        setnegoleads(negoleads=>negoleads+1)
    }
    else if(element.status==='Proposal Sent'){
        setpropleads(propleads=>propleads+1)
    } else if(element.status==='Closed'){
        setclosleads(closleads=>closleads+1)
    } else if(element.status==='Qualified'){
        setqualleads(qualleads=>qualleads+1)
    } else{
        setpendleads(pendleads=>pendleads+1)
    }

    filtered.push(element)
}
           
setfilteredleads(filtered)
setconvrate((qualleads/filtered.length)*100)

        });
    }
    function  filterthisdata(){
        console.log(leadss)
        const initialData2 = {
            columns: {
              'column-1': {
                _id: 'column-1',
                title:  'Contacted',
                items: []
              },
              'column-2': {
                _id: 'column-2',
                title: 'Closed',
                items: []
              },
              'column-3': {
                _id: 'column-3',
                title: 'Qualified',
                items: []
              },
              'column-4': {
                _id: 'column-4',
                title: 'Negotiation',
                items: []
              }
            },
            itemOrder: ['column-1','column-4',  'column-3','column-2']
          };

    setpendleads(0)
    setpropleads(0)
    setcontleads(0)
    setqualleads(0)
    setnegoleads(0)
    setclosleads(0)
        var filtered=[]
        leadss.forEach(element => {
if(element.town.toLowerCase().search(selectedtown.toLowerCase().replace(' ','-'))>=0&&
element.state.toLowerCase().search(selectedstate.toLowerCase())>=0&&
element.createdbyname.toLowerCase().search(savedby.toLowerCase())>=0&&
(
    element.keyword.toLowerCase().search(keyword.toLowerCase())>=0||
    element.category.toLowerCase().search(keyword.toLowerCase())>=0
            )


){

    if(element.status==='Contacted'){
        setcontleads(contleads=>contleads+1)
        initialData2.columns['column-1'].items.push(element)

    }
    else if(element.status==='Negotiation'){
        setnegoleads(negoleads=>negoleads+1)
        initialData2.columns['column-4'].items.push(element)

    }
    else if(element.status==='Proposal Sent'){
        setpropleads(propleads=>propleads+1)
    } else if(element.status==='Closed'){
        initialData2.columns['column-2'].items.push(element)

        setclosleads(closleads=>closleads+1)
    } else if(element.status==='Qualified'){
        initialData2.columns['column-3'].items.push(element)

        setqualleads(qualleads=>qualleads+1)
    } else{
        setpendleads(pendleads=>pendleads+1)
    }

    filtered.push(element)
    
}
           
setfilteredleads(filtered)
setconvrate((qualleads/filtered.length)*100)
setData(initialData2)
setinitialData(initialData2)

        });
    }
    const [k, setk] = useState(0)
function selecttown(val){

    setselectedfilter('')
    setselectedtown(val)
    
    }
    useEffect(() => {
console.log(props)
        setstates(expo.expo)
      axios.get(`${tz}/getallleads`).then(res=>{


        const initialData2 = {
            columns: {
              'column-1': {
                _id: 'column-1',
                title:  'Contacted',
                items: []
              },
              'column-2': {
                _id: 'column-2',
                title: 'Closed',
                items: []
              },
              'column-3': {
                _id: 'column-3',
                title: 'Qualified',
                items: []
              },
              'column-4': {
                _id: 'column-4',
                title: 'Negotiation',
                items: []
              }
            },
            itemOrder: ['column-1','column-4', 'column-3', 'column-2']
          };
          

        setpendleads(0)
        setpropleads(0)
        setcontleads(0)
        setqualleads(0)
        setnegoleads(0)
        setclosleads(0)
      setleadss(  res.data)
      setfilteredleads(res.data)
      res.data.forEach(element => {
        if(element.status==='Contacted'){
            setcontleads(contleads=>contleads+1)
            initialData2.columns['column-1'].items.push(element)
        }
        else if(element.status==='Negotiation'){
            setnegoleads(negoleads=>negoleads+1)

            initialData2.columns['column-4'].items.push(element)
        }
        else if(element.status==='Proposal Sent'){
            setpropleads(propleads=>propleads+1)
        } else if(element.status==='Closed'){
            initialData2.columns['column-2'].items.push(element)

            setclosleads(closleads=>closleads+1)
        } else if(element.status==='Qualified'){
            initialData2.columns['column-3'].items.push(element)

            setqualleads(qualleads=>qualleads+1)
        } else{
            setpendleads(pendleads=>pendleads+1)
        }
      });

setData(initialData2)
setinitialData(initialData2)

      })


setconvrate((qualleads/filteredleads.length)*100)
      axios.get(`${tz}/getall`).then(res=>{
        console.log(res.data)
        setuserr(res.data)
    })
    
      return () => {
        
      }
    }, [])
    
  
    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
    console.log(draggableId)
    console.log(destination)



        if (!destination) return;
    
        if (type === 'COLUMN') {
          const newColumnOrder = Array.from(data.itemOrder);
          newColumnOrder.splice(source.index, 1);
          newColumnOrder.splice(destination.index, 0, draggableId);
    
          setData({
            ...data,
            itemOrder: newColumnOrder
          });
          return;
        }
    
        const startColumn = data.columns[source.droppableId];
        const finishColumn = data.columns[destination.droppableId];
    
        if (startColumn === finishColumn) {
          const newItemIds = Array.from(startColumn.items);
          newItemIds.splice(source.index, 1);
          newItemIds.splice(destination.index, 0, startColumn.items[source.index]);
    
          setData({
            ...data,
            columns: {
              ...data.columns,
              [startColumn._id]: {
                ...startColumn,
                items: newItemIds
              }
            }
          });
          return;
        }
    
        const startItems = Array.from(startColumn.items);
        const [movedItem] = startItems.splice(source.index, 1);
    
        const finishItems = Array.from(finishColumn.items);
        finishItems.splice(destination.index, 0, movedItem);
    
        setData({
          ...data,
          columns: {
            ...data.columns,
            [startColumn._id]: {
              ...startColumn,
              items: startItems
            },
            [finishColumn._id]: {
              ...finishColumn,
              items: finishItems
            }
          }
        });
        
        var item=filteredleads.find(val=>val._id===draggableId)
        if(destination.droppableId==='column-1'){
            changestatus('Contacted',item,0)

        }
        else  if(destination.droppableId==='column-4'){
            changestatus('Negotiation',item,0)

        }  else  if(destination.droppableId==='column-3'){
            changestatus('Qualified',item,0)

        }  else  if(destination.droppableId==='column-2'){
            changestatus('Closed',item,0)

        }
      };
    
     
        
    
    
  return (
 <div className="secondside">
  <div className="header">
       <div className="leadsmenu">
       <h4>Leads management </h4>
        <button className={`${k===0?'activebtn':''}`} onClick={e=>setk(0)}>Leads</button>
        <button onClick={e=>setk(1)} className={`${k===1?'activebtn':''}`} >CRM</button>

        <button onClick={e=>setk(2)} className={`${k===2?'activebtn':''}`} >Chat</button>
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
    {data&&k===1&&

<>
 <div className="filters filters2">
  <div className="buttton" onClick={e=>selectedfilter==='state'?setselectedfilter(''):setselectedfilter('state')}>
  {
  !selectedstatename?'State':selectedstatename}
  <GoArrowDown/>

{selectedfilter==='state'&&

<div className="fixedbox" onClick={(e) => e.stopPropagation()}>
<input type="text" placeholder='Search state..' onChange={e=>setsearchstate(e.target.value)} />
{states&&states.map(val=>(
         (searchstate.length===0?searchstate.length===0:val.name.toLowerCase().search(searchstate.toLowerCase())>=0)&&
    <div className="menuitem" onClick={e=>selectstate(val)}>

        {val.name}
    </div>
))}
</div>}
  </div>
  <div className="buttton" onClick={e=>selectedfilter==='town'?setselectedfilter(''):setselectedfilter('town')}>
      {
  !selectedtown?'Town':selectedtown}
  <GoArrowDown/>

{selectedfilter==='town'&&

<div className="fixedbox" onClick={(e) => e.stopPropagation()}>
<input type="text" placeholder='Search town..'  onChange={e=>setsearchtown(e.target.value)} />      {towns&&towns.map(val=>(
    (searchtown.length===0?searchtown.length===0:val.toLowerCase().search(searchtown.toLowerCase())>=0)&&
    
    <div className="menuitem" onClick={e=>selecttown(val)}>

        {val}
    </div>
))}
</div>}
  </div>
  <div className="buttton" onClick={e=>selectedfilter==='savedby'?setselectedfilter(''):setselectedfilter('savedby')}>
      {
  !savedby?'Saved by':savedby}
  <GoArrowDown/>

{selectedfilter==='savedby'&&

<div className="fixedbox" onClick={(e) => e.stopPropagation()}>
<input type="text" placeholder='Search user..' />      {userr&&userr.map(val=>(
    <div className="menuitem" onClick={e=>selectuser(val)}>

        {val.username}
    </div>
))}
</div>}
  </div>
  <input type="text" className='buttton' value={keyword} onChange={e=>setkeyword(e.target.value)} placeholder='Industry' />

  <div className="bttnn2">
      <button onClick={e=>filterthisdata()}>Search</button>
  </div>
  <button className='expo' onClick={e=>exportToExcel()}> <PiMicrosoftExcelLogo className='exp' /> Export</button>
</div>
<DragDropContext onDragEnd={onDragEnd}>
<Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
  {(provided) => (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className="columns-container"
    >
      {data.itemOrder.map((columnId, index) => {
        const column = data.columns[columnId];

        return (
          <Droppable key={column._id} droppableId={column._id} direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="column"
              >
                <div className="hedr">
                 <h3>{column.title}</h3>
                 <h5>{column.title} Leads</h5>
                </div>
                {column.items.map((item, index) => (
                  <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="item"
                      >
                         <div className="pd fx"
                          
                          style={{
                              backgroundColor:item.status==='Contacted'?'rgb(247, 250, 255)':item.status==='Qualified'?'rgb(245, 255, 250)':item.status==='Proposal Sent'?'rgb(254, 248, 255)':item.status==='Negotiation'?'rgb(255, 241, 242)':item.status==='Closed'?'rgb(241, 255, 246)':'rgb(255, 249, 237)',
                              color:item.status==='Contacted'?'rgb(70, 128, 227)':item.status==='Qualified'?'rgb(81, 193, 135)':item.status==='Proposal Sent'?'rgb(181, 92, 195)':item.status==='Negotiation'?'rgb(204, 113, 119)':item.status==='Closed'?'rgb(2, 214, 80)':'rgb(219, 167, 64)',
                              borderColor:item.status==='Contacted'?'rgb(70, 128, 227)':item.status==='Qualified'?'rgb(81, 193, 135)':item.status==='Proposal Sent'?'rgb(181, 92, 195)':item.status==='Negotiation'?'rgb(204, 113, 119)':item.status==='Closed'?'rgb(2, 214, 80)':'rgb(219, 167, 64)',
                     
                     
                     
                          }}
                         >{item.status?item.status:'Pending'}


                         </div>
                        <h1>{item.title} </h1>
                        <h3>{item.category}</h3>
                        <div className="pho">
                         <img src={phone} alt="" />
                         <p>{item.phone}</p>
                         <h4 className='wsp'>
          
          {item.link&&
          <div className="ws" onClick={e=>window.location=item.link}>
              <img src={world} alt="" />
             

          </div>
}
       
       </h4>
                        </div>
                        <div className="pro">
                         <div className="fgr">
                             {item.createdbyname.charAt(0)}
                         </div>
                         <p>{item.createdbyname}</p>
                        </div>
                        <h6>
                         <img src={map} alt="" />
                         {item.street}
                        </h6>

                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.status}
              </div>
            )}
          </Droppable>
        );
      })}
      {provided.status}
    </div>
  )}
</Droppable>
</DragDropContext>
</>
 }
    

    {
k===0&&
<>
<div className="stats">
 
 <div className="stats1">
    <p>Total Leads</p>
    <h3>{filteredleads.length}</h3>
    <h4>Analysis of All time</h4>

    <div className="cfs"
    style={{
     backgroundColor:'rgb(245, 245, 245)',
    }}
    >
     <img src={total} alt="" />
    </div>
 </div>
 <div className="stats1">
    <p>Contacted Leads</p>
    <h3>{contleads}</h3>
    <h4>Analysis of All time</h4>

    <div className="cfs"
    style={{
     backgroundColor:'rgb(247, 250, 255)'
    }}
    >
     <img src={cont} alt="" />
    </div>
 </div>
 <div className="stats1">
    <p>Qualified Leads</p>
    <h3>{qualleads}</h3>
    <h4>Analysis of All time</h4>

    <div className="cfs"
    style={{
     backgroundColor:'rgb(245, 255, 250)',
    }}
    >
     <img src={qual} alt="" />
    </div>
 </div>
 <div className="stats1">
    <p>Conversion Rate</p>
    <h3>{convrate} %</h3>
    <h4>Analysis of All time</h4>

    <div className="cfs"
    style={{
     backgroundColor:'rgb(247, 250, 255)',
    }}
    >
     <img src={conv} alt="" />
    </div>
 </div>
 <div className="stats1">
    <p>Pending Leads</p>
    <h3>{pendleads}</h3>
    <h4>Analysis of All time</h4>

    <div className="cfs"
    style={{
     backgroundColor:'rgb(255, 249, 237)',
    }}
    >
     <img src={pend} alt="" />
    </div>
 </div>
 <div className="stats1">
    <p>Closed Leads</p>
    <h3>{closleads}</h3>
    <h4>Analysis of All time</h4>

    <div className="cfs" style={{
                 backgroundColor:'rgb(241, 255, 246)',
    }}>
     <img src={clos} alt="" />
    </div>
 </div>
 <div className="stats1">
    <p>Negotiation Leads</p>
    <h3>{negoleads}</h3>
    <h4>Analysis of All time</h4>

    <div className="cfs" style={{
                 backgroundColor:'rgb(255, 241, 242)',
    }}>
     <img src={nego} alt="" />
    </div>
 </div>
 <div className="stats1">
    <p>Proposal Sent</p>
    <h3>{propleads}</h3>
    <h4>Analysis of All time</h4>

    <div className="cfs" style={{
                 backgroundColor:'rgb(254, 248, 255)',
    }}>
     <img src={prop} alt="" />
    </div>
 </div>
</div>
 <div className="filters">
     <div className="buttton" onClick={e=>selectedfilter==='state'?setselectedfilter(''):setselectedfilter('state')}>
     {
     !selectedstatename?'State':selectedstatename}
     <GoArrowDown/>

   {selectedfilter==='state'&&
   
   <div className="fixedbox" onClick={(e) => e.stopPropagation()}>
   <input type="text" placeholder='Search state..' onChange={e=>setsearchstate(e.target.value)} />
   {states&&states.map(val=>(
            (searchstate.length===0?searchstate.length===0:val.name.toLowerCase().search(searchstate.toLowerCase())>=0)&&
       <div className="menuitem" onClick={e=>selectstate(val)}>

           {val.name}
       </div>
   ))}
</div>}
     </div>
     <div className="buttton" onClick={e=>selectedfilter==='town'?setselectedfilter(''):setselectedfilter('town')}>
         {
     !selectedtown?'Town':selectedtown}
     <GoArrowDown/>

   {selectedfilter==='town'&&
   
   <div className="fixedbox" onClick={(e) => e.stopPropagation()}>
<input type="text" placeholder='Search town..'  onChange={e=>setsearchtown(e.target.value)} />      {towns&&towns.map(val=>(
       (searchtown.length===0?searchtown.length===0:val.toLowerCase().search(searchtown.toLowerCase())>=0)&&
       
       <div className="menuitem" onClick={e=>selecttown(val)}>

           {val}
       </div>
   ))}
</div>}
     </div>
     <div className="buttton" onClick={e=>selectedfilter==='savedby'?setselectedfilter(''):setselectedfilter('savedby')}>
         {
     !savedby?'Saved by':savedby}
     <GoArrowDown/>

   {selectedfilter==='savedby'&&
   
   <div className="fixedbox" onClick={(e) => e.stopPropagation()}>
<input type="text" placeholder='Search user..' />      {userr&&userr.map(val=>(
       <div className="menuitem" onClick={e=>selectuser(val)}>

           {val.username}
       </div>
   ))}
</div>}
     </div>
     <input type="text" className='buttton' value={keyword} onChange={e=>setkeyword(e.target.value)} placeholder='Industry' />

     <div className="bttnn2">
         <button onClick={e=>filterthis()}>Search</button>
     </div>
     <button className='expo' onClick={e=>exportToExcel()}> <PiMicrosoftExcelLogo className='exp' /> Export</button>
 </div>


 <div className="tablec">
     <div className="tableh">
         <h4>
             COMPANY 
         </h4>
         <h4 className='ind'>
             INDUSTRY 
         </h4>
         <h4 className='add'> 
             ADDRESS 
         </h4>
      

         <h4>
             PHONE 
         </h4>
         <h4 className='kwp'>
             Keyword 
         </h4>
         <h4 className='pdp'>
             STATUS 
         </h4>
         <h4 className='wsp'>
             WEBSITE 
         </h4>
         <h4 className='kwps'>
             STATE 
         </h4>
         <h4 className='pdp'>
             TOWN 
         </h4>
         <h4>
             SAVED BY 
         </h4>
   
     </div>

        {filteredleads&&filteredleads.map(vl=>(
          <div className="tableb">
          <h4>
              {vl.title} 
          </h4>
          <h4 className='ind'>
              {vl.category} 
          </h4>
          <h4 className='add'>
             <img src={map} className='mpim' alt="" />
              {vl.street} 
          </h4>
       

          <h4 className='ph'>
             <img src={phone} alt="" />
              {vl.phone} 
          </h4>
          <h4 className='kwp'>
       <div className="kw">
       {vl.keyword} 
       </div>
          </h4>
          <h4 className='pdp'>
     <select name="" id="" className='pd'
     
     
     value={vl.status?vl.status:'Pending'}
     style={{
         backgroundColor:vl.status==='Contacted'?'rgb(247, 250, 255)':vl.status==='Qualified'?'rgb(245, 255, 250)':vl.status==='Proposal Sent'?'rgb(254, 248, 255)':vl.status==='Negotiation'?'rgb(255, 241, 242)':vl.status==='Closed'?'rgb(241, 255, 246)':'rgb(255, 249, 237)',
         color:vl.status==='Contacted'?'rgb(70, 128, 227)':vl.status==='Qualified'?'rgb(81, 193, 135)':vl.status==='Proposal Sent'?'rgb(181, 92, 195)':vl.status==='Negotiation'?'rgb(204, 113, 119)':vl.status==='Closed'?'rgb(2, 214, 80)':'rgb(219, 167, 64)',
         borderColor:vl.status==='Contacted'?'rgb(70, 128, 227)':vl.status==='Qualified'?'rgb(81, 193, 135)':vl.status==='Proposal Sent'?'rgb(181, 92, 195)':vl.status==='Negotiation'?'rgb(204, 113, 119)':vl.status==='Closed'?'rgb(2, 214, 80)':'rgb(219, 167, 64)',



     }}
     
     onChange={e=>changestatus(e.target.value,vl)}>
<option value="Pending">Pending</option>
<option value="Contacted">Contacted</option>
<option value="Qualified">Qualified</option>
<option value="Proposal Sent">Proposal Sent</option>
<option value="Negotiation">Negotiation</option>
<option value="Closed">Closed</option>

     </select>
          </h4>
          <h4 className='wsp'>
             
             {vl.link&&
             <div className="ws" onClick={e=>window.location=vl.link}>
                 <img src={world} alt="" />
                 {new URL(vl.link).hostname}

             </div>
}
          
          </h4>
          <h4 className='kwps'>
              {vl.state.toUpperCase()} 
          </h4>
          <h4 className='pdp'>
              {vl.town} 
          </h4>
          <h4 >
{vl.createdbyname}             </h4>
      </div>
        ))}
     
 </div>
</>

    }
    {k===2&&
    <Chat leads={leadss} user={props.user} />

    }
  
 </div>
  )
}

export default Leads

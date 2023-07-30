import './App.css';
import { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection, getDocs, addDoc } from '@firebase/firestore'

function App() {

  const [news,setNews] = useState([])
  const Database = collection(db,"News")
  const [title,setTitle] = useState('')
  const [addnews,setAddnews] = useState('')

  const Addnews = async (e)=>{
    e.preventDefault()
    await addDoc(Database, {title: title,news : addnews})
  }

  useEffect(()=>{

      const getNews = async ()=>{
        const data = await getDocs(Database)
        setNews(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
      }
      getNews() 
  },[Database])
  return (
    <div className="App">
      <div className='add'>
        <input 
        placeholder='Title'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        <input 
        placeholder='News'
        value={addnews}
        onChange={(e)=>setAddnews(e.target.value)}
        />
        <button onClick={Addnews}>ADD NEWS</button>
      </div>
      {
        news.map((data,id)=>(
          <div key={id}>
            <h1>{data.title}</h1>
            <p>{data.news}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App;

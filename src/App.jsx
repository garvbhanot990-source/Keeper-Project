import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import {useState,useEffect} from "react";
import Note from "./components/Note";
import "./App.css";

function App(){
    const [note,setnote]=useState([]);
    useState(()=>{
        const savedNotes= localStorage.getItem("KeeperNotes");
        if(savedNotes){
            setnote(JSON.parse(savedNotes))
        }
    },[])


    useEffect(()=>{
        localStorage.setItem("KeeperNotes" , JSON.stringify(note));
    },[note])

    function addNote(newNote){
        console.log(newNote)
        setnote(prevNotes=>{
            return [...prevNotes,newNote];
        });
    }

    function deleteNotes(id){
        setnote(prevNotes=>{
            return(
                prevNotes.filter((note,index)=>{
                    return index !== id;
                })
            )
        })
    }

  
    return(
        <>
        <Header />
        <CreateArea onAdd={addNote} />
        {note.map((note,index)=>(
            <Note key={index} id={index} title={note.title} content={note.content} onDelete={deleteNotes} />
        ))}
        </>
    )
}

export default App;
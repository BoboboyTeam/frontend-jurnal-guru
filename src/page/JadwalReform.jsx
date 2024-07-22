import React from 'react'
import { useParams } from 'react-router-dom';
import FormJP from '../components/FormJP';

const JadwalReform = () => {
    
    const {id} = useParams();
    if(id){
    return (
        <FormJP id={id}/>
    ) 
    }
    else{
        return (
            <FormJP/>
        )
    }
}

export default JadwalReform
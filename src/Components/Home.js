import React, { useEffect, useState } from 'react';
import "../Assets/css/Home.css"
import  weather_image from  "../Assets/Images/watercolor-weather-effects-collection_23-2149115331-removebg-preview.png"
import hum from "../Assets/Images/istockphoto-1144539511-612x612-removebg-preview.png"
import sun from "../Assets/Images/sun-removebg-preview.png"
import rain from "../Assets/Images/images__1_-removebg-preview.png"
import mist from "../Assets/Images/images-removebg-preview.png"
import Clodu from "../Assets/Images/download-removebg-preview.png"
import wind from "../Assets/Images/watercolor-weather-effects-collection_23-2149115331-removebg-preview (1).png"
import drizzle from "../Assets/Images/1600px_COLOURBOX56165775-removebg-preview.png"
import axios from 'axios';


function Home() {
    const [data , setdata] = useState({
        name :"Enter CityName in Search bar ",
        humidity :20,
        celsius : 4,
        speed :10,
        image :sun,
        type :""
    })
    const [name , setname] = useState("")
    const [error , seterror ] = useState("")

    const handclick = () => {
        if(name !== ""){
             const axiosapi = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=af3f538e5d116ac5ff8d766e10aaaf5c&units=metric`
            axios.get(axiosapi)
            .then (result => {
                let imagepath ="";
                if(result.data.weather[0].main == "Clouds"){
                    imagepath  = Clodu 
                }
                else if (result.data.weather[0].main == "Mist"){
                    imagepath  = mist
                }
                else if(result.data.weather[0].main == "rain"){
                    imagepath =rain
                }
                else if(result.data.weather[0].main == "Deizzle"){
                    imagepath =drizzle
                }
                else if(result.data.weather[0].main == "Clear"){
                    imagepath =sun
                }
                else{
                    imagepath =sun
                }
                setdata({...data, celsius:result.data.main.temp, name:result.data.name, humidity:result.data.main.humidity, speed:result.data.wind.speed, type:result.data.weather[0].main, image:imagepath})
                console.log(result.data)
                seterror("")
            })
            .catch(err =>{
                if(err.response.status == 404){
                    seterror("invalid city")
                }
                else{
                    seterror("")
                }
            }  )
        }
    }

  return (
    <div className='container'>
   <div className='main'>
      <h1 className='Head'>Weather</h1>
            <div className='search'>
            <input type='text' placeholder='Enter Place name'onChange={e => setname(e.target.value)} />
                <i class="fa-solid fa-magnifying-glass-location"  onClick={handclick}></i>
            </div>  
            <div className='error'>
                <p>{error}</p>
            </div>
                <div className='image'>
                    <img src={data.image} alt='image is not found'/>
                </div>
                    <div className='winfo'>
                        <h1>{data.celsius}°C {data.type}</h1>
                        <h2>{data.name}</h2>
                    </div>
                        <div className='Humdity_wind'>
                               <div className='Humdity'>
                               <img src={hum} alt='' />
                                    <div>
                                        <p>{Math.round(data.humidity)} %</p>
                                        <h5>Humidity</h5>
                                    </div> 
                                </div> 
                                <div className='wind'>
                                        <img src={wind} alt='wind'/>
                                        <div style={{marginLeft:"20px"}}>
                                        <p>{data.speed} Km/h</p>
                                        <h5>Wind</h5>
                                    </div> 
                                </div>
                        </div>
                        
   </div>
    </div>
  )
}

export default Home
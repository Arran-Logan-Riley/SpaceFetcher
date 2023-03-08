import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import styleSheet from '../styles/app.module.css'

import React, { useState, useEffect } from 'react';


const inter = Inter({ subsets: ['latin'] })

function spacexApi(){
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.spacexdata.com/v5/launches/latest');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
    console.log(data);
  }, []);

  //Check the Fail State of the vehicle
  function checkFailState(failData){
    let failState = ''
    if( Object.keys(failData).length == 0){
      failState = "No Fails Were Reported";
    }else{
      failState = failData;
    }
    return failState;
  }
  //Check if inaugural flight of core
  function checkFirstFlight(flightNumber){
    let flightCheckReturn = ""
    if(flightNumber == 1){
      flightCheckReturn = "1 <Inaugural Flight of Core>";
    }else{
      flightCheckReturn = flightNumber;
    }
    return flightCheckReturn;
  }

  function makeUpperCase(name){
    return name.toUpperCase();
  }

  return (
    <div>
      {data ? (
        <div className={styleSheet.card}>
          <div className={styleSheet.container}>
          <h1 className={styleSheet.NasaFont}>{makeUpperCase(data.name)}</h1>
          <p className={styleSheet.spaceAge}>Flight Number : {data.flight_number}</p>
          <p className={styleSheet.spaceAge}>Core Number Of Flights : {checkFirstFlight(data.cores[0].flight)}</p>
          <p className={styleSheet.spaceAge}>Rocket ID : {data.rocket}</p>
          <p className={styleSheet.spaceAge}>Success : {data.success.toString()}</p>
          <p className={styleSheet.spaceAge}>Landing Attempt : {data.cores[0].landing_attempt.toString()}</p>
          <p className={styleSheet.spaceAge}>Landing Success: {data.cores[0].landing_success.toString()}</p>
          <p className={styleSheet.spaceAge}>Date Of Launch : {data.date_utc.toString()}</p>
          <p className={styleSheet.spaceAge}>Fail States : {checkFailState(data.failures)}</p>
          <p className={styleSheet.spaceAge}>Video: <a href='https://youtu.be/5EwW8ZkArL4' target="_blank">Click To View Web Cast</a></p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function Testing(){
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('api/spacejsx');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1 className={styleSheet.spaceAgeBig}>{data.name}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default function Home() {
  return (
    <div>
      {Testing()}
      {spacexApi()}
    </div>
  )
}

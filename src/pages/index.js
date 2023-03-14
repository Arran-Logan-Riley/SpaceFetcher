import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import styleSheet from '../styles/app.module.css'

import React, { useState, useEffect } from 'react';


const inter = Inter({ subsets: ['latin'] })

function postOwnRocketEntryToAWS() {
  const [nameOfRocket, setNameOfRocket] = useState('');
  const [nameOfPayload, setNameOfPayload] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()


    const formData = {
      nameOfRocket,
      nameOfPayload
    }

    const response = await fetch('/api/spacex-user-created-rocket', {
      method: "POST",
      body: JSON.stringify(formData),
    })
    if (response.status == 200) {
      console.log('Post Success')
    } else {
      console.log('Post Faliure')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Name Of Rocket
        <input type='text' value={nameOfRocket} onChange={(e) => setNameOfRocket(e.target.value)} />
      </label>
      <label>
        Enter Name Of Payload
        <input type='text' value={nameOfPayload} onChange={(e) => setNameOfPayload(e.target.value)} />
      </label>
      <label>
        Submit
        <button type='submit'>Submit</button>
      </label>
    </form>
  )
};

//This component takes in a number from the user. This number is than passed to /api/spacex-api-req-history.js end point. 
//This will than send a request to https://api.spacexdata.com/v3/launches/${id}
function spaceXHistoricalApiComp() {
  //set the launch ID and launchData to "" and null to be used later
  const [launchId, setLaunchId] = useState('');
  const [launchData, setLaunchData] = useState(null);

  //Async event handler that will be called in <input>
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`/api/spacex-api-req-history?id=${launchId}`);
    const data = await response.json();
    setLaunchData(data);
  }

  return (
    <div className={styleSheet.card}>
      <div className={styleSheet.container}>
        <form onSubmit={handleSubmit}>
          <h1 className={`${styleSheet.NasaFont} ${styleSheet.cardTitleStyle}`}>{launchData && (
            <pre>{launchData.mission_name}</pre>
          )}</h1>
          <label className={styleSheet.spaceAge}>
            Search For Flight Using Flight Number:
            <input type="number" value={launchId} onChange={(event) => setLaunchId(event.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
        {launchData && (
          <pre className={styleSheet.spaceAge}>{JSON.stringify(launchData, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

function spacexApi() {
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
  function checkFailState(failData) {
    let failState = ''
    if (Object.keys(failData).length == 0) {
      failState = "No Fails Were Reported";
    } else {
      failState = failData;
    }
    return failState;
  }
  //Check if inaugural flight of core
  function checkFirstFlight(flightNumber) {
    let flightCheckReturn = ""
    if (flightNumber == 1) {
      flightCheckReturn = "1 <Inaugural Flight of Core>";
    } else {
      flightCheckReturn = flightNumber;
    }
    return flightCheckReturn;
  }

  function makeUpperCase(name) {
    return name.toUpperCase();
  }

  return (
    <div>
      {data ? (
        <div className={styleSheet.card}>
          <div className={styleSheet.container}>
            <h1 className={`${styleSheet.NasaFont} ${styleSheet.cardTitleStyle}`}>{makeUpperCase(data.name)}</h1>
            <p className={styleSheet.spaceAge}>Latest Flight</p>
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

function Testing() {
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
          <h1 className={`${styleSheet.spaceAgeBig} ${styleSheet.titleStyle}`}>{data.name}</h1>
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
      {spaceXHistoricalApiComp()}
      {postOwnRocketEntryToAWS()}
    </div>
  )
}

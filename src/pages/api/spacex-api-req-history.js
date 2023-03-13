export default async function handler(req, res) {
    const { id } = req.query; // Get the launch ID from the query parameter
    const response = await fetch(`https://api.spacexdata.com/v3/launches/${id}`);
    const data = await response.json();
    let sendObj = {
        mission_name: data.mission_name,
        flight_number: data.flight_number,
        launch_date_utc: data.launch_date_utc,
        rocket: data.rocket.rocket_name,
        first_stage_flightNum: data.rocket.first_stage.cores[0].flight,
        first_stage_serial: data.rocket.first_stage.cores[0].core_serial,
        block: data.rocket.first_stage.cores[0].block,
        landing_intent: data.rocket.first_stage.cores[0].landing_intent,
        land_success: data.rocket.first_stage.cores[0].land_success
    }
    res.status(200).json(sendObj);
    console.log(data);
    console.log(`SpaceX API (Historical) function has been activated for launch ${id}`);
  }
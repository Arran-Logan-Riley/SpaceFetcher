export default function handler(req, res) {
    res.status(200).json({ name: '< Flight Tracker >', numberOfFlightsToDisplay: '10' })
  }
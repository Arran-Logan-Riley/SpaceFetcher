export default function handler(req, res) {
    res.status(200).json({ name: 'Flight Track', numberOfFlightsToDisplay: '10' })
  }
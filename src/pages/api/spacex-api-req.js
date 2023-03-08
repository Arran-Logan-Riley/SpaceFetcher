export default async function handler(req, res) {
    const response = await fetch('https://api.spacexdata.com/v5/launches/latest');
    const data = await response.json();
    res.status(200).json(data);
    print(data)
    print('spacex api funcion has been activated');
}
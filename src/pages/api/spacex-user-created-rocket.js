export default async function handler(request, res){
    if (request.method === "POST"){
        const { nameOfRocket, nameOfPayload} = JSON.parse(req.body)

        //somehow send to aws using an API post method
        
        res.status(200).json({ message: 'Form submitted successfully!' })
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  }

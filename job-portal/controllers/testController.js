export const testpostController = (req,res)=>{
    const {name} = req.body
    res.status(200).send(`your name is ${name}`)
}

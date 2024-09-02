export default userTransitions = async (req,res)=> {
    const address = req.params
    try {
        const response = await fetch(etherscan_url);   
        let transition_history = await response.json();   
        if(transition_history.message !== "OK"){
            return res.send(400).json({message: "error occured enter a valid address"});
        }

    } catch (error) {
        console.log("error occured")
    }
}
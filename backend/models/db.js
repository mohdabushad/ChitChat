const mongoose=require('mongoose')

const Dburl =process.env.DBURL
const Connectdb=async()=>{
    try {
        await mongoose.connect(Dburl)
        console.log("db is connectb")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}

module.exports={Connectdb}

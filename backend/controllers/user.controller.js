import { asyncHandler } from '../utils/AsyncHandler.js'

const handleUserInformation = asyncHandler( async (req, res) => {
    return res.json({
        msg : "Server working"
    })
})



export {
    handleUserInformation
}
import jwt from 'jsonwebtoken'

const auth = async (req ,res, next) => {
    try {
        // console.log(req.headers)
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500

        let decodedData

        if(token && isCustomAuth){
            decodedData =jwt.verify(token, 'secretkey')
            req.userId = decodedData?.id
        } else if ( token ) {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub //googles name for an specific id for a google user
        } else {
            res.status(401).json({ message: 'Unknown Token' })
        }

        console.log('auth signed', req.userId)

        next()
    } catch (error) { 
        res.status(401).json({ message: error })
    }
}

export default auth
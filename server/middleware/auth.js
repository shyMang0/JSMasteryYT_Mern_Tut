import jwt from 'jsonwebtoken';

const auth = async (req ,res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            decodeData =jwt.verify(token, 'secretkey');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; //googles name for an specific id for a google user
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;
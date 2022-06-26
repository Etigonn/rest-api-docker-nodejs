export default{
    jwtSecret : process.env.JWT_SECRET || 'JXzah7JDAu3zyDW',
    DB : {
        URI: process.env.MONGODB_URI || 'mongodb://mongodb:27017',
        USER : process.env.MOBGODB_USER,
        PASSWORD : process.env.MONGO_PASSWORD,
    }
}
export const {
    PORT = 3001,
    MONGO_URI = 'mongodb+srv://Taksh:Takshsoni%409@cluster0.2wvff9g.mongodb.net/?retryWrites=true&w=majority',

    SESS_NAME = 'sid',
    SESS_SECRET = 'secret!session', //must be defined in heroku when you deploy
    SESS_LIFETIME = 1000*60*60*2
} = process.env
class Constants {
    static DB_CONNECTION_STRING: string = process.env.NODE_ENV === 'production' ? process.env.dbURI : "mongodb://testUser:test@ds054999.mlab.com:54999/georgianapp"
}
Object.seal(Constants);
export = Constants;

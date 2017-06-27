// @flow

import mongoose from 'mongoose'
// load models


const connect = (uri: string) => {
  mongoose.connect(uri)
  // plug in the promise library:
  mongoose.Promise = global.Promise

  mongoose.connection.on('error', (err) => {
    // eslint-disable-next-line
    console.error(`Mongoose connection error: ${err}`)
    process.exit(1)
  })
}

export default connect

const streamifier = require('streamifier')
const ftp = require('basic-ftp')
const {logConsole,errorConsole} = require('@thesuhu/colorconsole')

const ftpconfig = {
    host: process.env.FTP_HOST || 'localhost',
    port: process.env.FTP_PORT || 21,
    user: process.env.FTP_USR || 'anonymous',
    password: process.env.FTP_PWD || '',
    secure: process.env.FTP_SECURE || false
}

exports.uploadstream = async (reqFiles, remotepath) => {
    var client = new ftp.Client()
    client.ftp.verbose = false
    try {
        await client.access(ftpconfig)
        await client.uploadFrom(streamifier.createReadStream(reqFiles.data), remotepath)
        client.close()
        logConsole('Upload successful')
    } catch (err) {
        client.close()
        errorConsole(err.message)
    }
}

exports.uploadfile = async(localFile, remoteFile) => {
    // to do ...
}

exports.downloadfile = async(localFile, remoteFile) => {
    // to do ...
}
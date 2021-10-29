const streamifier = require('streamifier')
const ftp = require('basic-ftp')
const path = require('path')
const { logConsole, errorConsole } = require('@thesuhu/colorconsole')

const ftpconfig = {
    host: process.env.FTP_HOST || 'localhost',
    port: process.env.FTP_PORT || 21,
    user: process.env.FTP_USR || 'anonymous',
    password: process.env.FTP_PWD || '',
    secure: process.env.FTP_SECURE || false
}

exports.uploadstream = async (buffer, remoteFile) => {
    var client = new ftp.Client()
    client.ftp.verbose = false
    try {
        await client.access(ftpconfig)
        await client.ensureDir(path.parse(remoteFile).dir)
        await client.uploadFrom(streamifier.createReadStream(buffer), remoteFile)
        client.close()
        logConsole('Upload successful')
        return { message: 'Upload successful' }
    } catch (err) {
        client.close()
        errorConsole(err.message)
        return { message: err.message }
    }
}

exports.uploadfile = async (localFile, remoteFile) => {
    // to do ...
}

exports.downloadfile = async (localFile, remoteFile) => {
    var client = new ftp.Client()
    client.ftp.verbose = false
    try {
        await client.access(ftpconfig)
        await client.downloadTo(localFile, remoteFile)
        client.close()
        logConsole('Download successful')
        return { message: 'Download successful' }
    } catch (err) {
        client.close()
        errorConsole(err.message)
        return { message: err.message }
    }
}
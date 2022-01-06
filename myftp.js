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
console.log(ftpconfig)
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
    var client = new ftp.Client()
    client.ftp.verbose = false
    try {
        await client.access(ftpconfig)
        await client.uploadFrom(localFile, remoteFile)
        client.close()
        logConsole('Upload successful')
        return { message: 'Upload successful' }
    } catch (err) {
        client.close()
        errorConsole(err.message)
        return { message: err.message }
    }    
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

exports.multiuploadstream = async (arrBuffer, arrRemotefile) => {
    var client = new ftp.Client()
    client.ftp.verbose = false
    await client.access(ftpconfig)
    var statusupload = []
    for (let i = 0; i < arrBuffer.length; i++) {
        try {
            await client.ensureDir(path.parse(arrRemotefile[i]).dir)
            await client.uploadFrom(streamifier.createReadStream(arrBuffer[i]), arrRemotefile[i])
            logConsole('Index: ' + i + ', upload successful')
            statusupload.push({ index: i, message: 'Upload successful' })
        } catch (err) {
            errorConsole('Index: ' + i + ', ' + err.message)
            statusupload.push({ index: i, message: 'err.message' })
        }
    }
    client.close()
    return statusupload
}
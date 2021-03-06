# myftp

[![npm](https://img.shields.io/npm/v/myftp.svg?style=flat-square)](https://www.npmjs.com/package/@thesuhu/myftp)
[![Build Status](https://img.shields.io/travis/thesuhu/myftp.svg?branch=main&style=flat-square)](https://app.travis-ci.com/thesuhu/myftp)
[![license](https://img.shields.io/github/license/thesuhu/myftp?style=flat-square)](https://github.com/thesuhu/myftp/blob/master/LICENSE)

Work with FTP easily.

## Install

`
npm install myftp --save
`

## Variables

This module will read four environment variables. If it doesn't find the related environment variable it will read the default value.

* **FTP_HOST:** FTP server address. (default: `localhost`) 
* **FTP_PORT:** FTP port. (default: `21`)
* **FTP_USR:** FTP users. (default: `anonymous`)
* **FTP_PWD:** FTP password. (default: no password)

## Usage

Below is an example upload using method `POST` and headers `Content-Type: multipart/form-data`. In this example using `express` framework, so requires package `express-fileupload` and add this line in `app.js/index.js`.

```js
const fileupload = require('express-fileupload')
app.use(fileupload())
```

then the following module will work fine. 

```js
const { uploadstream } = require('myftp')

router.post('/upload', async (req, res) => {
    // FILENAME is key from form-data, replace with yours
    var buffer = req.files.FILENAME.data 
    var filename = req.files.FILENAME.name 
    var remoteFile = '/test/' + filename

    // upload to FTP
    var retval = await uploadstream(buffer, remoteFile)
    console.log(retval)
    res.send(retval.message) // retval.message will be "Upload successful" if no error
})
```
Below is an example multiple file upload using method `POST` and headers `Content-Type: multipart/form-data`. In this example using `express` framework, so requires package `express-fileupload` and add this line in `app.js/index.js`.

```js
const fileupload = require('express-fileupload')
app.use(fileupload())
```

then the following module will work fine. 

```js
const { multiuploadstream } = require('myftp')

router.post('/upload', async (req, res) => {
    var files = Object.values(req.files)        
    var arrBuffer = []
    var arrRemoteFile = []

    files.forEach((element) => {
        arrBuffer.push(element.data)
        arrRemoteFile.push('/test/' + element.name)
    })

    // upload to FTP
    var retval = await multiuploadstream(arrBuffer, arrRemoteFile)
    console.log(retval)
    res.send(retval) // retval is an array

    // [
    //     { index: 0, message: 'Upload successful' },
    //     { index: 1, message: 'Upload successful' }
    // ]   
})
```

Below is an example download file from FTP server to local directory.

```js
const { downloadfile } = require('myftp')

var localFile = './temp/test.txt'
var remoteFile = '/test.txt'
var retval = downloadfile(localFile, remoteFile) 
console.log(retval.message) // retval.message will be "Download successful" if no error
```

Below is an example upload file from local directory to FTP server.

```js
const { uploadfile } = require('myftp')

var localFile = './temp/test.txt'
var remoteFile = '/test.txt'
var retval = uploadfile(localFile, remoteFile) 
console.log(retval.message) // retval.message will be "Upload successful" if no error
```

Below is an example of getting a list of directories on the FTP server.

```js
\\ TO DO
```

Below is an example upload CSV file from JSON data. this is additional method to convert JSON data to CSV file and upload to FTP server.

```js
\\ TO DO
```

## License

[MIT](https://github.com/thesuhu/myftp/blob/master/LICENSE)
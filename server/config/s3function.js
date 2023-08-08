const crypto = require('crypto')
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: process.env.S3_BUCKET_REGION
});

const uploadFileToS3 = async (file) => {
    const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
    const fileName = randomFileName();
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    return fileName;
};

exports.getFileByFilename = (files, filename) => {
    return files.find((file) => file.fieldname === filename);
};

exports.uploadFileToS3 = async (file) => {
    const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
    const fileName = randomFileName();
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    return fileName;
};

exports.getLink = async (fileName) => {
    const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
    }
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 1800 });
    return url;
}

exports.uploadMultipleFilesToS3 = async (files) => {
    const uploadPromises = files.map(file => uploadFileToS3(file));

    try {
        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error) {
        console.error('Error uploading files:', error);
        return [];
    }
}
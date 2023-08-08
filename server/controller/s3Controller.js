require('dotenv').config();
const crypto = require('crypto')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const region = process.env.S3_BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

module.exports.signS3URL = async (req, res, next) => {
    const { fileType } = req.body;

    const fileName = `${randomFileName()}.${fileType}`;

    let s3Params;
    if (fileType == "pdf") {
        s3Params = {
            Bucket: bucketName,
            Key: fileName,
            ContentType: "application/pdf"
        };
        console.log("PDF")
    }
    else if (fileType == "image") {
        s3Params = {
            Bucket: bucketName,
            Key: fileName,
            ContentType: "image/png"
        };
    }
    else {
        s3Params = {
            Bucket: bucketName,
            Key: fileName
        };
    }

    const s3 = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
        signatureVersion: "v4",
    });
    const command = new PutObjectCommand(s3Params);

    try {
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
        res.json({ signedUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error." });
    }
};

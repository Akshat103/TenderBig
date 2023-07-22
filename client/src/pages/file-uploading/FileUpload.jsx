async function uploadFileToS3(file, fileType) {
    try {
        // Step 1: Get the signed URL for file upload
        const { signedUrl } = await fetch('http://localhost:5000/apitender/s3/uploadurl')
            .then((response) => response.json());

       // Step 2: Upload the file to S3 using the signed URL
        await fetch(signedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: file,
        });

        // Step 3: Extract the file URL
        const fileUrl = signedUrl.split('?')[0];

        return fileUrl;
    } catch (error) {
        console.error(error);
        // Handle error
        throw new Error('File upload to S3 failed.');
    }
}

export default uploadFileToS3;
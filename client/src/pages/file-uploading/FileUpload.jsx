
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

async function uploadFileToS3(file, fileType) {
    try {
        const token = localStorage.getItem('token');

        // Step 1: Get the signed URL for file upload
        const { signedUrl } = await fetch(`${BASE_URL}/s3/uploadurl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                auth:token
            },
            body: JSON.stringify({ fileType }),
        }).then((response) => response.json());

        // Step 2: Upload the file to S3 using the signed URL
        try {
            await fetch(signedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': fileType === 'pdf' ? 'application/pdf' : 'image/jpeg',
                    auth:token
                },
                body: file,
            });
            // Step 3: Extract the file URL
            const fileUrl = signedUrl.split('?')[0];

            return fileUrl;
        }
        catch (error) {
            console.error(error);
        }

    } catch (error) {
        console.error(error);
        // Handle error
        throw new Error('File upload to S3 failed.');
    }
}

export default uploadFileToS3;
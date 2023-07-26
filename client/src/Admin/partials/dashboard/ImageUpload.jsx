import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import ImageGallery from './ImageGallery';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ImageUploadForm = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const token = localStorage.getItem('token');

    const handleFileSelect = (files) => {
        setSelectedFiles(files);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('images', file);
        });
        setIsUploading(true);
        try {
            const response = await axios.post(`${BASE_URL}/images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    auth:token
                },
            });
            setIsUploading(false);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        <div className="grid grid-cols-15 gap-6">
                            <div className="flex flex-col items-center space-y-4 border-gray-600 border-4 rounded-sm p-2 cursor-pointer ">
                                <Dropzone
                                    onDrop={handleFileSelect}
                                    accept=".jpg,.png"
                                    multiple
                                    className={classNames(
                                        'border-4 border-dashed rounded-lg p-4',
                                        { 'border-blue-500': selectedFiles.length > 0 },
                                        { 'border-gray-300': selectedFiles.length === 0 }
                                    )}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()} className="w-full text-center">
                                            <input {...getInputProps()} />
                                            {selectedFiles.length === 0 ? (
                                                <p>Drag 'n' drop some images here, or click to select files</p>
                                            ) : (
                                                <div>
                                                    <p>{selectedFiles.length} file(s) selected</p>
                                                    <ul className="list-disc list-inside">
                                                        {selectedFiles.map((file, index) => (
                                                            <li key={index}>{file.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Dropzone>
                                <button
                                    onClick={handleFileUpload}
                                    disabled={selectedFiles.length === 0}
                                    className={classNames(
                                        'px-4 py-2 rounded-lg text-white',
                                        { 'bg-blue-500': selectedFiles.length > 0 },
                                        { 'bg-gray-300 cursor-not-allowed': selectedFiles.length === 0 }
                                    )}
                                >
                                    Upload Images
                                </button>
                            </div>
                            {isUploading ? (
                                <p>Uploading images...</p>
                            ) : (
                                <ImageGallery />
                            )}
                        </div>


                    </div>
    );
};

export default ImageUploadForm;

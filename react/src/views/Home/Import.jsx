import React, { useState } from 'react';
import axiosClient from '../../axios-client'

const CsvUpload = () => {
    const fileRef = React.useRef();
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('csv_file', file);

        axiosClient.post('/import-products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((result) => {
                fileRef.current.value = ""
                setStatus({ type: 'success' });
            }).catch((err) => {
                const response = err.response;
                if (response) {
                    setStatus({ type: 'error', errors: response.data.errors });
                }
            });
    };

    return (
        <div>

            {status?.type === 'success' && <div className="success">
                <p>CSV uploaded successfully</p>
            </div>
            }

            {status?.type === 'error' && <div className="alert">
                {Object.keys(status.errors).map(key => (
                    <p key={key}>{status.errors[key]}</p>
                ))}
            </div>
            }

            <input type="file" onChange={handleFileChange} ref={fileRef} />
            <button className='btn-add' onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default CsvUpload;

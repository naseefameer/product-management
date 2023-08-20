import { useState } from 'react';
import axiosClient from '../../axios-client'

const CsvUpload = () => {
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(null)
    const [errors, setErrors] = useState(null)

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
                setSuccess({ "status": 200 })
            }).catch((err) => {
                const response = err.response;
                if (response) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div>

            {success &&
                <div className="success">
                    <p>CSV uploaded successfully</p>
                </div>
            }

            {errors &&
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key]}</p>
                    ))}
                </div>
            }

            <input type="file" onChange={handleFileChange} />
            <button className='btn-add' onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default CsvUpload;

import React, { useState } from 'react';
import { Box, LinearProgress, Typography, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { styled } from '@mui/system';
import UploadIcon from './assets/Icon.png';
import SuccessIcon from './assets/Success.png';
import ErrorIcon from './assets/errorIcon.png';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0A1828DE'

        },
        secondary: {
            main: '#0A182899'
        }
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        primary: {
            // fontWeight: 'bold',
            fontSize: '0.9rem',
        },
        secondary: {
            fontWeight: 'normal',
            fontSize: '0.7rem',
        },
    }
});

const FileDisplay = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    border: '1px solid',
    borderRadius: '5px',
    backgroundColor: '#ffffff',
    marginTop: '10px',
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
    border: '1px dashed #c4c4c4',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'left',
    minWidth:'200px',

    '.fileInfo': {
        flex: 1,
        marginLeft: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    '.fileIcon': {
        marginRight: '10px',
        color: theme.palette.success.main,
    },
    '.closeButton': {
        marginLeft: '10px',
        cursor: 'pointer',
    },
    '.progressBar': {
        marginTop:'10px',
        maxWidth:'200px',
        borderRadius: '10px', 
    }
}));

const FileUploader = ({
    // acceptedTypes
    // An array containing the accepted MIME types for file uploads. 
    // Each string represents the type of a file, dictating what kind of files can be uploaded.
    // Example:
    // 'image/png' allows PNG image files
    // 'image/jpeg' allows JPEG image files
    // 'application/pdf' allows PDF files
    // If a user attempts to upload a file type that's not in this list, it will be rejected.
    acceptedTypes = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf'],

    // maxFileSizeMB
    // The maximum file size allowed for uploads, specified in megabytes.
    // If a user tries to upload a file that's larger than this size, it will be rejected.
    maxFileSizeMB = 3,

    // uploadMessage
    // A string message that prompts users to upload a file.
    // This message will be displayed in the uploader when no file has been chosen.
    uploadMessage = "Click to upload",

    // errorMessage
    // A custom error message that will be shown if there's an issue during file upload.
    // For example, this could be due to server issues or any other problems that might arise during the upload process.
    errorMessage = "Custom error message  - Failed",

    // uploaderURL
    // The URL endpoint to which the file will be uploaded using an HTTP POST request.
    // This is where the client-side uploader sends the file data to be processed and stored server-side.
    uploaderURL = "http://localhost:5001/upload",

    // defaultFileName
    // A default placeholder string that indicates the expected name or type of the file to be uploaded.
    // It acts as a guideline or hint for the user, and it is displayed in the uploader when no file is selected.
    defaultFileName = "Name of the file to upload",
}) => {
    // Various states to manage file upload progress, alerts, and UI interactivity.
    // uploadState & setUploadState
    // This state keeps track of the current status of the file upload process.
    // Possible values include:
    // 'idle' - No file has been selected or uploaded yet, awaiting user action.
    // 'uploading' - File is currently being uploaded to the server.
    // 'complete' - File upload has been successfully completed.
    // 'error' - There was an issue during the file upload.
    const [uploadState, setUploadState] = useState('idle');

    // uploadProgress & setUploadProgress
    // This state represents the current progress of the file upload in percentage.
    // The value ranges from 0 to 100, where:
    // 0 means no progress (initial state or start of upload).
    // 100 means the upload is complete.
    const [uploadProgress, setUploadProgress] = useState(0);

    // file & setFile
    // This state stores the file object chosen by the user for upload.
    // The file object contains information about the file, such as its name, type, and size.
    // Initially set to null, indicating no file has been selected.
    const [file, setFile] = useState(null);

    // alertMessage & setAlertMessage
    // This state holds the message to be displayed in the Snackbar alert.
    // Snackbar is a brief message about an operation at the bottom of the screen.
    // This message could be a success message, error notification, or other information related to the upload.
    // Initially set to an empty string, indicating no message to display.
    const [alertMessage, setAlertMessage] = useState('');

    // alertSeverity & setAlertSeverity
    // This state determines the style of the Snackbar alert based on its nature.
    // Possible values include:
    // 'info' - General informational messages.
    // 'success' - Positive messages indicating a successful action.
    // 'error' - Error messages indicating something went wrong.
    // 'warning' - Warning messages indicating a potential problem or caution.
    // Initially set to 'info'.
    const [alertSeverity, setAlertSeverity] = useState('info');

    // Handle the selection of a file.
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // Checking for file type and size restrictions.
        if (!acceptedTypes.includes(selectedFile.type)) {
            setAlertSeverity('error');
            setAlertMessage('Invalid file type.');
            return;
        }

        if (selectedFile.size > maxFileSizeMB * 1024 * 1024) {
            setAlertSeverity('error');
            setAlertMessage(`File size exceeds the limit of ${maxFileSizeMB}MB.`);
            return;
        }

        // If all checks pass, proceed with the upload.
        setFile(selectedFile);
        handleUpload(selectedFile);
    };

    // Upload the selected file to the server.
    const handleUpload = (fileToUpload) => {
        const formData = new FormData();
        formData.append('file', fileToUpload);

        // Axios is used here to handle HTTP POST request.
        axios.post(uploaderURL, formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
                if (percentCompleted === 100) {
                    setUploadState('complete');
                }
            },
        }).then(response => {
            setUploadState('complete');
            setAlertSeverity('success');
            setAlertMessage('File uploaded successfully!');
        }).catch(error => {
            setUploadState('error');
            setAlertSeverity('error');
            setAlertMessage('File upload failed. Please try again.');
        });
    };

    // Reset to default state when user wants to remove or after an error.
    const handleReset = () => {
        setUploadState('idle');
        setFile(null);
        setUploadProgress(0);
    };

    // Utility to display accepted file extensions to the user.
    const acceptedExtensions = acceptedTypes.map(type => '.' + type.split('/')[1]).join(', ');

    return (
        <ThemeProvider theme={theme}>
            <Box>
                { /* UI while no file is being uploaded. */}
                {uploadState === 'idle' && (
                    <FileDisplay>
                        <img src={UploadIcon} alt="Upload Icon" className="fileIcon" />
                        <div className="fileInfo">
                            <Typography variant="primary">{defaultFileName}</Typography>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                id="file-input"
                                accept={acceptedTypes.join(',')}
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="file-input"
                                style={{
                                    display: 'block',
                                    textDecoration: 'underline',
                                    textDecorationColor: theme.palette.primary.main,
                                    cursor: 'pointer'
                                }}
                            >
                                <Typography color="primary" variant="secondary" component="span">
                                    {uploadMessage}
                                </Typography>
                            </label>
                            <Typography variant="secondary" color="secondary">
                                {
                                    acceptedExtensions.split(',')
                                        .map(ext => ext.replace('.', '').toUpperCase())
                                        .slice(0, -1).join(', ') + (acceptedExtensions.split(',').length > 1 ? ' or ' : '')
                                    + acceptedExtensions.split(',').slice(-1).join().replace('.', '').toUpperCase()
                                } (max: {maxFileSizeMB}MB)
                            </Typography>
                        </div>
                    </FileDisplay>
                )}

                { /* UI during and after the upload is complete. */}
                {(uploadState === 'uploading' || uploadState === 'complete') && (
                    <FileDisplay>
                        <Typography className="fileIcon" component="span">
                            {uploadState === 'complete' ? <img src={SuccessIcon} alt="Upload Success" /> : ''}
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                            <Typography variant="primary" color="primary">{file.name}</Typography>
                            <Typography variant="secondary" color="secondary">{(file.size / 1024).toFixed(2)}kb - {uploadState === 'complete' ? 'Complete' : 'Loading...'}</Typography>
                            <LinearProgress
                                variant="determinate"
                                value={uploadProgress}
                                className="progressBar"
                                color={uploadState === 'complete' ? 'primary' : 'secondary'}
                            />
                        </div>
                        <Typography className="closeButton" onClick={handleReset}>
                            ×
                        </Typography>
                    </FileDisplay>
                )}

                { /* UI when an error occurs during upload. */}
                {uploadState === 'error' && (
                    <FileDisplay>
                        <img src={ErrorIcon} alt="Upload Error" />
                        <div className="fileInfo">
                            <Typography variant="primary" color="primary">{file.name}</Typography>
                            <Typography variant="secondary" style={{ color: '#ff0000' }}>{errorMessage}</Typography>
                        </div>
                        <Typography className="closeButton" onClick={handleReset}>
                            ×
                        </Typography>
                    </FileDisplay>
                )}

                { /* Snackbar to display alerts/messages to the user. */}
                <Snackbar
                    open={alertMessage !== ''}
                    autoHideDuration={4000}
                    onClose={() => setAlertMessage('')}
                >
                    <Alert onClose={() => setAlertMessage('')} severity={alertSeverity}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default FileUploader;

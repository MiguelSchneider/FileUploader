# React File Uploader Component

This project contains a React component for uploading files using a modern, styled interface. It leverages Material UI for styling and Axios for making HTTP requests.

## Features

- File type validation
- File size validation
- Progress bar for upload status
- Snackbar notifications for user alerts
- Customizable themes and messages

## Installation

To use this component in your project, you can copy the `FileUploader.js` file into your React project and make sure to install the required dependencies.

```bash
npm install @mui/material @mui/system axios
## Usage

To use the `FileUploader` component, you need to import it into your React component and then use it like any other component:

```jsx
import React from 'react';
import FileUploader from './path-to-FileUploader';

function App() {
    return (
        <div>
            <FileUploader
                acceptedTypes={['image/png', 'image/jpeg', 'image/gif', 'application/pdf']}
                maxFileSizeMB={3}
                uploadMessage="Click or drag file to upload"
                errorMessage="Upload failed - please try again"
                uploaderURL="http://your-api-endpoint/upload"
                defaultFileName="Your file name or instructions here"
            />
        </div>
    );
}

export default App;
```

## Props

Here's a list of all the props that you can pass to the `FileUploader` component:

- `acceptedTypes`: An array of strings representing the MIME types allowed for upload.
- `maxFileSizeMB`: A number representing the maximum file size allowed for upload in megabytes.
- `uploadMessage`: A string representing the message displayed on the upload button.
- `errorMessage`: A string representing the message displayed when an error occurs during the upload process.
- `uploaderURL`: A string representing the server endpoint to which the files are uploaded.
- `defaultFileName`: A string representing the default file name displayed before any file is uploaded.

## Theming

The component uses a default theme provided by Material UI's `createTheme`. You can customize this theme by modifying the theme object in the `FileUploader.js` or by passing a custom theme to the `ThemeProvider` that wraps the `FileUploader` component.

## Dependencies

- `@mui/material`: For Material UI components.
- `@mui/system`: For Material UI system styles.
- `axios`: For making HTTP requests.
- `react`: For the React framework.

## Contributing

We welcome contributions to this project. Please fork the repository, make your changes, and open a pull request back to the main repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

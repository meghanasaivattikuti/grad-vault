import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Box, Button, Select, MenuItem, Typography } from '@mui/material';
import { config } from '../config/env'; // Import config

const Upload = () => {
  console.log('Environment Config:', config);
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({
    semester: '',
    subject: ''
  });
  const [uploadStatus, setUploadStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus('Uploading...');

    try {
      // Initialize S3 Client
      const s3Client = new S3Client({
        region: process.env.REACT_APP_AWS_REGION,
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,     // grad-vault user's access key
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY  // grad-vault user's secret key
        }
      });

      //  file path
      const fileName = `${metadata.semester}/${metadata.subject}/${file.name}`;

      //  upload command
      const command = new PutObjectCommand({
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: fileName,
        Body: file,
        Metadata: {
          semester: metadata.semester,
          subject: metadata.subject
        }
      });

      await s3Client.send(command);
      setUploadStatus('Upload Successful!');
      console.log('File uploaded successfully');

    } catch (error) {
      console.error('Upload Error:', error);
      setUploadStatus('Upload Failed: ' + error.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Upload Document
      </Typography>
      <form onSubmit={handleSubmit}>
        <Select
          fullWidth
          margin="normal"
          value={metadata.semester}
          onChange={(e) => setMetadata({...metadata, semester: e.target.value})}
          sx={{ mb: 2 }}
        >
            <MenuItem value="Spring 2023">Spring 2023</MenuItem>
            <MenuItem value="Fall 2022">Fall 2022</MenuItem>
            <MenuItem value="Fall 2023">Spring 2023</MenuItem>
            <MenuItem value="Fall 2023">Fall 2023</MenuItem>
            <MenuItem value="Spring 2024">Spring 2024</MenuItem>
            <MenuItem value="Summer 2024">Summer 2024</MenuItem>
            
        </Select>

        <Select
          fullWidth
          margin="normal"
          value={metadata.subject}
          onChange={(e) => setMetadata({...metadata, subject: e.target.value})}
          sx={{ mb: 2 }}
        >
          <MenuItem value="PSA">Program Structures and Algorithms</MenuItem>
            <MenuItem value="CC">Network Structures and Cloud Computing</MenuItem>
            <MenuItem value="AED">Application Engineering and Development</MenuItem>
            <MenuItem value="DSEM">Data Science Engineering Methods and Tools</MenuItem>
            <MenuItem value="DMDD">Data Management</MenuItem>
            <MenuItem value="AS">Agile Systems</MenuItem>
            <MenuItem value="ABI">Advanced Big Data Indexing</MenuItem>
            <MenuItem value="WD">Web Development</MenuItem>
            <MenuItem value="Research">Research Papers</MenuItem>
            <MenuItem value="Information">Information</MenuItem>
        </Select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: '20px' }}
        />

        <Button 
          variant="contained" 
          type="submit"
          fullWidth
          disabled={!file || !metadata.semester || !metadata.subject}
        >
          Upload
        </Button>

        {uploadStatus && (
          <Typography 
            sx={{ mt: 2 }} 
            color={uploadStatus.includes('Failed') ? 'error' : 'success'}
          >
            {uploadStatus}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default Upload;
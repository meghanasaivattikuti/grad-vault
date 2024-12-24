import AWS from 'aws-sdk';


AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'your-identity-pool-id'
  })
});

const s3 = new AWS.S3();
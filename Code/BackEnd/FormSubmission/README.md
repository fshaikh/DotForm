Install aws cli >= 1.11.19
aws configure
aws s3 mb s3://formbuilder-bucket
npm run package - This will upload the code to S3 bucket and create a new
                  template file with updated CodeUri value pointing to S3 bucket
npm run deploy
                - This will deploy the template to AWS creating the serverless resources

When Lambda function is depending on NPM packages, we need to bundle the packages before  uploading to S3.
You can exclude aws-sdk package as its included by default by AWS Lambda
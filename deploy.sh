npm run build
aws s3 cp dist s3://woomin-facebook --recursive --acl public-read

let AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = function (event, context, callback) {
    let receiver = event['queryStringParameters']['receiver'];
    let sender = event['queryStringParameters']['sender'];
    let message = event['queryStringParameters']['message'];
    let isPromotional = true;
    console.log("Sending message", message, "to receiver", receiver);
    sns.publish({
        Message: message,
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                'DataType': 'String',
                'StringValue': 'Promotional'
            },
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': sender
            }
        },
        PhoneNumber: receiver
    }).promise()
        .then(data => {
            console.log("Sent message to", receiver);
            callback(null, {
                "isBase64Encoded": false,
                "statusCode": 200,
                "body": JSON.stringify(data)
            });
        })
        .catch(err => {
            console.log("Sending failed", err);
            callback(err);
            // error handling goes here
        });

}
let AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = function (event, context, callback) {
    let recipient_addr = event['queryStringParameters']['recipient_addr'];
    let account = event['queryStringParameters']['account'];
    let password = event['queryStringParameters']['password'];
    let sender_addr = event['queryStringParameters']['sender_addr'];
    let sender_name = event['queryStringParameters']['sender_name'];
    let message = event['queryStringParameters']['message'];
    let isPromotional = true;
    console.log("Sending message", message, "to receiver", recipient_addr);
    sns.publish({
        Message: message,
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                'DataType': 'String',
                'StringValue': 'Promotional'
            },
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': sender_addr
            }
        },
        PhoneNumber: recipient_addr
    }).promise()
        .then(data => {
            console.log("Sent message to", recipient_addr);
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
# email_microservice
### microservice to send email based on POST Request from classmate

## Summary:
This email microservice is specific to a classmates application project that they are building to create good habits by users. The user will accomplish a certain milestone a certain number of units to be determined by the classmate. The expectation is that the good habits app will send a HTTP Post Request with the following information relayed about the user.

### Request Data Form:
  - user's first name key = first_name
  - user's last name key = last_name
  - user's email key = email
  - quantity of milestone key = quantity
  - unit of measure of milestone key = measure
  - milestone key = milestone

For example if Thomas Dogooder, with the email TDog@outlook.com, accomplished 10 days of running in the good habit app, then the Post request would have the following information included:

  - req.body.first_name = "Thomas"
  - req.body.last_name = "Dogooder"
  - req.body.email = "TDog@outlook.com"
  - req.body.quantity = "10"
  - req.body.measure = "days"
  - req.body.milestone = "running"

An email text would be generated based on those inputs requested in the "Post" API call. Then the email would be sent using Nodemailer and the imitation emailing program called Ethereal Email. 

### Return Info Received:
  > [!IMPORTANT]
  > {"accepted":["nutos@open.com"],"rejected":[],"ehlo":["PIPELINING","8BITMIME","SMTPUTF8","AUTH LOGIN PLAIN"],"envelopeTime":602,"messageTime":445,"messageSize":1628,"response":"250 Accepted [STATUS=new MSGID=Zdfgw.BRgEWXfYm4Zdvxz0XpHMXMElx4AAAAERe5rwRAVHKncVc9ldcSuCU]","envelope":{"from":"maryse.ward61@ethereal.email","to":["nutos@open.com"]},"messageId":"<076d074f-dbe6-162f-e4c2-889f0c4f2819@ethereal.email>"}

### Dependencies: 
The dependencies used for this microservice are express, nodemailer, and bodyParser.

The nodemailer program is very easy to use and further details can be found at this webpage: nodemailer.com . To use the ethereal email properly it is important to register a user and password from the Ethereal Email webpage: ethereal.email .

> [!NOTE]
> This username and password generated can then be input into the authorization portion of the nodemailer.createTransport() function. 

After the message is created and the connect has been made, the sendMail() function is called and this initiates the email to the user email, as well as the response message back to the good habits application POST request URL, completing the message return.

### UML Sequence Diagram:
The below represents the communication involved in this email microservice. It starts with a user action of marking a habit milestone completion. Then the Habit application sends an API Post request to the email microservice. The microservice establishes a connection to the Email Service and formats an email based on the Post request information provided. The email info message is transmitted to the Email service and the Email Service sends out the email message. Along with the email message sent to the user, the email service sends back a success message to the email microservice, which forwards this on to the Habit Application to notify that the milestone congrats email was successful.

  ![image](https://github.com/nich-OSU/email_microservice/assets/122307669/2d85a7c6-9d13-439f-b90e-ef9e59979f10)


### Adaptations: 
Adaptations can be made by changing information in the nodemailer.createTransport() function, by adjusting the POST request info and within the message creation object. Additionally, further adaptation can occur through the transporter.sendMail() function by adjusting what return messages are displayed.

### Testing purposes:
To ensure this microservice worked, I created a FORM HTML page to input the data required in the POST request message. This allowed me to fill the role of the Good Habits app through the use of the form page. Pressing the submit button on the form made the Post Request to the address/Port established in the App.js file. 

> [!NOTE]
> The website of the microservice is on the school server that is only reachable through the use of the school VPN. 
  http://flip3.engr.oregonstate.edu:1776/
  

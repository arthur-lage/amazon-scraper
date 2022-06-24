<h1>Amazon Scraper</h1>

# ✉ About

A webscraper that will notify you when the price of the product goes down.

# How to use it

1. First, use the "npm install" command on your terminal to install all the dependencies. 

2. Now, you must create a file named .env, and add the following variables to it:

  TWILIO_ACCOUNT_SID
  TWILIO_AUTH_TOKEN

  you should use your twilio Account Sid and Auth Token as the values for these variables.
  
3. Replace the URL variable in "scrape.js" for the product URL you wish.

4. Replace the "from" key of the message object for your twilio number.

6. Replace the "to" key of the message object for a valid phone number (a verified number in twilio's website if you are using the free trial plan).

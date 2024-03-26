============================== Detailed Description Running Server On Local Machine ======================

Requirements:

    1. Ensure that you have the LTS version of Node installed.
    2. Install git for version control.
    3. Install MongoDB compass.

Installation steps on local machine:

    1. Fork this repository.
    2. Clone your forked version of the repository locally. To do this, navigate to your command line or terminal, move to an appropriate directory, and type:

        e.g git clone https://github.com/<your_username>/shortlink_indicina.git

    3. Navigate to the "server" directory by using "cd server".
    4. While in the "server" directory, install the backend dependencies using npm install.
    5. Create a .env file in your server and add the DB_CLOUD_CONNECTION and PORT.
    6. Go to MongoDB Atlas, create your database, and use the connection string in DB_CLOUD_CONNECTION variable and PORT = 5000.
    7. Navigate inside the "server" directory and start the backend server using either npm start or npm run dev. The backend server will start on localhost:5000.

    Note:
    Remember to close all running servers before starting the backend server , close server with ctrl+c.

================================= Detailed Description for API Endpoints For Testing =====================================

Sure, here's a detailed description of each API endpoint:

1.  POST /encode

        Description: This endpoint encodes a URL and optionally sets an expiration time or password protection.

        Request Body Parameters:

        decodedUrl (string): The URL to be encoded.
        expirationMinutes (number, optional): The number of minutes after which the encoded URL should expire.
        password (string, optional): Password for accessing the encoded URL.


        Response Status Codes:
        201: URL encoded successfully.
        409: URL already encoded.
        500: Something went wrong on the server.


                Endpoint Url: http://localhost:5000/api/encode

                sample json request body parameter:

                for encoding with expriation and password
                {
                "decodedUrl": "https://example.com",
                "expirationMinutes": 60,
                "password": "securepassword123"
                }

                for encoding with password
                {
                "decodedUrl": "https://example.com",
                "password": "securepassword123"
                }

                for encoding with encoding
                {
                "decodedUrl": "https://example.com",
                "expirationMinutes": 60,
                }

2.  POST /decode

    Description: This endpoint decodes an encoded URL, optionally requiring a password for access.
    Request Body Parameters:
    encodedUrl (string): The encoded URL to be decoded.
    password (string, optional): Password for accessing the encoded URL.

    Response Status Codes:
    200: URL decoded successfully.
    400: Password required but not provided, or URL has expired.
    401: Incorrect password.
    404: Encoded URL not found.
    500: Something went wrong on the server.

    Endpoint Url: http://localhost:5000/api/decode

                sample json request body parameter:

                for decoding with encode url with password
                {
                "encodedUrl": "https://example.com",
                "password": "securepassword123"
                }

                for decoding with encode url without password
                {
                "decodedUrl": "https://example.com",

                }



3.  GET /statistic/:encodedUrl

    Description: This endpoint retrieves statistics for a specific encoded URL.
    URL Parameters:
    encodedUrl (string): The encoded URL for which statistics are requested.

    Response Status Codes:
    200: URL statistics retrieved successfully.
    404: Encoded URL not found.
    500: Something went wrong on the server.

    Endpoint Url: http://localhost:5000/api/statistic/"encodedUrl"

4.  GET /allUrls

    Description: This endpoint retrieves all encoded URLs along with their statistics.

    Response Status Codes:
    200: All encoded URLs retrieved successfully.
    404: No encoded URLs found.
    500: Something went wrong on the server.

    Endpoint Url: http://localhost:5000/api/allUrls

5.  GET /encodedUrl/:encodedUrl

    Description: This endpoint redirects to the original URL corresponding to the provided encoded URL.
    URL Parameters:
    encodedUrl (string): The encoded URL to which redirection is requested.

    Response Status Codes:
    302: Redirects to the decoded URL.
    404: Original URL not found.
    500: Something went wrong on the server.

    Endpoint Url: http://localhost:5000/api/encodedUrl/"encodedUrl"

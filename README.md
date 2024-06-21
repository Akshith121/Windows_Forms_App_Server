## Windows Forms App server

This repository consists of the API of the Windows Forms App.

### Installation

 1. Clone the repository:
      ```sh 
      git clone https://github.com/Akshith121/Windows_Forms_App_Server.git
      ```
      
 2. Navigate to the project directory:
      ```sh
      cd Windows_Forms_App_Server
      ```
      
 3. Install the dependencies:
      ```sh
      npm install
      ```
      
 4. Compile the TypeScript files:
      ```sh
      npm run build
      ```
      
 5. Start the server:
      ```sh
      npm start
      ```
      
 6. Alternatively, you can compile TypeScript files and start the server:
     ```sh
     npm run build-and-run
     ```

## Endpoints
**BaseUrl** http://localhost:3000

**GET** /api/v1/ping
**Description:** The ping endpoint does nothing but just returns true when the server is healthy.
**Method:** `GET`
**Response:**
-   **Status:** `200 OK`
-   **Body**  
    ```json
    true
    ```
**GET** /api/v1/read?index=0
**Description:** The read endpoint expects an index to be given as the query parameter and returns the form at that index.
**Method:** `GET`
**Response:**
-   **Status:** `200 OK`
-   **Body**  
    ```json
    {
    "name": "Test",
    "email": "test123@gmail.com",
    "phone": "7253462534"
    "github_link": "https://www.github.com/test123/slidely-task-2"
    "stopwatch_time": "00:01:04" 
    }
    ```

**GET** /api/v1/read/form?emailId=test123@gmail.com
**Description:** The read form endpoint expects an emailId to be given as the query parameter and returns the form that has email as the given emailId.
**Method:** `GET`
**Response:**
-   **Status:** `200 OK`
-   **Body**  
    ```json
    {
    "name": "Test",
    "email": "test123@gmail.com",
    "phone": "7253462534"
    "github_link": "https://www.github.com/test123/slidely-task-2"
    "stopwatch_time": "00:01:04" 
    }
    ```
  
**GET** /api/v1/length
**Description:** The length endpoint does not expect any parameter and returns the total number of forms in the db.json.
**Method:** `GET`
**Response:**
-   **Status:** `200 OK`
-   **Body**  
    ```json
    10
    ```

**POST** /api/v1/submit
**Description:** The submit endpoint does not expect any parameter but expects the form as the request body and returns an object containing a success message and the created form's index.
**Method:** `POST`
**Request Body:**
   ```json
   {
   "name": "jane doe",
   "email": "janedoe12@gmail.com",
   "phone": "7864523451"
   "github_link": "https://www.github.com/janedoe12/slidely_task"
   "stopwatch_time": "00:04:45"
   }
   ```
**Response:**
-   **Status:** `201 OK`
-   **Body**  
    ```json
    {
    "msg": "successfully submitted!",
    "formId": 10
    }
    ```

**PUT** /api/v1/update
**Description:** The update endpoint expects a query parameter emailId and the updated form as the request body and returns an object containing a success message.
**Method:** `PUT`
**Request Body:**
   ```json
   {
   "name": "jane doe",
   "email": "janedoe12@gmail.com",
   "phone": "7864528951"
   "github_link": "https://www.github.com/janedoe12/slidely_task"
   "stopwatch_time": "00:04:45"
   }
   ```
**Response:**
-   **Status:** `201 OK`
-   **Body**  
    ```json
    {
    "msg": "updated successfully!"
    }
    ```
   
   **DELETE** /api/v1/delete
**Description:** The delete endpoint expects a query parameter emailId and returns an object containing a success message.
**Method:** `DELETE`
**Response:**
-   **Status:** `200 OK`
-   **Body**  
    ```json
    {
    "msg": "deleted successfully!"
    }
    ```
    
# Shop at Northwind Workshop Server
This is intended to be the backend for the Shop at Northwind workshop.

## Setup this server locally
This section will discuss how to get the Northwind Grocery server up and running locally

- Verify Node.js is installed by running the following command.
  
  **Command to run**
  ```bash
    node -v
  ```
  **Sample Output**
  ```bash
    v14.15.4            (it may be a slightly different version)
  ```

  > **Note:** If you do not have Node.js installed, you can install the LTS (Long-term Support) version from here: https://nodejs.org/en/

- Clone this repository to your local computer.

  ```bash
    git clone https://github.com/DevelopIntelligenceBoulder/northwind-workshop-express-server.git
  ```

- Change directories (`cd`) into the newly cloned projects folder.

  ```bash
    cd northwind-workshop-express-server
  ```

- Install the projects dependencies with NPM (Node Package Manager).
  
  ```bash
    npm install
  ```

- Start the local server

  **Command to start the server**
  ```bash
    npm start
  ```

  **Expected Output**
  ```bash
    App listening at port 8081
  ```

- Verify the server is working as expected by accessing http://localhost:8081/api/categories with a browser or a third party tool like [Postman](https://www.postman.com/)

  **Expected output from URL**
  ```js
  [{"categoryId":1,"description":"Soft drinks coffees teas beers and ales","name":"Beverages"},{"categoryId":2,"description":"Sweet and savory sauces relishes spreads and seasonings","name":"Condiments"},{"categoryId":3,"description":"Desserts candies and sweet breads","name":"Confections"},{"categoryId":4,"description":"Cheeses","name":"Dairy Products"},{"categoryId":5,"description":"Breads crackers pasta and cereal","name":"Grains/Cereals"},{"categoryId":6,"description":"Prepared meats","name":"Meat/Poultry"},{"categoryId":7,"description":"Dried fruit and bean curd","name":"Produce"},{"categoryId":8,"description":"Seaweed and fish","name":"Seafood"}]
  ```

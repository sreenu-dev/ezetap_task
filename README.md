# Book My Show Admin Page (EZE Tap)

Link for the deployed Website : [BookMyShow Admin Page](https://bmsclient.z13.web.core.windows.net)

- Technologies Used:
  - Front End:
    - Angular
    - Bootstrap
  - Backend
    - ExpressJS
  - Database
    - MySQL
  - Deployment
    - Azure Repositories

### Understanding the Scenario:
    As a part of my understanding these are some of the points I noticed:
    1. Movies is the Primary Entity
    2. Theatres are sub part of movies
    3. Several Pages need to be created for Different actions but all of them need to be synchronised
    4. Dynamic Page loading is also the main part in development
### Assumptions Made
    In the Moives Page we show the list of movies along with options to Filter and Sort on particular columns. When we click on view details we shown the details of theatres. So theatre is taken is the child entity of moive and the edit option was given for theatres.

    Add option is given for both movies and theatres. Modals are used widely to keep the page adhering to SPA
### Libraries Used
    - Packages Used in Backend:
      - ExpressJS: ExpressJS is used as a controller to communicate between UI and DB as it is lightweight and helpful during rapid development
      - CORS: Cross Origin Resource sharing is used to accept the request(Development Purpose)
      - MySQL: MySQL is used to connect to MySQL server hosted in Azure
      - Nodemon: Nodemon is used to watch the changes and reload the server automatically in local
    - Packages used in Frontend:
      - Bootstrap: Bootstrap is used to enhance the visual representation of the application
      - ng-multiselect-dropdown: Used to generate multiselect dropdowns
      - ngx-toaster: To show the toaster messages when any opearation is successful
      - router: To enable routing between pages
### Coding Details
    The UI Code is in Client/bookMyShow
    The backend code is in bmsserver
    MySQL Scheme is uploaded naming dbschema.sql
# Chat Sphere - Your Real-Time Chat Application

## Inspiration

Chat Sphere is inspired by the need for real-time communication, enabling users to connect and chat seamlessly. We aim to provide a user-friendly and interactive platform for users to engage in conversations.

## How to Run Chat Sphere

<a name="run"></a>

To run Chat Sphere locally, follow these steps:

### Fork and Clone the Repository:

1. **Fork the Repository:**
   - Fork the Chat Sphere repository to your GitHub account.

2. **Clone the Repository:**
   - Clone the repository to your local machine using the following command:
     ```bash
     git clone https://github.com/your-username/ms-project-3.git
     ```

3. **Navigate to Client and Server Directories:**
   - Open a terminal window and navigate to the `client` directory:
     ```bash
     cd client
     ```
     Run npm install:
     ```bash
     npm install
     ```

   - Open a separate terminal window and navigate to the `server` directory:
     ```bash
     cd server
     ```
     Run npm install:
     ```bash
     npm install
     ```

4. **Run the Server:**
   - In the `server` directory, run the server using nodemon with the following command:
     ```bash
     nodemon
     ```
     This will start the server.

5. **Run the Client:**
   - In the `client` directory, run the application using npm with the following command:
     ```bash
     npm start
     ```
     This will open the Chat Sphere application in your default web browser.

6. **Access Chat Sphere:**
   - With the server and client running, you can access Chat Sphere by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

And you're in! Now you can explore Chat Sphere on your local machine.

## Usage

Chat Sphere is designed to facilitate real-time communication. Follow these steps to get started:

1. **Enter a Username:**
   - Provide a unique username to join the chat.

2. **Join or Create a Room:** (pending)
   - Join an existing room or create a new one to start chatting.

3. **Stay Connected:**
   - Chat Sphere keeps you connected with other users in the same room.

## Technologies Used

Chat Sphere is built using modern web technologies, making it reliable and user-friendly.

- **React:** Powering the frontend user interface.
- **Node.js:** Handling server and backend logic.
- **Express:** Creating a RESTful API for seamless communication.
- **MongoDB:** Storing chat messages and user data.
- **Socket.IO:** Facilitating real-time communication.

## Known Issues

Here are the current issues we're aware of:

- [Issue]: **Application Limited to Local Environment:**
  - Currently, the application is only functional when running locally on your machine. We apologize for any inconvenience. Our team is actively addressing this issue to make the application accessible in various environments.

    For guidance on running ChatSphere locally, please refer to the [How to Run ChatSphere](#run) section in our readme.
- [Issue]: **Pending Features - Admin and Room Management:**
  We are actively working on implementing additional features, including:

  - **Admin Controls:**
    - Currently, admin features are pending implementation. Admins will have additional controls over the chat environment, such as user management and moderation capabilities.

  - **Room Management:**
    - We are working on incorporating advanced room management features, allowing users to create, customize, and manage their chat rooms effectively.

  We appreciate your patience as we enhance Chat Sphere with these exciting new features! Feel free to check for updates in our future releases.

## Contributors

The team behind bringing you Chat Sphere:
- [Esteban Sepulveda](https://github.com/estebansep1)
- [Seth Goodman](https://github.com/sethgoody)
- [Benjamin McConnaughy](https://github.com/MyManny)
- [Brett Kendrick](https://github.com/BrettKendrick)

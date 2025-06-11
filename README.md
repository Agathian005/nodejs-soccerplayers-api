# MAIN FEATURES AND FUNCTIONALITY OF THIS API

# JWT Authentication and Refresh Tokens
  
  This API implements JSON Web Token (JWT) based authentication to protect secure routes:

    When a player logs in successfully, an Access Token is issued, allowing temporary access to protected routes.
    A Refresh Token is also issued to the JSON folder, allowing the generation of new access tokens without needing to log in again.
    These tokens are signed and verified using secret keys defined in the .env file, ensuring secure and stateless authentication.

# Role-based Access Control

  Players in the system can be assigned one or more of the following roles:

    clubmember
    player
    coach
    manager
    
    Routes are protected using a middleware that checks if the authenticated user has the required role(s) to perform certain actions. For example:
    
      Only managers and coaches can update or delete player information.
      Players may be restricted to viewing their own data or limited access routes.
      This improves security and ensures actions are only performed by authorized personnel.

#  Player Registration & Secure Password Hashing (bcrypt)

  New players can register via a secure POST endpoint:

    Passwords are hashed using bcrypt before being saved to storage.
    This prevents raw passwords from being exposed or stored in plain text.
    Duplicate usernames or player names are checked to prevent conflicts.

# Full CRUD Support (Create, Read, Update, Delete)

The API provides all necessary endpoints to manage player data:

    Create: Add new players through a registration endpoint.
    Read: View all players or search by jersey number.
    Update: Modify player data (requires appropriate role).
    Delete: Remove players from the system (requires appropriate role).
    These endpoints are RESTful and return appropriate HTTP status codes and messages.

#  Persistent JSON File Storage (fs module)

 Player data is stored in a JSON file (clubplayers.json) on disk:

    All updates, creations, or deletions are persisted using Node's native fs module.
    This makes the API lightweight and easy to understand for learning or small-scale applications.
    File I/O is handled asynchronously to ensure non-blocking operations.

# All these API routes has been tested with Thunder Client
    

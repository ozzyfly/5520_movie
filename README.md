# All About Movies

A mobile application built using React Native, focusing on movie-related functionalities such as viewing movie details, writing and reading reviews, and finding nearby cinemas.

## Technologies Used

- React Native for cross-platform mobile app development.
- Firebase for authentication, database, and storage.
- Additional libraries and APIs for enhanced features.

## Setup Instructions

1. Clone the repository: `git clone [repository URL]`.
2. Navigate to the project directory: `cd [project directory]`.
3. Install dependencies: `npm install`.
4. Run the project: `npm start` or `expo start`.

## Features

- **Authentication:** User sign-up and login functionality.
- **Camera Use:** Integration with the device's camera for profile picture updates.
- **Location Tracking:** Displaying nearby cinemas based on user location.
- **Notifications:** Setting up and managing movie-related notifications.
- **External API Integration:** Fetching movie details, reviews, and cinema information.

## Screenshots

(Screenshots placeholder)

## Contributions

- **Yinan Tang (christine8828):** Implemented authentication and camera functionality.
- **Chen-Fei Chu (ozzyfly):** Worked on location tracking and external API integration.

## Iterations

### Iteration 1

Developed core functionalities and established the project structure:

- **Firestore Collections Setup:**

  - `Movies`: Stores movie details like title, genre, release date, etc.
  - `Reviews`: Stores user reviews with fields such as movieId, userId, rating.
  - `Users`: Manages user profiles including username, email, favorite movies.

- **Navigation Setup:**
  - Implemented `BottomTabNavigator`, `DrawerNavigator`, and `StackNavigator` for intuitive navigation within the app.

### Iteration 2 and 3

Focused on adding and refining features:

- **Enhanced Authentication:** Streamlined user login and registration process.
- **Camera Integration:** Enabled users to update their profile pictures using the camera.
- **Location-Based Features:** Introduced a map showing nearby cinemas using user's location data.
- **Notifications:** Set up a system for users to receive updates about movies.
- **External API Use:** Integrated external APIs to fetch real-time data about movies and reviews.

## Future Work

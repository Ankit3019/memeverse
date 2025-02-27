# MemeVerse

MemeVerse is a web application where users can upload, like, and explore memes. Users can also view a leaderboard of the top memes and users based on engagement.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Pages](#pages)
  - [Home](#home)
  - [Explorer](#explorer)
  - [Upload](#upload)
  - [Profile](#profile)
  - [Meme Details](#meme-details)
  - [Leaderboard](#leaderboard)
- [Technologies Used](#technologies-used)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/memeverse.git
   cd memeverse
2. Install dependencies:
    ```bash
    npm install
3. Start the development server:
    ```bash
    npm run dev
4. Open your browser and navigate to
    http://localhost:3000.
    
## Usage
Once the application is running, you can navigate through the different pages to explore memes, upload your own memes, and view your profile and the leaderboard.

## Pages
### Home
The Home page provides an overview of the application and highlights some of the trending memes.

### Explorer
The Explorer page allows users to browse through a collection of memes. Users can filter memes by categories (Trending, New, Classic, Random), search for specific memes, and sort them by likes, date, or comments. Infinite scrolling is implemented to load more memes as the user scrolls down.
    
### Upload
The Upload page allows users to upload their own memes. Users can select an image or GIF file, add a caption, and optionally generate an AI-based caption. A preview of the meme is shown before uploading.

### Profile
The Profile page displays the user's profile information, including their name, bio, and profile picture. Users can edit their profile information. The page also shows the memes uploaded by the user and the memes liked by the user.

#### Meme Details
The Meme Details page displays detailed information about a specific meme, including the meme image, likes, and comments. Users can like the meme, add comments, and share the meme.

### Leaderboard
The Leaderboard page displays the top 9 memes based on likes and the top 9 users based on engagement (number of uploaded and liked memes). Users can see the profile pictures, names, and engagement scores of the top users.

## Technologies Used
- React
- Redux
- Axios
- React Router
- Tailwind CSS
- Lodash
- Local Storage
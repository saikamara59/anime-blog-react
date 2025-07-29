## Anime Blog Platform
- A full-stack blogging platform focused on anime content with advanced features including AI-powered tag suggestions, real-time interactions, and personalized user experiences.

## Features
- User Authentication: Secure signup/login system with JWT and password hashing
- Post Management: Create, read, update, and delete blog posts
- Comments: Add and delete comments on posts|
- Likes System: Like/unlike posts and view like counts
- User Profiles: View and update user profiles

## Advanced Features
- AI-Powered Tag Suggestion: Automatically suggests relevant tags for posts using Natural Language Processing (spaCy)
- Search & Filtering: Search posts by keywords and filter by tags or authors
- Pagination: Efficient handling of large datasets with paginated results
- User Content Management: View all posts created by a specific user

## Tech Stack 
- Backend 

- Flask: Python web framework for building the API
- PostgreSQL: Relational database for data storage
- JWT: For secure authentication
- spaCy: NLP library for AI-powered tag suggestion
- Bcrypt: For password hashing

## Frontend (In progress) 
- React: Frontend library for building user interfaces
- Tailwind CSS: Utility-first CSS framework for styling
- Axios: HTTP client for API requests

## Architecture 
The application follows a RESTful API architecture with the following components:

- Authentication System: Handles user registration, login, and token validation 
- Post Routes: Manages blog post CRUD operations
- Comment System: Handles adding and retrieving comments
- Likes System: Manages post likes and retrieving like counts
- User Profiles: Manages user information and profile updates

## Getting Started 
- Python 3.11
- PostgreSQL
- Node.js and npm (for frontend)

## Future Enhancements 
- Real-time notifications 
- Rich text editior for posts 
- Admin panel for content moderation 
- Analytics Dashboard 
- Followers System
- Mobile app intregration
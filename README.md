# assignment-03

## Progress

1. Fetch all cards within the nationIndexNumber 1 to 151, total 4264 cards.
2. Design the preliminary schema tables.
3. Design the home page sketch.
4. Build the preliminary home page.

## 1. Project Overview

My project, a Pokémon Trade Card Game (TCG) collection platform, will allow users to browse, search, and manage their Pokémon card collections. It will integrate with the Pokémon TCG API to fetch card details, images, and other relevant data.

## 2. Page Requirements

- **Homepage** ("/" or "/home")

  - Anonymous Users: Display latest cards added to the platform, trending collections, or featured cards/categories.
  - Logged-in Users: Show user-specific data such as recently viewed cards, user's collection highlights, or suggestions based on their activity.
  - Design: Make sure the homepage is welcoming and informative, clearly indicating the platform's purpose.

- **Login/Register** Page

  - Utilize Auth0 for authentication and registration.
  - Ensure that users are prompted to log in only when necessary, like when adding cards to their collection or marking cards as favorites.

- **Profile Page** ("/profile")

  - Display user information, their card collection, wishlist, and any other relevant user-specific data.
  - Allow users to update their profile information (excluding Auth0 data).

- **Details Page** ("/details/{cardId}")
  - Show detailed information about a Pokémon card. This includes images, stats, text, and perhaps user comments or ratings if you decide to include those features.
  - This page will be a critical component for users exploring cards in depth.

## 3. Responsive Design

## 4. External Web API Integration

I will integrate with the Pokémon TCG API to fetch card data. This includes implementing read-only operations such as retrieving card details, searching for cards by name, type, or set, and any other functionalities necessary for this platform.

## 5. API Requirements

- Implement a /ping endpoint for health checks.
- Have at least one secured endpoint that requires an Auth0 token, which could be related to user profile operations or adding cards to a personal collection.

## 6. Database Requirements

My application should include at least 3 tables:

- Users: To store information about users.
- Cards: To cache card data from the Pokémon TCG API or store user-specific data like ownership or wishlist status.
- Collections: To manage groups of cards, which could represent user collections, wishlists, or trades.

## 7. Accessibility

## 8. Testing

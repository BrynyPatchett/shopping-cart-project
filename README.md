# Shopping Cart Project
A mock webstore SPA made with react.

This project was created to gain exeperience with
- React
- React API data fetching
- React Routing with Outlets and API calls
- React Testing Library / Vitesting
- Mock Service Worker for testing and fetch interception.

## Application

 
This mock shopping cart website is to demonstrate a Single Page Application(SPA) created using React Routes. 
Once the initial data is fetched from the following API: [FakeStoreAPI](https://fakestoreapi.com/).

SPA will pass  the required information between all components and routes with the use of Outlets, Outlet Context and URL params. Moving between routes does not call the API again.

## Testing
Routes and Compontents have been tested using the [React-Testing Library](https://testing-library.com/),
Fetch requests have been mocked using [Mock Service Worker(MSW)](https://mswjs.io/). 

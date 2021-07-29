## Github Searcher

This App is built using the following stack -

**Frontend**
The app was bootstrapped using `create-react-app`.

- Typescript
- React
- Redux (for state management)
- Redux-persist (to persist the cache solution)

**Backend**

- Typescript
- Node
- Express
- Redis (for caching)

## DEMO

Click on the image below to watch the setup and demo video -

[![DEMO Video](https://img.youtube.com/vi/bGLvrmLQocE/0.jpg)](https://www.youtube.com/watch?v=bGLvrmLQocE)

## Get up and running...

The whole app is dockerized to prevent dependency conflicts and can be easily started in any system with docker installed.

After cloning the repo, duplicate the file `docker-compose.dist.yml` to `docker-compose.yml` and then inside the file, add the [Github Personal token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) to enable api calls.

After adding this token, in the root of the app directory, just type the command

```sh
docker-compose up --build
```

This will build the images with all the necessary dependencies and create all the necessary networks.

### Ports

The app can be accessed at `http://localhost:3000`. The backend is exposed on the port `3001` and there is a proxy added in the `package.json` to prevent any CORS issues for the demo purposes.

> If the first time after running `docker-compose up` command, you face any issues, please kill the server and restart again. Sometimes these kind of issues happen due to typescript compiler.

### System Architecture

#### Frontend

As a user when you type your search query in the search field, the app first looks for the results stored in the **cache**. If there is no relevant results in cache, the app makes and api call to the backend. Once the **search results** are received, it does two things -

1. Updates the `cache` which is then persisted to localstorage.
2. Updates the `state` to display the results on the UI.

For the purposes of caching, the search query is stringified and used as the cache key. Next time, the user make the same search again, the `ui state` is updated from the cache thus avoiding any unnecessary calls to the backend.

The cache is persisted in the local storage, so even if the app is refreshed, the cache records are maintained.

#### Backend

Once the backend receives a request, it first checks for the results in its cache. This cache is maintained in **redis** database. If the results are not found in the cache, it then calls the `github api` for the search results.

After the results are received, it first formats the results in the necessary format which is easier for the frontend to consume. It then caches this formatted data to the `redis store` and returns the result to the client.

The results are cached in the `redis` store for upto 2 hours. Once again the key used for storing the cache is the stringified search query.

#### Error Handling

In the backend, error handling is done via a custom Error handling middleware. Each type of error is handled by a different class of error which is extended from an inbuilt `Error()` class.

In the frontend, if there are any error from api calls, these errors are updated in a seperate piece in the application state - called `status`. This state is then checked to show or hide the errors on the UI.

#### APIs

Frontend only needs to call a single api regardless of the entity type you are searching for -

endpoint - `/api/search`
method - `POST`
body -

```typescript
{
  "query" : string;
  "entity": string<'users' | 'repositories'>;
}
```

The data is validated in the backend and if any of the required fields are missing, it throws an error.

#### Things to add / improve

- Write Unit tests for both frontend and backend.
- Create Swagger documentation for the endpoints.
- Add a way to clear cache from the UI.

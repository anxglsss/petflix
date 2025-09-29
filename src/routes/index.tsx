import { Navigate, createBrowserRouter } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

import MainLayout from "src/layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: MAIN_PATH.root,
        element: <Navigate to={`/${MAIN_PATH.browse}`} />,
      },
      {
        path: MAIN_PATH.browse,
        lazy: () => import("src/pages/HomePage"),
      },
      {
        path: MAIN_PATH.genreExplore,
        children: [
          {
            path: ":genreId",
            lazy: () => import("src/pages/GenreExplore"),
          },
        ],
      },
      {
        path: MAIN_PATH.watch,
        lazy: () => import("src/pages/WatchPage"),
      },
      {
        path: MAIN_PATH.newAndPopular,
        async lazy() {
          const { default: Component } = await import("src/pages/NewAndPopularPage");
          return { element: <Component /> };
        },
      },
      {
        path: MAIN_PATH.myList,
        async lazy() {
          const { default: Component } = await import("src/pages/MyListPage");
          return { element: <Component /> };
        },
      },
      {
        path: MAIN_PATH.browseByLanguages,
        async lazy() {
          const { default: Component } = await import("src/pages/BrowseByLanguagesPage");
          return { element: <Component /> };
        },
      },
      {
        path: MAIN_PATH.tvShows,
        lazy: () => import("src/pages/HomePage"), // Reuse HomePage for now
      },
      {
        path: MAIN_PATH.movies,
        lazy: () => import("src/pages/HomePage"), // Reuse HomePage for now
      },
    ],
  },
  {
    path: `/${MAIN_PATH.signIn}`,
    async lazy() {
      const { default: Component } = await import("src/pages/SignInPage");
      return { element: <Component /> };
    },
  },
  {
    path: `/${MAIN_PATH.signUp}`,
    async lazy() {
      const { default: Component } = await import("src/pages/SignUpPage");
      return { element: <Component /> };
    },
  },
]);

export default router;

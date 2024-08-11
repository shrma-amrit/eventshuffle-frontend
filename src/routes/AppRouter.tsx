import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  HOME_PATH,
  NOT_FOUND_PATH,
  EVENTS_PATH,
  EVENTS_CREATE_PATH,
  EVENTS_VIEW_PATH,
} from "../utils/constants";
import { NotFound } from "../pages/NotFound";
import { EventListPage } from "../pages/EventListPage";
import { EventCreatePage } from "../pages/EventCreatePage";
import { EventViewPage } from "../pages/EventViewPage";

const AppRouter = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Navigate to={EVENTS_PATH} replace />,
  },
  {
    path: EVENTS_PATH,
    element: <EventListPage />,
  },
  {
    path: EVENTS_CREATE_PATH,
    element: <EventCreatePage />,
  },
  {
    path: EVENTS_VIEW_PATH,
    element: <EventViewPage />,
  },
  {
    path: NOT_FOUND_PATH,
    element: <NotFound />,
  },
]);

export { AppRouter };

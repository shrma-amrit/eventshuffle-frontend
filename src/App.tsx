import { RouterProvider } from "react-router-dom";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { AppRouter } from "./routes/AppRouter.tsx";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
}

export default App;

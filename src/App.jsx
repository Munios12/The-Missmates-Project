import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./features/ui/AppLayout";
import Homepage from "./features/ui/Homepage";
import Searchmissmate from "./features/missmates/Searchmissmate";
import Addmissmate from "./features/missmates/Addmissmate";
import List from "./features/missmates/List";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/missmate/add",
        element: <Addmissmate />,
      },
      {
        path: "/missmate/search",
        element: <Searchmissmate />,
      },
      {
        path: "/missmate/list",
        element: <List />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

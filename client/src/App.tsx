import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { Suspense } from "react";
import LoadingSpinner from "./components/Spinner";

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;

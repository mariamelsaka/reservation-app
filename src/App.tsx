import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
// import ScrollToTopButton from "./components/Ui/ScrollToTopButton";
// import KoreChatWidget from "@components/KoreChatWidget";

function App() {
  return (
    <>
    <RouterProvider router={router} />
    <Toaster />
    {/* <ScrollToTopButton/> */}
    {/* <KoreChatWidget /> */}
    </>
  )
}

export default App


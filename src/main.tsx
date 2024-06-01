import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';

import QueryProvider from "./lib/react-query/Quert-Provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryProvider>
);

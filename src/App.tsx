import router from "./router";
import { useLocation, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./hooks";
import { initState } from "@/store/features/map/map-feature";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    location.pathname === "/" ? navigate("/home") : "";
    const area = window.sessionStorage.getItem("area");
    area && dispatch(initState(JSON.parse(area)));
    !area &&
      window.sessionStorage.setItem(
        "area",
        JSON.stringify({ label: "北京", value: "AREA|88cff55c-aaa4-e2e0" })
      );
  }, []);
  return <>{useRoutes(router)}</>;
}

export default App;

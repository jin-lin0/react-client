import { Spin } from "antd";
import { Suspense } from "react";
import { Route, BrowserRouter, RouteProps, Routes } from "react-router-dom";

const CRoute = (routeList: RouteProps[], basename = "/") => {
  return (
    <Suspense fallback={<Spin />}>
      <BrowserRouter basename={basename}>
        <Routes>
          {routeList?.map((route: RouteProps, index: number) => (
            <Route key={index} {...route} />
          ))}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default CRoute;

import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <h1>The Naiki Missmates Projects</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

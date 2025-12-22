import Header from "../components/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col gap-0 min-h-screen">
      {/* Header Section */}
      <Header />
      {/* Main Content Section */}
      <main className="flex-1 flex flex-col h-full">{children}</main>
    </div>
  );
};

export default MainLayout;

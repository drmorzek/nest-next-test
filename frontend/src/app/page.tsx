import HomeClientComponent from "@/components/home/home.client";
import HomeServerComponent from "@/components/home/home.server";

const HomePage = () => {
  return (
    <>
      <HomeServerComponent />
      <HomeClientComponent />
    </>
  );
};

export default HomePage;
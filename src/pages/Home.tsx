import reactLogo from "../assets/react.svg";
import tsLogo from "/tslogo.svg";

const Home = () => {
  return (
    <div className="home min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      {/* Logos section, centered */}
      <div className="flex justify-center items-center mb-8">
        <a
          href="https://www.typescriptlang.org/"
          target="_blank"
          className="mr-4"
        >
          <img src={tsLogo} className="h-16 w-16 logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="h-16 w-16 logo react"
            alt="React logo"
          />
        </a>
      </div>

      {/* Main title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        TypeScript React Features Practice
      </h1>
    </div>
  );
};

export default Home;

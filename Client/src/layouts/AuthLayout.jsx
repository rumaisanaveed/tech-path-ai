import Header from "../components/Header";
import AuthImage from "../assets/images/auth-image.svg";

export default function AuthLayout({ mainHeading, text, formText, children }) {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col md:flex-row gap-3 3xl:justify-center lg:gap-20 px-10 w-full mx-auto text-custom-black-dark pt-10 pb-3 lg:pt-0 lg:pb-0">
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="lg:font-normal font-bold anonymous-font lg:text-6xl text-3xl lg:max-w-xl">
            {mainHeading}
          </h1>
          <p className="lg:text-xl font-light text-base lg:max-w-xl">{text}</p>
          <img src={AuthImage} alt="auth" className="hidden md:block" />
        </div>
        <div className="flex flex-col flex-grow 3xl:flex-grow-0 gap-4">
          <h2 className="lg:font-light font-medium text-xl lg:text-3xl lg:max-w-2xl">
            {formText}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}

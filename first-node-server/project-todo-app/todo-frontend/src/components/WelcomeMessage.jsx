// Removed the WelcomeMessage.module.css import statement

const WelcomeMessage = () => {
  /* 
    TAILWIND MAPPING:
    - font-size: 30px   -> text-[30px] (or layout utility text-3xl)
    - margin-top: 50px  -> mt-[50px] (or layout utility mt-12 which is 48px)
    - font-weight: 600  -> font-semibold
  */
  return (
    <p className="text-[30px] font-semibold mt-[50px] text-center text-gray-500">
      Enjoy Your Day
    </p>
  );
};

export default WelcomeMessage;

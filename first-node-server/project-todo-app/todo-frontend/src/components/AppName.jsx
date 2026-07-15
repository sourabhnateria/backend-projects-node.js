// import styles from "./AppName.module.css";

// Removed the .module.css import statement

function AppName() {
  /* 
    TAILWIND MAPPING:
    - font-weight: 700   -> font-bold
    - font-size: 45px    -> text-[45px] (Or custom utility layout text-5xl)
    - margin: 10px       -> m-2.5 (10px is exactly 2.5rem/4)
    - margin-bottom: 20px -> mb-5 (20px is exactly 5rem/4)
  */
  return (
    <h1 className="font-bold text-[45px] m-2.5 mb-5 text-center text-gray-800">
      TODO App
    </h1>
  );
}

export default AppName;

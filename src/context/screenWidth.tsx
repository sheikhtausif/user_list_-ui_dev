import React from 'react'
import { createContext } from 'react';

export const ScreenWidthContext = createContext<any>(null);

const screenWidthProvider: React.FC = () => {

    // const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);

    // useEffect(() => {
    //     window.addEventListener("resize", () => {
    //         setScreenWidth(window.screen.width);
    //     });

    // }, [screenWidth]);

    return <ScreenWidthContext.Provider value={{}}></ScreenWidthContext.Provider>
}

export default screenWidthProvider
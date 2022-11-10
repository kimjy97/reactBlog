import { useMediaQuery } from "react-responsive";

const CommonVar = () => {
    const isPC = useMediaQuery({
        query: "(min-width: 1280px)"
    });

    return isPC
};

export default CommonVar;
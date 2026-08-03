import { Hero } from "../features/home/Hero.jsx";
import { Reviews } from "../features/home/Reviews";
import { Featured} from "../features/home/Featured.jsx";

import {BlankPage} from "../components/BlankPage.jsx";

export const Home = () => {
    return (
        <div>
            <Hero />
            <Reviews />
            <Featured />
        </div>
    );
};
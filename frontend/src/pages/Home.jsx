import { Hero } from "../features/home/Hero.jsx";
import { Reviews } from "../features/home/Reviews";

import {BlankPage} from "../components/BlankPage.jsx";

export const Home = () => {
    return (
        <div>
            <Hero />
            <Reviews />
            <BlankPage />
        </div>
    );
};
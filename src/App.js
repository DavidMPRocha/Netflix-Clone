import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import Header from "./components/Header/";
import MovieRow from "./components/MovieRow/";
import FeaturedMovie from "./components/FeaturedMovie/";

export default function App() {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setfeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const loadAll = async () => {
            // LIST OF MOVIES FOR HOME
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            // MOVIE DATA OF HEADER
            let originals = list.filter(i=>i.slug === 'originals');
            let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length -1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setfeaturedData(chosenInfo);
        }

        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
                setBlackHeader(true);
            }else{
                setBlackHeader(false);
            }
        };

        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    return(
        <div className="page">

            <Header black={blackHeader}/>

            {featuredData &&
                <FeaturedMovie item={featuredData}/>
            }
            
            <section className="lists">
                {
                movieList.map((item, key) => (
                    <div>
                    <MovieRow key={key}  title={item.title} items={item.items}/>
                    </div>
                ))
                }
            </section>

            <footer>
                Data taken from Themoviesdb.org
            </footer>

            {
                movieList.length <= 0 &&
                <div className="loading">
                    <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading" className="loading-image"/>
                </div>
            }
            
        </div>
    )
}
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Recipe.css'; // Stil dosyasını dahil edin

const Recipe = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const recipe = searchParams.get('text');


    useEffect(() => {
        document.body.classList.add('new-background');


        return () => {
            document.body.classList.remove('new-background');
        };
    }, []);

    return (
        <div className="recipe-container">
            <h1 className="recipe-title">Yemek Tarifi</h1>
            <p className="recipe-text">{recipe}</p>
        </div>
    );
};

export default Recipe;

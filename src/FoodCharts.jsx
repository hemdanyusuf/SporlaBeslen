import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './App.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const foodData = {
    labels: ['Protein', 'Karbonhidrat', 'Yağ', 'Vitamin'],
    datasets: [
        {
            label: 'Kepekli Ekmek',
            data: [8, 43, 2, 2],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            weight: '50g',
            calories: '240 kcal',
            recipe: 'Kepekli Ekmek Tarifi: Un, su, tuz, maya, kepek ve zeytinyağı karıştırılarak hamur yapılır. Hamur dinlendirilir ve fırında pişirilir.',
        },
        {
            label: 'Bulgur Pilavı',
            data: [5, 30, 1, 0.5],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            weight: '100g',
            calories: '150 kcal',
            recipe: 'Bulgur Pilavı Tarifi: Bulgur, su, tuz ve tereyağı ile birlikte pişirilir. Soğan ve biber eklenerek lezzetlendirilir.',
        },
        {
            label: 'Meyveli Pasta',
            data: [3, 50, 15, 0.5],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            weight: '150g',
            calories: '400 kcal',
            recipe: 'Meyveli Pasta Tarifi: Kek hamuru hazırlanır ve pişirilir. Üzerine meyve ve krema eklenir.',
        },
        {
            label: 'Peynirli Poğaça',
            data: [7, 40, 20, 1],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            weight: '80g',
            calories: '300 kcal',
            recipe: 'Peynirli Poğaça Tarifi: Un, su, tuz, maya ve peynir karıştırılarak hamur yapılır. Hamur dinlendirilir ve fırında pişirilir.',
        },
    ],
};

const FoodCharts = () => {
    const navigate = useNavigate();

    const handleChartClick = (recipe) => {
        navigate(`/recipe?text=${encodeURIComponent(recipe)}`);
    };

    return (
        <div>
            <h1 className="header">Bugün bunları yemek isteyebilirsiniz.</h1>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    backgroundImage: 'url("/images/background.jpg")',
                    backgroundSize: '200px',
                    padding: '20px',
                    borderRadius: '10px'
                }}
            >
                {foodData.datasets.map((food, index) => (
                    <div
                        key={index}
                        style={{ textAlign: 'center', background: 'rgba(9, 31, 71, 0.8)', borderRadius: '10px', padding: '10px' }}
                        onClick={() => handleChartClick(food.recipe)}
                    >
                        <h3 style={{ fontWeight: 'bold' }}>{food.label}</h3>
                        <Doughnut
                            data={{
                                labels: foodData.labels,
                                datasets: [
                                    {
                                        data: food.data,
                                        backgroundColor: food.backgroundColor,
                                    },
                                ],
                            }}
                        />
                        <p>Gramaj: {food.weight}</p>
                        <p>Kalori: {food.calories}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodCharts;

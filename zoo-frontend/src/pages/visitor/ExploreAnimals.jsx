import React, { useState, useEffect } from 'react';
import { animalService } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';

const ExploreAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        animalService.getAll().then(setAnimals).catch(console.error);
    }, []);

    // Filter to only show animals generally deemed ready to be viewed by visitors
    const visibleAnimals = animals.filter(a => a.healthStatus !== 'In Treatment');

    return (
        <div className="container mt-4 pb-5">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>&larr; Back to Dashboard</button>
            <h2 className="mb-4">Explore Our Animals</h2>
            <div className="row g-4">
                {visibleAnimals.map(animal => (
                    <div className="col-md-4 col-sm-6" key={animal.id}>
                        <div className="card h-100 shadow-sm border-info border-2">
                            <div className="card-body">
                                <h4 className="card-title text-info">{animal.name}</h4>
                                <h6 className="card-subtitle mb-2 text-muted fst-italic">{animal.species}</h6>
                                <p className="card-text mt-3">
                                    <strong>Age:</strong> {animal.age} years<br />
                                    <strong>Status:</strong> {animal.healthStatus}
                                </p>
                            </div>
                            <div className="card-footer bg-transparent border-info text-center">
                                <span className="btn btn-outline-info disabled rounded-pill">View Habitat</span>
                            </div>
                        </div>
                    </div>
                ))}

                {visibleAnimals.length === 0 && (
                    <div className="col-12">
                        <div className="alert alert-warning text-center">
                            No animals are currently available to display. Please check back later!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExploreAnimals;

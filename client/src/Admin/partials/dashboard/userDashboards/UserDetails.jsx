import { useEffect, useState } from 'react';
import UserCards from './UserCards';


const UserDetails = () => {
    const [forms, setFormData] = useState(null);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        let userData1 = localStorage.getItem("user");
        let userDataObject = JSON.parse(userData1);
        setUserData(userDataObject);
        console.log(userDataObject);
        let id;
        id = userDataObject.userId;
        console.log(userDataObject.userId)
        fetch(`http://localhost:5000/apiTender/userdetails/DetailsbyId/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserData(data)
            }
            )
            .catch((error) => console.log(error));
    }, [])



    return (
        <div className="flex justify-center m-5">
            <div className="card-container mx-5">
                <UserCards className="my-5" description="746834" title="Career & Manpower" />
                <UserCards className="my-5" description="322" title="Registrations" />
                <UserCards className="my-5" description="345345" title="Company Certifications" />
            </div>
            <div className="card-container mx-5">
                <UserCards className="my-5" description="Numbers and Counts" title="Licenses" />
                <UserCards className="my-5" description="345345" title="Indivadual Certifications" />
                <UserCards className="my-5" description="Numbers and Counts" title="Auction Materials" />
            </div>
            <div className="card-container mx-5">
                <UserCards className="my-5" description="Numbers and Counts" title="Offline Tender Filling" />
                <UserCards className="my-5" description="Numbers and Counts" title="Gem Registration" />
            </div>
            <div className='card-container mx-5'>
                <UserCards className="my-5" description="Numbers and Counts" title="Joint Venture" />
                <UserCards className="my-5" description="Numbers and Counts" title="Online Tender Filling" />
            </div>
        </div>
    );
};

export default UserDetails;

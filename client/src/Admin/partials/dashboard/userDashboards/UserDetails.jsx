import { useEffect, useState } from "react";
import UserCards from "./UserCards";
import UserSideBar from "./UserSideBar";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const UserDetails = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let userData1 = localStorage.getItem("user");
    let userDataObject = userData1 ? JSON.parse(userData1) : null;
    setUserData(userDataObject);
    let id = userDataObject?.userId;
    console.log(id);
    if (id) {
      fetch(`${BASE_URL}/userdetails/DetailsbyId/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  let careerManPower = userData[2]?.number + userData[3]?.number;
  return (
    <div>
      <div className="flex flex-wrap justify-center m-5">
        <div className="grid grid-cols-3">
          <UserCards
            className="my-5"
            title="Career & Manpower"
            description={careerManPower}
            buttonLink1=""
            buttonLink2="/careerandmanpower"
            formData={userData[2]?.latestForm}
          />
          <UserCards
            className="my-5"
            title="Registrations"
            description={userData[6]?.number}
            buttonLink1=""
            buttonLink2="/regandcert"
            formData={userData[6]?.latestForm}

          />
          <UserCards
            className="my-5"
            title="Company Certifications"
            description={userData[5]?.number}
            buttonLink1=""
            buttonLink2="/certification"
            formData={userData[5]?.latestForm}

          />
          <UserCards
            className="my-5"
            title="Licenses"
            description={userData[1]?.number}
            buttonLink1=""
            buttonLink2="/contact"
            formData={userData[1]?.latestForm}

          />
          <UserCards
            className="my-5"
            title="Individual Certifications"
            description={userData[4]?.number}
            buttonLink1=""
            buttonLink2="/certification"
            formData={userData[4]?.latestForm}

          />
          <UserCards
            className="my-5"
            title="Auction Materials"
            description={userData[0]?.number}
            buttonLink1=""
            buttonLink2="/auctionmaterial"
            formData={userData[0]?.latestForm}

          />
          <UserCards
            className="my-5"
            title="Offline Tender Filling"
            description={userData[8]?.number}
            buttonLink1="/tenderfillingoffline"
            buttonLink2="/tenderfillingoffline"
            formData={userData[8]?.latestForm}

          />
          <UserCards
            className="my-5"
            title="Gem Registration"
            description={userData[10]?.number}
            buttonLink1=""
            buttonLink2="/gemregistration"
            formData={userData[10]?.latestForm}

          />
          <UserCards
            className="my-5"
            title="Joint Venture"
            description={userData[7]?.number}
            buttonLink1=""
            buttonLink2="/jointventure"
            formData={userData[7]?.latestForm}

          />
          <UserCards
            className="my-5"
            title="Online Tender Filling"
            description={userData[9]?.number}
            buttonLink1=""
            buttonLink2="/tenderfillingonline"
            formData={userData[9]?.latestForm}

          />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

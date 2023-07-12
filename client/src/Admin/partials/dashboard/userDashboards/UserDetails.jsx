import { useEffect, useState } from "react";
import UserCards from "./UserCards";

const UserDetails = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let userData1 = localStorage.getItem("user");
    let userDataObject = userData1 ? JSON.parse(userData1) : null;
    setUserData(userDataObject);
    let id = userDataObject?.userId;
    console.log(id);
    if (id) {
      fetch(`http://localhost:5000/apiTender/userdetails/DetailsbyId/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  // console.log(userData);
  let careerManPower = userData[2]?.number + userData[3]?.number;
  return (
    <div className="flex flex-wrap justify-center m-5">
      <div className="grid grid-cols-3">
        <UserCards
          className="my-5"
          title="Career & Manpower"
          description={careerManPower}
          buttonLink1=""
          buttonLink2="/careerandmanpower"
        />
        <UserCards
          className="my-5"
          title="Registrations"
          description={userData[6]?.number}
          buttonLink1=""
          buttonLink2="/regandcert"
        />
        <UserCards
          className="my-5"
          title="Company Certifications"
          description={userData[5]?.number}
          buttonLink1=""
          buttonLink2="/certification"
        />
        <UserCards
          className="my-5"
          title="Licenses"
          description={userData[1]?.number}
          buttonLink1=""
          buttonLink2="/contact"
        />
        <UserCards
          className="my-5"
          title="Individual Certifications"
          description={userData[4]?.number}
          buttonLink1=""
          buttonLink2="/certification"
        />
        <UserCards
          className="my-5"
          title="Auction Materials"
          description={userData[0]?.number}
          buttonLink1=""
          buttonLink2="/auctionmaterial"
        />
        <UserCards
          className="my-5"
          title="Offline Tender Filling"
          description={userData[8]?.number}
          buttonLink1=""
          buttonLink2="/tenderfillingoffline"
        />
        <UserCards
          className="my-5"
          title="Gem Registration"
          description={userData[10]?.number}
          buttonLink1=""
          buttonLink2="/gemregistration"
        />
        <UserCards
          className="my-5"
          title="Joint Venture"
          description={userData[7]?.number}
          buttonLink1=""
          buttonLink2="/jointventure"
        />
        <UserCards
          className="my-5"
          title="Online Tender Filling"
          description={userData[9]?.number}
          buttonLink1=""
          buttonLink2="/tenderfillingonline"
        />
      </div>
    </div>
  );
};

export default UserDetails;

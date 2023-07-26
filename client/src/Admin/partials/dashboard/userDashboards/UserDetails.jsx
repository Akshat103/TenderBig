import { useEffect, useState } from "react";
import UserCards from "./UserCards";
import UserSideBar from "./UserSideBar";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const UserDetails = () => {
  const [userData, setUserData] = useState([]);

  const token = localStorage.getItem('token');

  const headers = {
    'auth': token
  };

  useEffect(() => {
    let userData1 = localStorage.getItem("user");
    let userDataObject = userData1 ? JSON.parse(userData1) : null;
    setUserData(userDataObject);
    let id = userDataObject?.userId;
    if (id) {
      fetch(`${BASE_URL}/userdetails/DetailsbyId/${id}`, { headers })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  function getFormDetailsByName(formName) {
    for (const key in userData) {
      if (userData[key].formName == formName) {
        return userData[key];
      }
    }
    return null;
  }

  const Seeker = getFormDetailsByName('seeker');
  const Employer = getFormDetailsByName('employer');
  const Registration = getFormDetailsByName('registration');
  const CompanyCert = getFormDetailsByName('Company');
  const IndividualCert = getFormDetailsByName('Individual Certification');
  const Jointventure = getFormDetailsByName('joint venture');
  const AuctionMaterial = getFormDetailsByName('Auction Material');
  const tenderOnline = getFormDetailsByName('Tender Online');
  const Gem = getFormDetailsByName('Gem Registration');

  return (
    <div>
      <div className="flex flex-wrap justify-center m-5">
        <div className="grid grid-cols-3">
          {Seeker ?
            <UserCards
              className="my-5"
              title="Seeker"
              description={Seeker.number}
              buttonLink1=""
              buttonLink2="/seeker"
              formData={Seeker.latestForm}
            /> : <UserCards
              className="my-5"
              title="Seeker"
              description="Getting up"
              buttonLink1=""
            />
          }
          {Employer ? <UserCards
            className="my-5"
            title="Employer"
            description={Employer.number}
            buttonLink1=""
            buttonLink2="/employer"
            formData={Employer.latestForm}
          /> : <UserCards
            className="my-5"
            title="Employer"
            description="Getting up"
            buttonLink1=""
          />
          }

          {Registration ? <UserCards
            className="my-5"
            title="Registrations"
            description={Registration.number}
            buttonLink1=""
            buttonLink2="/regandcert"
            formData={Registration.latestForm}
          /> : <UserCards
            className="my-5"
            title="Registrations"
            description="Getting up"
            buttonLink1=""
          />
          }

          {CompanyCert ? <UserCards
            className="my-5"
            title="Company Certifications"
            description={CompanyCert.number}
            buttonLink1=""
            buttonLink2="/certification"
            formData={CompanyCert.latestForm}
          /> : <UserCards
            className="my-5"
            title="Company Certifications"
            description="Getting up"
            buttonLink1=""
          />
          }

          {IndividualCert ? <UserCards
            className="my-5"
            title="Individual Certifications"
            description={IndividualCert.number}
            buttonLink1=""
            buttonLink2="/certification"
            formData={IndividualCert.latestForm}
          /> : <UserCards
            className="my-5"
            title="Individual Certifications"
            description="Getting up"
            buttonLink1=""
          />
          }

          {Jointventure ? <UserCards
            className="my-5"
            title="Joint Venture"
            description={Jointventure.number}
            buttonLink1=""
            buttonLink2="/jointventure"
            formData={Jointventure.latestForm}
          /> : <UserCards
            className="my-5"
            title="Joint Venture"
            description="Getting up"
            buttonLink1=""
          />}

          {AuctionMaterial ? <UserCards
            className="my-5"
            title="Auction Materials"
            description={AuctionMaterial.number}
            buttonLink1=""
            buttonLink2="/auctionmaterial"
            formData={AuctionMaterial.latestForm}
          /> : <UserCards
            className="my-5"
            title="Auction Materials"
            description="Getting up"
            buttonLink1=""
          />}

          {tenderOnline ? <UserCards
            className="my-5"
            title="Online Tender Filling"
            description={tenderOnline.number}
            buttonLink1=""
            buttonLink2="/tenderfillingonline"
            formData={tenderOnline.latestForm}
          /> : <UserCards
            className="my-5"
            title="Online Tender Filling"
            description="Getting up"
            buttonLink1=""
          />}

          {Gem ? <UserCards
            className="my-5"
            title="Gem Registration"
            description={Gem.number}
            buttonLink1=""
            buttonLink2="/gemregistration"
            formData={Gem.latestForm}
          /> : <UserCards
            className="my-5"
            title="Gem Registration"
            description="Getting up"
            buttonLink1=""
          />}

        </div>
      </div>
    </div>
  );
};

export default UserDetails;

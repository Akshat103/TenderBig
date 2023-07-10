import UserCards from "./UserCards";

const UserDetails = () => {
    return (
        <>
            <div className="grid grid-cols-4 gap-4 mt-4">
                <UserCards className="mx-4" title="Career & Manpower" />
                <UserCards className="mx-4" title="Registration" />
                <UserCards className="mx-4" title="Certification" />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                <UserCards className="mx-4" title="License" />
                <UserCards className="mx-4" title="Auction Material" />
                <UserCards className="mx-4" title="Joint Venture" />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                <UserCards className="mx-4" title="Tender Filling Online" />
                <UserCards className="mx-4" title="Tender Filling Offline" />
                <UserCards className="mx-4" title="Gem Registration" />
            </div>
        </>
    );
};

export default UserDetails;

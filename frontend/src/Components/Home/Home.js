import React, { useEffect, useState } from "react";
import axios from "axios";
import ControlledPopup from "../Popup/ControlledPopup";

export default function Home(props) {
    const [userInfo, setUserInfo] = useState({
        userId: "",
        itineraries: [],
        itineraryId: "",
        itineraryName: "",
        startingPoint: "",
        itineraryDate: "",
        data: {},
    });

    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const storageUserId = localStorage.getItem("jwtUserId");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    // USE EFFECT
    useEffect(() => {
        console.log("------------------HOME-----------------");
        const getItinerary = async () => {
            const result = await axios.get(
                `http://localhost:8081/itinerary/getItineraries/user/${storageUserId}`,
                config
            );
            console.log(result);
            setUserInfo((prevInfo) => ({
                ...prevInfo,
                userId: storageUserId,
                itineraries: [...result.data],
                itineraryId: result.data.itineraryId,
                itineraryName: result.data.itineraryName,
                startingPoint: result.data.startingPoint,
                itineraryDate: result.data.itineraryDate,
                data: result,
            }));
        };
        getItinerary();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function goToItinerary(lm) {
        window.localStorage.setItem(`currentItinerary`, JSON.stringify(lm));
        window.location.replace(`/itinerary`);
    }

    // DISPLAYS
    const displayItineraries = userInfo.itineraries.map((lm, count = 0) => (
        <li className="landmark-list-items" key={count + 1}>
            <button
                className="landmark-list-buttons"
                id={lm.itineraryId}
                onClick={() => goToItinerary(lm)}
            >
                {lm.itineraryName} - {lm.itineraryId}
            </button>
        </li>
    ));

    // JSX
    return (
        <div>
            <div className="itinerary-card">
                {/* title */}
                <h1 className="itinerary-card-title">Itinerary Lists</h1>
                {/* image */}
                <div className="itinerary-card-image">
                    <img className="itinerary-image" alt="" src="Map.png" />
                </div>
                {/* edit buttons */}
                <div className="landmark-action-buttons">
                    {/* Popup - CREATE */}
                    <div className="popup-wrapper">
                        <ControlledPopup />
                    </div>
                    {/* button - ROUTE
                    <button
                        className="create-button border-none"
                        styles={"cursor:pointer"}
                        title="Route"
                    >
                        <img src="btnMap.png" alt="generate route button" />
                    </button> */}
                </div>
                <div className="itinerary-card-body">
                    {/* location list */}
                    <ul className="landmark-list">
                        {/* <li className="landmark-list-items">
                            <button
                                className="startPoint-button"
                                onMouseOver={() => setIsHover(() => true)}
                                onMouseOut={() => setIsHover(() => false)}
                            >
                                {userInfo.locationStart}
                                {isHover && (
                                    <span className="dim"> - edit</span>
                                )}
                            </button>
                        </li> */}
                        {displayItineraries}
                    </ul>
                    {/* save / delete */}
                    <div className="landmark-action-buttons">
                        <div className="save">
                            {/* <button className="save-button" type="submit" onClick={handleSubmit}>Save</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

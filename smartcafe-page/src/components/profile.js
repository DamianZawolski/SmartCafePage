import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  //function that prints the data from the API to the console (API is https://smartcafeapi-1018869454751.europe-west10.run.app/user/list)
  async function fetchData() {
    const response = await fetch("https://smartcafeapi-1018869454751.europe-west10.run.app/user/list");
    const data = await response.json();
    console.log(data);
    //prints the data in div (example object -{
    //"address": "Mexico",
    //"age": 42,
    //"id": 2345,
    //"name": "Test name 2"
    //})
    document.querySelector("ul").innerHTML = "";
    data.forEach((element) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <p>Address: ${element.address}</p>
          <p>Age: ${element.age}</p>
          <p>ID: ${element.id}</p>
          <p>Name: ${element.name}</p>
        </div>
      `;
      document.querySelector("ul").appendChild(li);
    });
    

  }

  
  return (
    <div>
      
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={userDetails.photo}
              width={"40%"}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            {/* <p>Last Name: {userDetails.lastName}</p> */}
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
          <button className="btn btn-primary" onClick={fetchData}>
            Fetch Data
          </button>
          <h1>Data from API</h1>
          <ul></ul>          
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Profile;

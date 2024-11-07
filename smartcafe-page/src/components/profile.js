import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./navbar";
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [apiData, setApiData] = useState([]);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
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

  async function fetchData() {
    const response = await fetch("https://smartcafeapi-1018869454751.europe-west10.run.app/user/list");
    const data = await response.json();
    setApiData(data);
  }

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'User Activity',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [30, 20, 50, 40, 60, 70, 80],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Product Distribution',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const salesData = [
    { id: 1, product: 'Coffee', quantity: 100, price: '$200' },
    { id: 2, product: 'Tea', quantity: 150, price: '$300' },
    { id: 3, product: 'Sandwich', quantity: 50, price: '$100' },
    { id: 4, product: 'Cake', quantity: 75, price: '$150' },
  ];

  return (
    <div>
      <div className="container mt-5">
        {userDetails ? (
          <>
            <div className="text-center">
              <img
                src={userDetails.photo}
                width={"150px"}
                style={{ borderRadius: "50%" }}
                alt="User"
              />
              <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
              <p>Email: {userDetails.email}</p>
              <p>First Name: {userDetails.firstName}</p>
              {/* <p>Last Name: {userDetails.lastName}</p> */}
              <button className="btn btn-primary m-2" onClick={handleLogout}>
                Logout
              </button>
              <button className="btn btn-primary m-2" onClick={fetchData}>
                Fetch Data
              </button>
            </div>
            <h1 className="mt-5">Data from API</h1>
            <ul className="list-group">
              {apiData.map((element, index) => (
                <li key={index} className="list-group-item">
                  <div>
                    <p>Address: {element.address}</p>
                    <p>Age: {element.age}</p>
                    <p>ID: {element.id}</p>
                    <p>Name: {element.name}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h1 className="mt-5">User Activity</h1>
            <Line data={lineData} />
            <h1 className="mt-5">Monthly Sales</h1>
            <Bar data={barData} />
            <h1 className="mt-5">Product Distribution</h1>
            <Pie data={pieData} />
            <h1 className="mt-5">Sales Data</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.id}</td>
                    <td>{sale.product}</td>
                    <td>{sale.quantity}</td>
                    <td>{sale.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

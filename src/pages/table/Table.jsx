import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc ,updateDoc  } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Username", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
  },
  {
    field: "date",
    headerName: "Added Date",
    width: 200,
    valueGetter: (params) => {
      function toDateTime(secs) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
      }
      let normalDate = toDateTime(params.row.timeStamp.seconds);

      return `${normalDate}`;
    },
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

// const rows = [
//   { id: 1, username: "Snow", email: "Jon" },
//   { id: 2, username: "Lannister", email: "Cersei" },
//   { id: 3, username: "Lannister", email: "Jaime" },
//   { id: 4, username: "Stark", email: "Arya" },
//   { id: 5, username: "Targaryen", email: "Daenerys" },
//   { id: 6, username: "Melisandre", email: null },
//   { id: 7, username: "Clifford", email: "Ferrara" },
// ];

const Table = () => {
  const [rows, setRows] = useState([]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setRows(rows.filter((row) => row.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = async (id,sta)=>{
    try {
      const targetUser = doc(db,"users",id);
      // console.log(targetUser);
      await updateDoc(targetUser, {
        status : sta==="active"? "inactive" : "active",
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          list.push({ id: doc.id, ...doc.data() });
          // console.log(doc.id, " => ", doc.data());
        });
        setRows(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [rows]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <div
              className="toggleButton"
              onClick={() => handleToggle(params.row.id,params.row.status)}
            >
              Toggle Status
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="table">
        <div className="dataTable" style={{ height: 400, width: "100%" }}>
          <div className="newButton">
            <Link
              to="/new"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Add New User
            </Link>
          </div>
          <DataGrid
            rows={rows}
            columns={columns.concat(actionColumn)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </div>
    </>
  );
};

export default Table;

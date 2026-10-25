const Dashboard = () => {

  const google = localStorage.getItem("googleUsers");
  const user = google ? JSON.parse(google) : null; 

  return (
    <>
      <div>
        <div className="header fixed left-0 top-0 w-40 h-screen bg-green-100 flex flex-col items-center gap-6 pt-6">
          <h1 className="font-bold text-xl">ONB</h1>

          {user?.picture && (
            <img src={user.picture} alt={user.name} className="h-20 w-20 rounded-full object-cover border-2 border-white shadow-sm"/>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
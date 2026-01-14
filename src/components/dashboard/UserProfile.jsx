// import Button from "./Button";
import "./UserProfile.css";
function UserProfile({ userDetails }) {
return (
<div className="card">
<br></br>
<h1 className="title">User Profile Information</h1>
<img
id="userimg"
width="200px"
height="450px"
src="https://cdn2.iconfinder.com/data/icons/user-management/512/profile_settings-512.png"
/>
<p className="title" id="fname">
{"First Name : " + userDetails.firstName}
</p>
<p className="title" id="lname">
{"Last Name: " + userDetails.lastName}
</p>
<p className="title" id="mailid">
{"Email Address: " + userDetails.mailid}
</p>
<p className="title" id="tzone">
{"Time Zone: " + userDetails.timeZone}
</p>
<p className="title" id="ctime">
{"Joined On: " + userDetails.createdTime}
</p>
{/* <Button btnvalue={{ title: "Logout" }}></Button> */}
</div>
);
}
export default UserProfile;
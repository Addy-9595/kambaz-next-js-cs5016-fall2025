export default function PeopleDetails({ user }: { user: any }) {
   // Display detailed information about a user
  return (
    <div className="border p-3">
      <h4>User Details</h4>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>DOB:</strong> {user.dob?.split("T")[0]}</p>
    </div>
  );
}
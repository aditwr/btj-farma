import ManageRole from "./components/ManageRole";

export default async function ManageRolePage() {
  return (
    <div className="">
      <div className="text-base font-semibold">Manage Role</div>
      <div className="mt-2">
        <ManageRole />
      </div>
    </div>
  );
}

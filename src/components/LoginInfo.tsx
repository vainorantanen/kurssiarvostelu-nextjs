import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="shadow-lg p-4 bg-gray-200 rounded-lg my-4">
        <div className="text-sm font-bold">User Information</div>
        <div className="text-xs">
          <div>
            Name: <span className="text-black font-semibold">{session?.user?.name}</span>
          </div>
          <div>
            Email: <span className="text-black font-semibold">{session?.user?.email}</span>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-3 py-1 mt-2 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

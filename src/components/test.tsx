import { useUsers } from "../context/providers/UserProvider";

export default function Header() {
  const { users } = useUsers();
  console.log('🚀 ~ Header ~ users', users);
  return (
    <>
    { `Test${users[0]?.question}` }
    </>
  );
}

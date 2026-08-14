const Navbar = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="font-bold text-4xl text-white">Password Manager</h1>
      <div className="flex gap-6 text-gray-300">
        <span className="hover:text-white cursor-pointer">Home</span>
        <span className="hover:text-white cursor-pointer">About</span>
        <span className="hover:text-white cursor-pointer">Contact</span>
      </div>
    </div>
  );
};

export default Navbar;

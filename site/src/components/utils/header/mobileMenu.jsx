function MobileMenu({ toggleMenu }) {
  return (
    <div className="md:hidden flex flex-col items-center gap-6 bg-black bg-opacity-90 px-6 pb-6 text-white text-lg font-semibold">
      <span onClick={toggleMenu}>Головна</span>
      <span onClick={toggleMenu}>Апартаменти</span>
      <span onClick={toggleMenu}>Контакти</span>
      <span className="mt-4 font-bold">+38 068 588 8666</span>
      <button
        onClick={toggleMenu}
        className="border border-white rounded-full px-6 py-2 text-sm font-bold hover:bg-white hover:text-black transition"
      >
        Забронювати
      </button>
    </div>
  );
}

export default MobileMenu;

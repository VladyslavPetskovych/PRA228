function ContactAndButton() {
  return (
    <div className="hidden md:flex flex-col items-end gap-2">
      <span className="font-bold whitespace-nowrap">+38 068 588 8666</span>
      <button className="border border-white rounded-full px-6 py-2 text-sm font-bold hover:bg-white hover:text-black transition">
        Забронювати
      </button>
    </div>
  );
}

export default ContactAndButton;

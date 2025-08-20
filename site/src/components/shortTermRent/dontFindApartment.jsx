import React from "react";

/**
 * DontFindApartment — універсальний блок “Не знайшли квартиру?”
 * Використання:
 * <DontFindApartment />                  // варіант 1 за замовчуванням
 * <DontFindApartment variant={3} />      // будь-який з 1..5
 * <DontFindApartment phone="+380..." tg="https://t.me/..."/>
 */
export default function DontFindApartment({
  variant = 1,
  phone = "+380777711400",
  phoneLabel = "+380 777 711 400",
  tg = "https://t.me/prime_rest_apartments",
  catalogHref = "/short-term-rent",
  requestHref = "/short-term-rent", 
}) {
  const Title = ({ children }) => (
    <h2 className="font-moderustic text-2xl sm:text-3xl font-semibold text-brand-black">
      {children}
    </h2>
  );

  const Sub = ({ children }) => (
    <p className="font-golos text-sm sm:text-base text-brand-black/80">
      {children}
    </p>
  );

  const PrimaryBtn = ({ href, children }) => (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm sm:text-base font-semibold text-brand-white"
      style={{ background: "#B86F21" }} // brand.orange
    >
      {children}
    </a>
  );

  const SecondaryBtn = ({ href, children }) => (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm sm:text-base text-brand-black"
      style={{ borderColor: "#B86F21" }}
    >
      {children}
    </a>
  );

  const PhoneBtn = () => (
    <a
      href={`tel:${phone}`}
      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm sm:text-base font-semibold text-brand-white"
      style={{ background: "#B86F21" }}
    >
      Зателефонувати • {phoneLabel}
    </a>
  );



  // ---------- VARIANT 2: Split (бежевий фон + акцент) ----------
  const V2 = () => (
    <section className="mx-auto my-16 w-full max-w-6xl overflow-hidden rounded-3xl bg-brand-beige">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-6 sm:p-10 md:col-span-2 space-y-3">
          <Title>Потрібна допомога з підбором?</Title>
          <Sub>Надішліть нам 2–3 критерії: бюджет, дати та побажання.</Sub>
          <div className="mt-4 flex flex-wrap gap-3">
            <PrimaryBtn href={requestHref}>Підібрати квартиру</PrimaryBtn>
            <SecondaryBtn href={catalogHref}>Каталог</SecondaryBtn>
            <a
              href={tg}
              className="rounded-xl px-4 py-2 text-sm sm:text-base text-brand-black/80 underline"
            >
              Telegram
            </a>
          </div>
        </div>
        <div className="md:border-l border-brand-white/40 bg-brand-white/60 p-6 sm:p-10">
          <div className="rounded-2xl border bg-brand-white p-5">
            <h3 className="font-moderustic text-lg text-brand-black mb-2">
              Швидкі контакти
            </h3>
            <div className="space-y-2 font-golos text-sm text-brand-black/80">
              <div className="flex items-center justify-between">
                <span>Телефон</span>
                <a
                  href={`tel:${phone}`}
                  className="font-semibold text-brand-black underline decoration-brand-orange/50"
                >
                  {phoneLabel}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>Telegram</span>
                <a href={tg} className="underline">
                  повідомлення
                </a>
              </div>
            </div>
            <div className="mt-4">
              <PhoneBtn />
            </div>
          </div>
        </div>
      </div>
    </section>
  );


  const variants = {2: V2,  };
  const Comp = variants[variant] ?? V1;
  return <Comp />;
}

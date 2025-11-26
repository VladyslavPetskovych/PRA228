import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-brand-beige py-24 px-4 sm:px-6 lg:px-8 font-golos">
      <div className="max-w-4xl mx-auto mt-9 bg-brand-white shadow-xl rounded-3xl p-8 sm:p-12 border border-brand-black/10 relative overflow-hidden">
        {/* Decorative background accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <h1 className="text-4xl sm:text-5xl font-bold  text-center text-brand-orange mb-12">
          Правила та умови користування сайтом
        </h1>

        <p className="text-brand-black text-lg leading-relaxed mb-10">
          Ласкаво просимо на сайт нашого сервісу оренди квартир.
          Використовуючи сайт та оформлюючи бронювання, ви погоджуєтесь із
          викладеними нижче правилами.
        </p>

        {/* Blocks */}
        <div className="space-y-12">
          {/* 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-orange mb-4">
              1. Загальні положення
            </h2>
            <ul className="space-y-3 text-brand-black leading-relaxed marker:text-brand-orange list-disc pl-5">
              <li>
                Сайт призначений для ознайомлення з квартирами та
                онлайн-бронювання.
              </li>
              <li>Інформація може оновлюватися без попередження.</li>
              <li>
                Користувач зобовʼязаний використовувати сайт лише для законних
                цілей.
              </li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-orange mb-4">
              2. Бронювання та оплата
            </h2>
            <p className="text-brand-black leading-relaxed mb-4">
              Після оформлення заявки адміністратор звʼяжеться з вами для
              підтвердження. Бронювання вважається дійсним після внесення
              передоплати.
            </p>
            <ul className="list-decimal pl-5 marker:text-brand-orange text-brand-black space-y-3">
              <li>Передоплата гарантує закріплення квартири.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-orange mb-4">
              3. Заселення та проживання
            </h2>
            <p className="text-brand-black mb-4 leading-relaxed">
              Заселення — після 14:00, виселення — до 11:00. Гість повинен мати
              документ, що посвідчує особу.
            </p>
            <ul className="list-disc pl-5 marker:text-brand-orange text-brand-black space-y-3">
              <li>Гість відповідає за збереження майна.</li>
              <li>Куріння та надмірний шум заборонені!!!!!!!!</li>
              <li>Адміністрація може припинити проживання при порушеннях.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-orange mb-4">
              4. Конфіденційність та обробка даних
            </h2>
            <p className="text-brand-black leading-relaxed">
              Персональні дані використовуються лише для обробки бронювання і не
              передаються третім особам.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-orange mb-4">
              5. Відповідальність сторін
            </h2>
            <ul className="list-disc pl-5 marker:text-brand-orange text-brand-black space-y-3 leading-relaxed">
              <li>Тимчасові технічні збої роботи сайту.</li>
              <li>Некоректні дії користувача.</li>
              <li>Помилки при введенні контактних даних.</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-orange mb-4">
              6. Зміни до правил
            </h2>
            <p className="text-brand-black leading-relaxed">
              Компанія залишає за собою право змінювати ці умови без
              попереднього повідомлення.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-orange mb-4">
              7. Надавачі послуг
            </h2>
            <p className="text-brand-black mb-4 leading-relaxed">
              Послуги з розміщення надаються наступними субʼєктами
              господарювання:
            </p>
            <ul className="list-disc pl-5 marker:text-brand-orange text-brand-black space-y-3">
              <li>ФОП Химочка С-Л. А.</li>
              <li>ФОП Химочка Р.А.</li>
              <li>ФОП Шев'як О.В.</li>
              <li>ФОП Дмитрик К.В.</li>
              <li>ФОП Шев'як М.М.</li>
              <li>ТзОВ "Арісто ІНС"</li>
            </ul>
          </section>
        </div>

        <div className="text-center mt-14 text-sm text-brand-black/60">
          Останнє оновлення: {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

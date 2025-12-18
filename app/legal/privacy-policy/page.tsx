import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to main page</span>
      </Link>

      <h1 className="text-3xl font-bold mb-8">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ СЕРВИСА JOBSNIPER</h1>

      <div className="prose prose-slate max-w-none space-y-6">
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Общие положения</h2>
        <p>
          ИП Повстянко уважает право Пользователей на конфиденциальность. Настоящая Политика
          регламентирует сбор, использование и защищаем вашу информацию.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Сбор данных</h2>
        <p>
          Мы собираем следующие данные: email, имя пользователя, технические данные (IP-адреса,
          cookies), данные резюме (при загрузке).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Платежные данные</h2>
        <p>
          Мы не храним полные данные ваших банковских карт. Обработка платежей, включая номера
          карты, CVC-кода и срока действия, происходит на защищенных серверах платёжного центра АО
          «Народный Банк Казахстана». Безопасность транзакций обеспечивается по стандартам PCI DSS и
          с использованием протоколов 3D Secure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Использование данных</h2>
        <p>Данные используются исключительно для:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Предоставления доступа к Сервису.</li>
          <li>Связи с Пользователем (техническая поддержка, уведомления).</li>
          <li>Соблюдения требований законодательства РК.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Передача третьим лицам</h2>
        <p>
          Мы не передаём ваши данные третьим лицам, за исключением случаев, предусмотренных
          законодательством Республики Казахстан, или когда это необходимо для выполнения услуги
          (например, банку для проведения платежа).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Контакты</h2>
        <p>
          По вопросам обработки персональных данных вы можете связаться с нами по адресу:{' '}
          <a href="mailto:andrey.povstyanko.00@gmail.com" className="text-cyan-600 hover:underline">
            andrey.povstyanko.00@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

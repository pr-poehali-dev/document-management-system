import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Icon name="Building2" size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">DocFlow</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="lg">
                  Вход
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Icon name="UserPlus" size={18} className="mr-2" />
                  Регистрация
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Современная корпоративная система
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Управление компанией в <span className="text-blue-600">одном месте</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Автоматизируйте задачи, документооборот и бизнес-процессы. 
            Повысьте эффективность работы команды с помощью умной системы управления.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-6">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
                <Icon name="Rocket" size={20} className="mr-2" />
                Начать работу
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти в систему
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Бесплатный пробный период 14 дней • Без кредитной карты
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="border-2 hover:border-blue-300 transition-all hover:shadow-xl">
            <CardHeader>
              <div className="p-3 bg-blue-100 rounded-xl w-fit mb-4">
                <Icon name="CheckSquare" size={32} className="text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Управление задачами</CardTitle>
              <CardDescription className="text-base">
                Создавайте, назначайте и отслеживайте выполнение задач в режиме реального времени
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                  <span className="text-gray-700">Автоматическое назначение задач</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                  <span className="text-gray-700">Контроль сроков выполнения</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                  <span className="text-gray-700">Приоритизация и статусы</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-purple-300 transition-all hover:shadow-xl">
            <CardHeader>
              <div className="p-3 bg-purple-100 rounded-xl w-fit mb-4">
                <Icon name="FileText" size={32} className="text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Документооборот</CardTitle>
              <CardDescription className="text-base">
                Автоматизируйте маршрутизацию и согласование документов с анализом рисков
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                  <span className="text-gray-700">Умная маршрутизация</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                  <span className="text-gray-700">Анализ рисков документов</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                  <span className="text-gray-700">Электронные подписи</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-300 transition-all hover:shadow-xl">
            <CardHeader>
              <div className="p-3 bg-green-100 rounded-xl w-fit mb-4">
                <Icon name="BarChart3" size={32} className="text-green-600" />
              </div>
              <CardTitle className="text-2xl">Аналитика</CardTitle>
              <CardDescription className="text-base">
                Получайте детальную статистику и отчёты по эффективности работы команды
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                  <span className="text-gray-700">Дашборды в реальном времени</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                  <span className="text-gray-700">KPI и метрики эффективности</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                  <span className="text-gray-700">Экспорт отчётов</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Как это работает
            </h3>
            <p className="text-lg text-gray-600">
              Начните использовать DocFlow всего за 3 простых шага
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 -z-10"></div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-blue-100">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
                <div className="pt-4 text-center space-y-4">
                  <div className="inline-block p-4 bg-blue-50 rounded-2xl">
                    <Icon name="UserPlus" size={40} className="text-blue-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">Регистрация</h4>
                  <p className="text-gray-600">
                    Создайте аккаунт за 30 секунд. Никаких сложных настроек и установок программ
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-purple-100">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
                <div className="pt-4 text-center space-y-4">
                  <div className="inline-block p-4 bg-purple-50 rounded-2xl">
                    <Icon name="Settings" size={40} className="text-purple-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">Настройка</h4>
                  <p className="text-gray-600">
                    Добавьте команду, настройте процессы под вашу компанию за несколько кликов
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-green-100">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
                <div className="pt-4 text-center space-y-4">
                  <div className="inline-block p-4 bg-green-50 rounded-2xl">
                    <Icon name="TrendingUp" size={40} className="text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">Результаты</h4>
                  <p className="text-gray-600">
                    Наблюдайте за ростом эффективности и автоматизацией процессов в реальном времени
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6">
                <Icon name="Rocket" size={20} className="mr-2" />
                Попробовать сейчас
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center space-y-6 py-12">
          <h3 className="text-3xl font-bold text-gray-900">
            Начните использовать DocFlow уже сегодня
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Автоматизируйте свои бизнес-процессы и повысьте эффективность работы команды
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
                <Icon name="Rocket" size={20} className="mr-2" />
                Попробовать бесплатно
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Войти в систему
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Icon name="Building2" size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold">DocFlow</span>
              </div>
              <p className="text-gray-600">
                Современная система управления корпоративными процессами
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Продукт</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Возможности</a></li>
                <li><a href="#" className="hover:text-blue-600">Цены</a></li>
                <li><a href="#" className="hover:text-blue-600">Интеграции</a></li>
                <li><a href="#" className="hover:text-blue-600">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">О нас</a></li>
                <li><a href="#" className="hover:text-blue-600">Блог</a></li>
                <li><a href="#" className="hover:text-blue-600">Карьера</a></li>
                <li><a href="#" className="hover:text-blue-600">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Документация</a></li>
                <li><a href="#" className="hover:text-blue-600">Справка</a></li>
                <li><a href="#" className="hover:text-blue-600">Статус</a></li>
                <li><a href="#" className="hover:text-blue-600">Безопасность</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 text-center text-gray-600">
            <p>© 2024 DocFlow. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
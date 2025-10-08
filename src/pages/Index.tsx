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

        <div className="bg-white rounded-3xl p-12 shadow-2xl mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Что говорят наши клиенты
            </h3>
            <p className="text-lg text-gray-600">
              Более 500 компаний уже автоматизировали свои процессы с помощью DocFlow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Анна Смирнова',
                position: 'Директор по развитию',
                company: 'TechCorp',
                avatar: '👩‍💼',
                rating: 5,
                text: 'DocFlow полностью изменил подход к работе нашей команды. Автоматизация документооборота сэкономила нам более 15 часов в неделю!'
              },
              {
                name: 'Михаил Петров',
                position: 'CEO',
                company: 'StartupHub',
                avatar: '👨‍💻',
                rating: 5,
                text: 'Интуитивный интерфейс и мощная аналитика. За 3 месяца использования наша продуктивность выросла на 40%.'
              },
              {
                name: 'Елена Козлова',
                position: 'HR-директор',
                company: 'MegaIndustry',
                avatar: '👩‍🎓',
                rating: 5,
                text: 'Лучшая система для управления задачами и контроля сроков. Внедрили за неделю, сотрудники освоили за день.'
              }
            ].map((review, index) => (
              <Card key={index} className="border-2 hover:border-blue-300 transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-5xl">{review.avatar}</div>
                    <div>
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.position}</p>
                      <p className="text-sm text-blue-600 font-medium">{review.company}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-8 bg-gray-50 rounded-2xl px-8 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Компаний</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">10K+</div>
                <div className="text-sm text-gray-600">Пользователей</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Довольны</div>
              </div>
            </div>
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
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

function Register() {
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [companyData, setCompanyData] = useState({
    companyName: '',
    inn: '',
    industry: '',
    employeeCount: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (personalData.password !== personalData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  const handleSkipCompany = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <Card className="shadow-2xl border-0 lg:order-2">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 1 ? 'bg-purple-600 text-white' : 'bg-green-600 text-white'}`}>
                {step === 1 ? '1' : <Icon name="Check" size={20} />}
              </div>
              <div className={`w-20 h-1 ${step === 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center">
              {step === 1 ? 'Личные данные' : 'Регистрация компании'}
            </CardTitle>
            <CardDescription className="text-center text-base">
              {step === 1 ? 'Создайте свой личный аккаунт' : 'Зарегистрируйте компанию или присоединитесь к существующей'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя *</Label>
                    <Input
                      id="firstName"
                      placeholder="Иван"
                      value={personalData.firstName}
                      onChange={(e) => setPersonalData({...personalData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия *</Label>
                    <Input
                      id="lastName"
                      placeholder="Иванов"
                      value={personalData.lastName}
                      onChange={(e) => setPersonalData({...personalData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="ivan.ivanov@example.com"
                      value={personalData.email}
                      onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <div className="relative">
                    <Icon name="Phone" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={personalData.phone}
                      onChange={(e) => setPersonalData({...personalData, phone: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Пароль *</Label>
                  <div className="relative">
                    <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={personalData.password}
                      onChange={(e) => setPersonalData({...personalData, password: e.target.value})}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Подтвердите пароль *</Label>
                  <div className="relative">
                    <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={personalData.confirmPassword}
                      onChange={(e) => setPersonalData({...personalData, confirmPassword: e.target.value})}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="terms" className="rounded mt-1" required />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Я согласен с{' '}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      условиями использования
                    </Link>
                    {' '}и{' '}
                    <Link to="/privacy" className="text-blue-600 hover:underline">
                      политикой конфиденциальности
                    </Link>
                  </label>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg">
                  Продолжить
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">или</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="py-6">
                    <Icon name="Github" size={20} className="mr-2" />
                    GitHub
                  </Button>
                  <Button type="button" variant="outline" className="py-6">
                    <Icon name="Mail" size={20} className="mr-2" />
                    Google
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-600">
                  Уже есть аккаунт?{' '}
                  <Link to="/login" className="text-purple-600 hover:underline font-medium">
                    Войти
                  </Link>
                </div>
              </form>
            ) : (
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Зарегистрируйте компанию, если вы руководитель, или пропустите этот шаг, если вас пригласили в существующую компанию
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Название компании *</Label>
                  <div className="relative">
                    <Icon name="Building2" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="companyName"
                      placeholder="ООО &quot;Рога и копыта&quot;"
                      value={companyData.companyName}
                      onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inn">ИНН *</Label>
                  <div className="relative">
                    <Icon name="FileText" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="inn"
                      placeholder="1234567890"
                      value={companyData.inn}
                      onChange={(e) => setCompanyData({...companyData, inn: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Отрасль *</Label>
                  <div className="relative">
                    <Icon name="Briefcase" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="industry"
                      placeholder="IT, Финансы, Производство..."
                      value={companyData.industry}
                      onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Количество сотрудников *</Label>
                  <div className="relative">
                    <Icon name="Users" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="employeeCount"
                      placeholder="1-10, 11-50, 51-200..."
                      value={companyData.employeeCount}
                      onChange={(e) => setCompanyData({...companyData, employeeCount: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleSkipCompany}
                    className="py-6 text-base"
                  >
                    <Icon name="X" size={20} className="mr-2" />
                    Пропустить
                  </Button>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white py-6 text-base">
                    <Icon name="Check" size={20} className="mr-2" />
                    Завершить
                  </Button>
                </div>

                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setStep(1)}
                  className="w-full text-gray-600"
                >
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  Назад
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="hidden lg:block space-y-6 lg:order-1">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-600 rounded-xl">
                <Icon name="Rocket" size={32} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Присоединяйтесь к нам</h1>
            </div>
            <p className="text-xl text-gray-600">
              Станьте частью эффективной команды и начните работать продуктивнее уже сегодня
            </p>
          </div>

          <div className="space-y-4">
            {[
              { 
                icon: 'Zap', 
                title: 'Быстрая регистрация', 
                desc: 'Создайте аккаунт за несколько минут и сразу начните работать',
                color: 'bg-yellow-50 border-yellow-200',
                iconColor: 'text-yellow-600'
              },
              { 
                icon: 'Shield', 
                title: 'Безопасность данных', 
                desc: 'Ваши данные защищены современными протоколами шифрования',
                color: 'bg-green-50 border-green-200',
                iconColor: 'text-green-600'
              },
              { 
                icon: 'Users', 
                title: 'Командная работа', 
                desc: 'Работайте вместе с коллегами над проектами и задачами',
                color: 'bg-blue-50 border-blue-200',
                iconColor: 'text-blue-600'
              },
              { 
                icon: 'HeadphonesIcon', 
                title: 'Поддержка 24/7', 
                desc: 'Наша команда всегда готова помочь в любое время',
                color: 'bg-purple-50 border-purple-200',
                iconColor: 'text-purple-600'
              }
            ].map((feature, index) => (
              <div key={index} className={`flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border ${feature.color}`}>
                <div className="p-2 bg-white rounded-lg">
                  <Icon name={feature.icon as any} size={24} className={feature.iconColor} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl border border-purple-200">
            <div className="flex items-center space-x-4">
              <Icon name="Info" size={48} className="text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Нужна помощь?</h3>
                <p className="text-sm text-gray-700">
                  Свяжитесь с нашей службой поддержки: <a href="mailto:support@company.com" className="text-purple-600 hover:underline">support@company.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

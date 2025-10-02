import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Icon name="Building2" size={32} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Корпоративная система</h1>
            </div>
            <p className="text-xl text-gray-600">
              Управление задачами, документами и процессами компании в одном месте
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: 'CheckCircle2', title: 'Управление задачами', desc: 'Создавайте, назначайте и отслеживайте задачи в реальном времени' },
              { icon: 'FileText', title: 'Документооборот', desc: 'Автоматизация согласования и маршрутизации документов' },
              { icon: 'BarChart3', title: 'Аналитика', desc: 'Подробная статистика и отчеты по эффективности работы' },
              { icon: 'Users', title: 'Командная работа', desc: 'Совместная работа над проектами и задачами' }
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon name={feature.icon as any} size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">Вход в систему</CardTitle>
            <CardDescription className="text-center text-base">
              Введите свои данные для доступа к платформе
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Забыли пароль?
                  </Link>
                </div>
                <div className="relative">
                  <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded" />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Запомнить меня
                </label>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg">
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти
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
                Нет аккаунта?{' '}
                <Link to="/register" className="text-blue-600 hover:underline font-medium">
                  Зарегистрироваться
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;

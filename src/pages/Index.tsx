import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface User {
  id: string;
  name: string;
  role: 'employee' | 'manager';
  department: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  department: string;
}

interface Document {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'review' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  author: string;
  department: string;
  lastModified: string;
}

const mockUser: User = {
  id: '1',
  name: 'Анна Петрова',
  role: 'manager',
  department: 'Отдел разработки'
};

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Подготовка отчета по проекту',
    description: 'Подготовить ежемесячный отчет о ходе выполнения проекта',
    assignee: 'Иван Сидоров',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-09-28',
    department: 'Отдел разработки'
  },
  {
    id: '2',
    title: 'Согласование договора с поставщиком',
    description: 'Проверить и согласовать договор поставки оборудования',
    assignee: 'Мария Козлова',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-09-30',
    department: 'Юридический отдел'
  },
  {
    id: '3',
    title: 'Обновление базы данных клиентов',
    description: 'Актуализировать контактную информацию клиентов',
    assignee: 'Петр Васильев',
    status: 'overdue',
    priority: 'high',
    dueDate: '2024-09-25',
    department: 'Отдел продаж'
  }
];

const mockEmployees = [
  { id: '1', name: 'Иван Сидоров', department: 'Отдел разработки', role: 'Разработчик' },
  { id: '2', name: 'Мария Козлова', department: 'Юридический отдел', role: 'Юрист' },
  { id: '3', name: 'Петр Васильев', department: 'Отдел продаж', role: 'Менеджер' },
  { id: '4', name: 'Светлана Николаева', department: 'HR', role: 'HR-специалист' },
  { id: '5', name: 'Алексей Морозов', department: 'ИТ', role: 'Системный администратор' },
  { id: '6', name: 'Ольга Белова', department: 'Бухгалтерия', role: 'Бухгалтер' }
];

const departments = [
  'Отдел разработки',
  'Юридический отдел', 
  'Отдел продаж',
  'HR',
  'ИТ',
  'Бухгалтерия',
  'Закупки',
  'Маркетинг'
];

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Договор поставки №2024-156',
    type: 'Договор',
    status: 'review',
    priority: 'high',
    author: 'Юридический отдел',
    department: 'Закупки',
    lastModified: '2024-09-26'
  },
  {
    id: '2',
    title: 'Заявление на отпуск - Иванов И.И.',
    type: 'Заявление',
    status: 'approved',
    priority: 'low',
    author: 'Иванов И.И.',
    department: 'HR',
    lastModified: '2024-09-25'
  },
  {
    id: '3',
    title: 'Техническое задание проект "Альфа"',
    type: 'Техзадание',
    status: 'draft',
    priority: 'medium',
    author: 'Отдел разработки',
    department: 'ИТ',
    lastModified: '2024-09-24'
  }
];

interface Application {
  id: string;
  type: 'vacation' | 'business_trip' | 'purchase' | 'other';
  title: string;
  applicant: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  submittedDate: string;
  amount?: number;
  period?: string;
}

const mockApplications: Application[] = [
  {
    id: '1',
    type: 'vacation',
    title: 'Заявление на отпуск',
    applicant: 'Анна Петрова',
    status: 'approved',
    priority: 'medium',
    submittedDate: '2024-09-20',
    period: '01.10.2024 - 14.10.2024'
  },
  {
    id: '2',
    type: 'business_trip',
    title: 'Командировка в Санкт-Петербург',
    applicant: 'Иван Сидоров',
    status: 'submitted',
    priority: 'high',
    submittedDate: '2024-09-25',
    amount: 45000,
    period: '05.10.2024 - 08.10.2024'
  },
  {
    id: '3',
    type: 'purchase',
    title: 'Закупка серверного оборудования',
    applicant: 'Алексей Морозов',
    status: 'submitted',
    priority: 'high',
    submittedDate: '2024-09-26',
    amount: 250000
  }
];

const navigationItems = [
  { id: 'dashboard', label: 'Дашборд', icon: 'BarChart3' },
  { id: 'tasks', label: 'Задачи', icon: 'CheckSquare' },
  { id: 'documents', label: 'Документы', icon: 'FileText' },
  { id: 'applications', label: 'Заявления', icon: 'FileEdit' },
  { id: 'analytics', label: 'Аналитика', icon: 'TrendingUp' },
  { id: 'departments', label: 'Отделы', icon: 'Building2' },
  { id: 'employees', label: 'Сотрудники', icon: 'Users' },
  { id: 'profile', label: 'Профиль', icon: 'User' }
];

const getStatusColor = (status: string, type: 'task' | 'document' | 'application') => {
  if (type === 'task') {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  } else if (type === 'application') {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  } else {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-green-100 text-green-800';
  }
};

function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    department: '',
    dueDate: undefined as Date | undefined
  });
  const [tasks, setTasks] = useState(mockTasks);
  const [documents, setDocuments] = useState(mockDocuments);
  const [applications, setApplications] = useState(mockApplications);
  const [newApplication, setNewApplication] = useState({
    type: 'vacation' as 'vacation' | 'business_trip' | 'purchase' | 'other',
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    amount: '',
    destination: '',
    purpose: '',
    documents: [] as string[]
  });
  const [newDocument, setNewDocument] = useState({
    title: '',
    type: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    department: '',
    assignedTask: '',
    approvers: [] as string[],
    riskAnalysis: null as null | { score: number; warnings: string[] }
  });
  
  const approversList = [
    'Анна Петрова (Менеджер)',
    'Дмитрий Козлов (Директор)',
    'Елена Иванова (Юрист)',
    'Александр Попов (Гл. бухгалтер)'
  ];
  
  const documentTypes = [
    'Договор',
    'Справка',
    'Заявление',
    'Отчёт',
    'Протокол',
    'Техзадание',
    'Приказ',
    'Положение'
  ];
  
  const analyzeDocumentRisk = (title: string, type: string) => {
    const riskWords = ['штраф', 'расторжение', 'неустойка', 'односторонний', 'прекращение', 'ответственность', 'ущерб', 'пеня'];
    const warnings: string[] = [];
    let score = 0;
    
    const text = (title + ' ' + type).toLowerCase();
    
    riskWords.forEach(word => {
      if (text.includes(word)) {
        warnings.push(`Обнаружено рисковое слово: "${word}"`);
        score += 20;
      }
    });
    
    if (type === 'Договор') score += 30;
    if (type === 'Приказ') score += 15;
    
    return { score: Math.min(score, 100), warnings };
  };

  const taskStats = {
    total: mockTasks.length,
    completed: mockTasks.filter(t => t.status === 'completed').length,
    inProgress: mockTasks.filter(t => t.status === 'in_progress').length,
    overdue: mockTasks.filter(t => t.status === 'overdue').length
  };

  const documentStats = {
    total: mockDocuments.length,
    pending: mockDocuments.filter(d => d.status === 'review').length,
    approved: mockDocuments.filter(d => d.status === 'approved').length,
    rejected: mockDocuments.filter(d => d.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Building2" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">DocFlow</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Icon name="Bell" size={20} />
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>АП</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{mockUser.name}</p>
                <p className="text-gray-500">{mockUser.department}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Добро пожаловать, {mockUser.name}</h2>
                <p className="text-gray-600">Обзор текущих задач и документов в системе</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Всего задач</CardTitle>
                    <Icon name="CheckSquare" className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{taskStats.total}</div>
                    <p className="text-xs text-muted-foreground">
                      {taskStats.inProgress} в работе
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Просрочено</CardTitle>
                    <Icon name="AlertTriangle" className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
                    <p className="text-xs text-muted-foreground">
                      Требует внимания
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Документы</CardTitle>
                    <Icon name="FileText" className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{documentStats.total}</div>
                    <p className="text-xs text-muted-foreground">
                      {documentStats.pending} на согласовании
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Эффективность</CardTitle>
                    <Icon name="TrendingUp" className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87%</div>
                    <Progress value={87} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Recent Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>Актуальные задачи</CardTitle>
                  <CardDescription>
                    Задачи, требующие вашего внимания
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority === 'high' ? 'Высокий' : 
                               task.priority === 'medium' ? 'Средний' : 'Низкий'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Исполнитель: {task.assignee}</span>
                            <span>Срок: {task.dueDate}</span>
                            <span>{task.department}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(task.status, 'task')}>
                          {task.status === 'in_progress' ? 'В работе' :
                           task.status === 'completed' ? 'Выполнено' :
                           task.status === 'overdue' ? 'Просрочено' : 'Ожидает'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Последние документы</CardTitle>
                  <CardDescription>
                    Недавно обновленные документы в системе
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Icon name="FileText" size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{doc.title}</h4>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                              <span>Тип: {doc.type}</span>
                              <span>Автор: {doc.author}</span>
                              <span>Изменен: {doc.lastModified}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(doc.priority)}>
                            {doc.priority === 'high' ? 'Высокий' : 
                             doc.priority === 'medium' ? 'Средний' : 'Низкий'}
                          </Badge>
                          <Badge className={getStatusColor(doc.status, 'document')}>
                            {doc.status === 'approved' ? 'Одобрено' :
                             doc.status === 'review' ? 'На согласовании' :
                             doc.status === 'rejected' ? 'Отклонено' : 'Черновик'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Управление задачами</h2>
                  <p className="text-gray-600">Создание и назначение задач сотрудникам</p>
                </div>
              </div>

              {/* Create Task Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Создать новую задачу</CardTitle>
                  <CardDescription>
                    Заполните детали задачи и назначьте исполнителя
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Название задачи *</Label>
                      <Input
                        id="title"
                        placeholder="Введите название задачи"
                        value={newTask.title}
                        onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="priority">Приоритет</Label>
                      <Select value={newTask.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewTask(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите приоритет" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Низкий</SelectItem>
                          <SelectItem value="medium">Средний</SelectItem>
                          <SelectItem value="high">Высокий</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание задачи</Label>
                    <Textarea
                      id="description"
                      placeholder="Подробное описание задачи, требования и ожидания"
                      value={newTask.description}
                      onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="department">Отдел</Label>
                      <Select value={newTask.department} onValueChange={(value) => setNewTask(prev => ({ ...prev, department: value, assignee: '' }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите отдел" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignee">Исполнитель *</Label>
                      <Select value={newTask.assignee} onValueChange={(value) => setNewTask(prev => ({ ...prev, assignee: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите исполнителя" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockEmployees
                            .filter(emp => !newTask.department || emp.department === newTask.department)
                            .map((employee) => (
                            <SelectItem key={employee.id} value={employee.name}>
                              <div className="flex flex-col">
                                <span>{employee.name}</span>
                                <span className="text-xs text-gray-500">{employee.role} • {employee.department}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Срок выполнения</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <Icon name="Calendar" className="mr-2 h-4 w-4" />
                            {newTask.dueDate ? format(newTask.dueDate, 'dd.MM.yyyy', { locale: ru }) : 'Выберите дату'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={newTask.dueDate}
                            onSelect={(date) => setNewTask(prev => ({ ...prev, dueDate: date }))}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setNewTask({ title: '', description: '', assignee: '', priority: 'medium', department: '', dueDate: undefined })}>
                      Очистить
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => {
                        if (newTask.title && newTask.assignee) {
                          const task: Task = {
                            id: String(tasks.length + 1),
                            title: newTask.title,
                            description: newTask.description,
                            assignee: newTask.assignee,
                            status: 'pending',
                            priority: newTask.priority,
                            dueDate: newTask.dueDate ? format(newTask.dueDate, 'yyyy-MM-dd') : '',
                            department: newTask.department
                          };
                          setTasks(prev => [...prev, task]);
                          setNewTask({ title: '', description: '', assignee: '', priority: 'medium', department: '', dueDate: undefined });
                        }
                      }}
                      disabled={!newTask.title || !newTask.assignee}
                    >
                      <Icon name="Plus" size={20} className="mr-2" />
                      Создать задачу
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tasks List */}
              <Card>
                <CardHeader>
                  <CardTitle>Все задачи ({tasks.length})</CardTitle>
                  <CardDescription>
                    Список всех задач в системе
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority === 'high' ? 'Высокий' : 
                               task.priority === 'medium' ? 'Средний' : 'Низкий'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Исполнитель: {task.assignee}</span>
                            {task.dueDate && <span>Срок: {task.dueDate}</span>}
                            <span>{task.department}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(task.status, 'task')}>
                            {task.status === 'in_progress' ? 'В работе' :
                             task.status === 'completed' ? 'Выполнено' :
                             task.status === 'overdue' ? 'Просрочено' : 'Ожидает'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Icon name="Edit" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Управление документами</h2>
                  <p className="text-gray-600">Маршрутизация, согласование и анализ документов</p>
                </div>
              </div>

              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="upload">Загрузить</TabsTrigger>
                  <TabsTrigger value="list">Все документы</TabsTrigger>
                  <TabsTrigger value="routing">Маршрутизация</TabsTrigger>
                  <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Загрузить новый документ</CardTitle>
                      <CardDescription>
                        Выберите файл и настройте маршрут согласования
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* File Upload */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                        <Icon name="Upload" size={48} className="mx-auto text-gray-400 mb-4" />
                        <div className="space-y-2">
                          <p className="text-lg font-medium text-gray-900">Перетащите файл сюда</p>
                          <p className="text-sm text-gray-600">или нажмите для выбора</p>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX до 10 МБ</p>
                        </div>
                        <Button className="mt-4" variant="outline">
                          <Icon name="Upload" size={20} className="mr-2" />
                          Выбрать файл
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="doc-title">Название документа *</Label>
                          <Input
                            id="doc-title"
                            placeholder="Введите название"
                            value={newDocument.title}
                            onChange={(e) => {
                              const title = e.target.value;
                              setNewDocument(prev => ({ 
                                ...prev, 
                                title,
                                riskAnalysis: analyzeDocumentRisk(title, prev.type)
                              }));
                            }}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="doc-type">Тип документа *</Label>
                          <Select value={newDocument.type} onValueChange={(value) => {
                            setNewDocument(prev => ({ 
                              ...prev, 
                              type: value,
                              riskAnalysis: analyzeDocumentRisk(prev.title, value)
                            }));
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                              {documentTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="doc-priority">Приоритет</Label>
                          <Select value={newDocument.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewDocument(prev => ({ ...prev, priority: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите приоритет" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Низкий</SelectItem>
                              <SelectItem value="medium">Средний</SelectItem>
                              <SelectItem value="high">Высокий</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="doc-task">Привязать к задаче</Label>
                          <Select value={newDocument.assignedTask} onValueChange={(value) => setNewDocument(prev => ({ ...prev, assignedTask: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите задачу" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Не привязывать</SelectItem>
                              {tasks.map((task) => (
                                <SelectItem key={task.id} value={task.title}>
                                  {task.title} ({task.assignee})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Risk Analysis */}
                      {newDocument.riskAnalysis && newDocument.riskAnalysis.score > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon name="AlertTriangle" size={20} className="text-yellow-600" />
                            <h4 className="font-medium text-yellow-800">Анализ рисков</h4>
                            <Badge className="bg-yellow-100 text-yellow-800">Риск: {newDocument.riskAnalysis.score}%</Badge>
                          </div>
                          <div className="space-y-1">
                            {newDocument.riskAnalysis.warnings.map((warning, index) => (
                              <p key={index} className="text-sm text-yellow-700">• {warning}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Approvers */}
                      <div className="space-y-2">
                        <Label>Маршрут согласования</Label>
                        <div className="border rounded-lg p-4 space-y-3">
                          <p className="text-sm text-gray-600">Выберите согласующих лиц в порядке прохождения:</p>
                          
                          <div className="space-y-2">
                            {approversList.map((approver, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <input 
                                  type="checkbox" 
                                  id={`approver-${index}`}
                                  className="rounded border-gray-300"
                                  checked={newDocument.approvers.includes(approver)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setNewDocument(prev => ({ ...prev, approvers: [...prev.approvers, approver] }));
                                    } else {
                                      setNewDocument(prev => ({ ...prev, approvers: prev.approvers.filter(a => a !== approver) }));
                                    }
                                  }}
                                />
                                <label htmlFor={`approver-${index}`} className="text-sm">{approver}</label>
                                {newDocument.approvers.includes(approver) && (
                                  <Badge variant="outline" className="text-xs">№{newDocument.approvers.indexOf(approver) + 1}</Badge>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {newDocument.approvers.length > 0 && (
                            <div className="mt-3 p-2 bg-blue-50 rounded border">
                              <p className="text-xs text-blue-700 font-medium">Порядок согласования:</p>
                              <div className="text-xs text-blue-600 mt-1">
                                {newDocument.approvers.map((approver, index) => (
                                  <span key={index}>
                                    {index + 1}. {approver}
                                    {index < newDocument.approvers.length - 1 && ' → '}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <Button variant="outline" onClick={() => {
                          setNewDocument({ title: '', type: '', priority: 'medium', department: '', assignedTask: '', approvers: [], riskAnalysis: null });
                        }}>
                          Очистить
                        </Button>
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => {
                            if (newDocument.title && newDocument.type) {
                              const doc: Document = {
                                id: String(documents.length + 1),
                                title: newDocument.title,
                                type: newDocument.type,
                                status: 'draft',
                                priority: newDocument.priority,
                                author: mockUser.name,
                                department: newDocument.department || mockUser.department,
                                lastModified: format(new Date(), 'yyyy-MM-dd')
                              };
                              setDocuments(prev => [...prev, doc]);
                              setNewDocument({ title: '', type: '', priority: 'medium', department: '', assignedTask: '', approvers: [], riskAnalysis: null });
                            }
                          }}
                          disabled={!newDocument.title || !newDocument.type}
                        >
                          <Icon name="Upload" size={20} className="mr-2" />
                          Загрузить документ
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="list" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Все документы ({documents.length})</CardTitle>
                      <CardDescription>
                        Список всех документов в системе
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <Icon name="FileText" size={20} className="text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium">{doc.title}</h4>
                                  <Badge variant="outline">{doc.type}</Badge>
                                </div>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span>Автор: {doc.author}</span>
                                  <span>Отдел: {doc.department}</span>
                                  <span>Изменен: {doc.lastModified}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(doc.priority)}>
                                {doc.priority === 'high' ? 'Высокий' : 
                                 doc.priority === 'medium' ? 'Средний' : 'Низкий'}
                              </Badge>
                              <Badge className={getStatusColor(doc.status, 'document')}>
                                {doc.status === 'approved' ? 'Одобрено' :
                                 doc.status === 'review' ? 'На согласовании' :
                                 doc.status === 'rejected' ? 'Отклонено' : 'Черновик'}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Icon name="Eye" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Download" size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="routing" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Маршруты согласования</CardTitle>
                        <CardDescription>Настройка автоматических маршрутов</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Договоры</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>1. Юрист → 2. Гл. бухгалтер → 3. Директор</p>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Заявления на отпуск</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>1. HR-специалист → 2. Менеджер</p>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Приказы</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>1. Директор (только утверждение)</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Уведомления</CardTitle>
                        <CardDescription>Настройка умных напоминаний</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2 text-red-600">Высокий приоритет</h4>
                          <div className="text-sm text-gray-600">
                            <p>Напоминания каждые 2 часа</p>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2 text-yellow-600">Средний приоритет</h4>
                          <div className="text-sm text-gray-600">
                            <p>Напоминания каждые 8 часов</p>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2 text-green-600">Низкий приоритет</h4>
                          <div className="text-sm text-gray-600">
                            <p>Напоминания каждые 24 часа</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Всего документов</CardTitle>
                        <Icon name="FileText" className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{documents.length}</div>
                        <p className="text-xs text-muted-foreground">
                          +{documents.filter(d => d.lastModified === format(new Date(), 'yyyy-MM-dd')).length} сегодня
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">На согласовании</CardTitle>
                        <Icon name="Clock" className="h-4 w-4 text-yellow-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{documents.filter(d => d.status === 'review').length}</div>
                        <p className="text-xs text-muted-foreground">
                          Требует внимания
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Среднее время</CardTitle>
                        <Icon name="Timer" className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">2.4 дня</div>
                        <p className="text-xs text-muted-foreground">
                          Обработки документа
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Аналитика по типам документов</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {documentTypes.map((type) => {
                          const count = documents.filter(d => d.type === type).length;
                          const percentage = documents.length > 0 ? (count / documents.length) * 100 : 0;
                          return (
                            <div key={type} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{type}</span>
                                <span className="text-xs text-gray-500">({count})</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500 w-10">{percentage.toFixed(0)}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Управление заявлениями</h2>
                  <p className="text-gray-600">Подача и обработка заявлений на отпуск, командировки, закупки</p>
                </div>
              </div>

              <Tabs defaultValue="create" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="create">Создать</TabsTrigger>
                  <TabsTrigger value="my-applications">Мои заявления</TabsTrigger>
                  <TabsTrigger value="approval">На согласовании</TabsTrigger>
                  <TabsTrigger value="all">Все заявления</TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Создать новое заявление</CardTitle>
                      <CardDescription>
                        Выберите тип заявления и заполните необходимые данные
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Application Type Selection */}
                      <div className="space-y-2">
                        <Label>Тип заявления *</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { value: 'vacation', label: 'Отпуск', icon: 'Calendar', color: 'bg-blue-100 text-blue-800' },
                            { value: 'business_trip', label: 'Командировка', icon: 'Plane', color: 'bg-green-100 text-green-800' },
                            { value: 'purchase', label: 'Закупка', icon: 'ShoppingCart', color: 'bg-purple-100 text-purple-800' },
                            { value: 'other', label: 'Другое', icon: 'FileText', color: 'bg-gray-100 text-gray-800' }
                          ].map((type) => (
                            <button
                              key={type.value}
                              onClick={() => setNewApplication(prev => ({ ...prev, type: type.value as any, title: '' }))}
                              className={`p-4 border-2 rounded-lg transition-all text-center ${
                                newApplication.type === type.value 
                                  ? 'border-primary bg-primary/5' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Icon name={type.icon as any} size={32} className="mx-auto mb-2 text-gray-600" />
                              <p className="font-medium text-sm">{type.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dynamic Form Based on Type */}
                      {newApplication.type && (
                        <div className="space-y-6">
                          {/* Common Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="app-title">Название заявления *</Label>
                              <Input
                                id="app-title"
                                placeholder={
                                  newApplication.type === 'vacation' ? 'Заявление на отпуск' :
                                  newApplication.type === 'business_trip' ? 'Командировка в...' :
                                  newApplication.type === 'purchase' ? 'Закупка оборудования' : 'Опишите заявление'
                                }
                                value={newApplication.title}
                                onChange={(e) => setNewApplication(prev => ({ ...prev, title: e.target.value }))}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="app-priority">Приоритет</Label>
                              <Select value={newApplication.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewApplication(prev => ({ ...prev, priority: value }))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите приоритет" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Низкий</SelectItem>
                                  <SelectItem value="medium">Средний</SelectItem>
                                  <SelectItem value="high">Высокий</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Vacation Specific Fields */}
                          {newApplication.type === 'vacation' && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label>Начало отпуска *</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <Icon name="Calendar" className="mr-2 h-4 w-4" />
                                        {newApplication.startDate ? format(newApplication.startDate, 'dd.MM.yyyy', { locale: ru }) : 'Выберите дату'}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={newApplication.startDate}
                                        onSelect={(date) => setNewApplication(prev => ({ ...prev, startDate: date }))}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label>Окончание отпуска *</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <Icon name="Calendar" className="mr-2 h-4 w-4" />
                                        {newApplication.endDate ? format(newApplication.endDate, 'dd.MM.yyyy', { locale: ru }) : 'Выберите дату'}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={newApplication.endDate}
                                        onSelect={(date) => setNewApplication(prev => ({ ...prev, endDate: date }))}
                                        disabled={(date) => date < (newApplication.startDate || new Date())}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                              
                              {newApplication.startDate && newApplication.endDate && (
                                <div className="p-3 bg-blue-50 rounded-lg">
                                  <p className="text-sm text-blue-700">
                                    Продолжительность: {Math.ceil((newApplication.endDate.getTime() - newApplication.startDate.getTime()) / (1000 * 60 * 60 * 24))} дней
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Business Trip Specific Fields */}
                          {newApplication.type === 'business_trip' && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label>Направление *</Label>
                                  <Input
                                    placeholder="Город, страна"
                                    value={newApplication.destination}
                                    onChange={(e) => setNewApplication(prev => ({ ...prev, destination: e.target.value }))}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label>Предполагаемая сумма</Label>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    value={newApplication.amount}
                                    onChange={(e) => setNewApplication(prev => ({ ...prev, amount: e.target.value }))}
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label>Дата отъезда *</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <Icon name="Calendar" className="mr-2 h-4 w-4" />
                                        {newApplication.startDate ? format(newApplication.startDate, 'dd.MM.yyyy', { locale: ru }) : 'Выберите дату'}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={newApplication.startDate}
                                        onSelect={(date) => setNewApplication(prev => ({ ...prev, startDate: date }))}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label>Дата возвращения *</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <Icon name="Calendar" className="mr-2 h-4 w-4" />
                                        {newApplication.endDate ? format(newApplication.endDate, 'dd.MM.yyyy', { locale: ru }) : 'Выберите дату'}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={newApplication.endDate}
                                        onSelect={(date) => setNewApplication(prev => ({ ...prev, endDate: date }))}
                                        disabled={(date) => date < (newApplication.startDate || new Date())}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label>Цель командировки *</Label>
                                <Textarea
                                  placeholder="Опишите цель и задачи командировки"
                                  value={newApplication.purpose}
                                  onChange={(e) => setNewApplication(prev => ({ ...prev, purpose: e.target.value }))}
                                  rows={3}
                                />
                              </div>
                            </div>
                          )}

                          {/* Purchase Specific Fields */}
                          {newApplication.type === 'purchase' && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label>Сумма закупки *</Label>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    value={newApplication.amount}
                                    onChange={(e) => setNewApplication(prev => ({ ...prev, amount: e.target.value }))}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label>Необходимая дата поставки</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <Icon name="Calendar" className="mr-2 h-4 w-4" />
                                        {newApplication.endDate ? format(newApplication.endDate, 'dd.MM.yyyy', { locale: ru }) : 'Выберите дату'}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={newApplication.endDate}
                                        onSelect={(date) => setNewApplication(prev => ({ ...prev, endDate: date }))}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label>Обоснование закупки *</Label>
                                <Textarea
                                  placeholder="Опишите, что необходимо приобрести и почему"
                                  value={newApplication.purpose}
                                  onChange={(e) => setNewApplication(prev => ({ ...prev, purpose: e.target.value }))}
                                  rows={3}
                                />
                              </div>
                            </div>
                          )}

                          {/* Other Type Fields */}
                          {newApplication.type === 'other' && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Описание заявления *</Label>
                                <Textarea
                                  placeholder="Подробно опишите суть заявления"
                                  value={newApplication.description}
                                  onChange={(e) => setNewApplication(prev => ({ ...prev, description: e.target.value }))}
                                  rows={4}
                                />
                              </div>
                            </div>
                          )}

                          {/* Auto-routing Info */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2 flex items-center">
                              <Icon name="Route" size={16} className="mr-2" />
                              Маршрут согласования
                            </h4>
                            <p className="text-sm text-gray-600">
                              {newApplication.type === 'vacation' && 'Автоматически направлено HR-специалисту, затем начальнику отдела'}
                              {newApplication.type === 'business_trip' && 'Автоматически направлено начальнику отдела, затем финансовому директору'}
                              {newApplication.type === 'purchase' && (
                                newApplication.amount && parseInt(newApplication.amount) > 50000 
                                  ? 'Автоматически направлено отделу закупок, затем директору (сумма > 50,000₽)'
                                  : 'Автоматически направлено отделу закупок'
                              )}
                              {newApplication.type === 'other' && 'Автоматически направлено начальнику отдела'}
                            </p>
                          </div>

                          <div className="flex justify-end space-x-3">
                            <Button variant="outline" onClick={() => {
                              setNewApplication({
                                type: 'vacation',
                                title: '',
                                description: '',
                                priority: 'medium',
                                startDate: undefined,
                                endDate: undefined,
                                amount: '',
                                destination: '',
                                purpose: '',
                                documents: []
                              });
                            }}>
                              Очистить
                            </Button>
                            <Button variant="outline">
                              <Icon name="Save" size={16} className="mr-2" />
                              Сохранить черновик
                            </Button>
                            <Button 
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => {
                                if (newApplication.title) {
                                  const app: Application = {
                                    id: String(applications.length + 1),
                                    type: newApplication.type,
                                    title: newApplication.title,
                                    applicant: mockUser.name,
                                    status: 'submitted',
                                    priority: newApplication.priority,
                                    submittedDate: format(new Date(), 'yyyy-MM-dd'),
                                    amount: newApplication.amount ? parseInt(newApplication.amount) : undefined,
                                    period: newApplication.startDate && newApplication.endDate 
                                      ? `${format(newApplication.startDate, 'dd.MM.yyyy')} - ${format(newApplication.endDate, 'dd.MM.yyyy')}` 
                                      : undefined
                                  };
                                  setApplications(prev => [...prev, app]);
                                  setNewApplication({
                                    type: 'vacation',
                                    title: '',
                                    description: '',
                                    priority: 'medium',
                                    startDate: undefined,
                                    endDate: undefined,
                                    amount: '',
                                    destination: '',
                                    purpose: '',
                                    documents: []
                                  });
                                }
                              }}
                              disabled={!newApplication.title}
                            >
                              <Icon name="Send" size={16} className="mr-2" />
                              Подать заявление
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="my-applications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Мои заявления</CardTitle>
                      <CardDescription>
                        Список всех моих заявлений
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {applications
                          .filter(app => app.applicant === mockUser.name)
                          .map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-blue-100 rounded-lg">
                                <Icon name={
                                  app.type === 'vacation' ? 'Calendar' :
                                  app.type === 'business_trip' ? 'Plane' :
                                  app.type === 'purchase' ? 'ShoppingCart' : 'FileText'
                                } size={20} className="text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{app.title}</h4>
                                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                  <span>Подано: {app.submittedDate}</span>
                                  {app.amount && <span>Сумма: {app.amount.toLocaleString()} ₽</span>}
                                  {app.period && <span>Период: {app.period}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(app.priority)}>
                                {app.priority === 'high' ? 'Высокий' : 
                                 app.priority === 'medium' ? 'Средний' : 'Низкий'}
                              </Badge>
                              <Badge className={getStatusColor(app.status, 'application')}>
                                {app.status === 'approved' ? 'Одобрено' :
                                 app.status === 'submitted' ? 'На рассмотрении' :
                                 app.status === 'rejected' ? 'Отклонено' : 'Черновик'}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Icon name="Eye" size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="approval" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Заявления на согласовании</CardTitle>
                      <CardDescription>
                        Заявления, ожидающие вашего решения
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {applications
                          .filter(app => app.status === 'submitted')
                          .map((app) => (
                          <div key={app.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-4 flex-1">
                                <div className="p-3 bg-yellow-100 rounded-lg">
                                  <Icon name={
                                    app.type === 'vacation' ? 'Calendar' :
                                    app.type === 'business_trip' ? 'Plane' :
                                    app.type === 'purchase' ? 'ShoppingCart' : 'FileText'
                                  } size={20} className="text-yellow-600" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-lg">{app.title}</h4>
                                  <p className="text-gray-600">Заявитель: {app.applicant}</p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                                    <span>Подано: {app.submittedDate}</span>
                                    {app.amount && <span>Сумма: {app.amount.toLocaleString()} ₽</span>}
                                    {app.period && <span>Период: {app.period}</span>}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <Badge className={getPriorityColor(app.priority)}>
                                  {app.priority === 'high' ? 'Высокий' : 
                                   app.priority === 'medium' ? 'Средний' : 'Низкий'}
                                </Badge>
                                <Button size="sm" variant="outline">
                                  <Icon name="Eye" size={14} className="mr-2" />
                                  Просмотр
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <Icon name="X" size={14} className="mr-2" />
                                  Отклонить
                                </Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  <Icon name="Check" size={14} className="mr-2" />
                                  Одобрить
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {applications.filter(app => app.status === 'submitted').length === 0 && (
                          <div className="text-center py-8">
                            <Icon name="CheckCircle" size={48} className="mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-500">Нет заявлений на согласовании</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="all" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
                        <div className="text-sm text-gray-600">Всего заявлений</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">{applications.filter(a => a.status === 'submitted').length}</div>
                        <div className="text-sm text-gray-600">На рассмотрении</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{applications.filter(a => a.status === 'approved').length}</div>
                        <div className="text-sm text-gray-600">Одобрено</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">{applications.filter(a => a.status === 'rejected').length}</div>
                        <div className="text-sm text-gray-600">Отклонено</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Все заявления</CardTitle>
                      <CardDescription>
                        Полный список заявлений в системе
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {applications.map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-purple-100 rounded-lg">
                                <Icon name={
                                  app.type === 'vacation' ? 'Calendar' :
                                  app.type === 'business_trip' ? 'Plane' :
                                  app.type === 'purchase' ? 'ShoppingCart' : 'FileText'
                                } size={20} className="text-purple-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{app.title}</h4>
                                <p className="text-sm text-gray-600">Заявитель: {app.applicant}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                  <span>Подано: {app.submittedDate}</span>
                                  {app.amount && <span>Сумма: {app.amount.toLocaleString()} ₽</span>}
                                  {app.period && <span>Период: {app.period}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">
                                {app.type === 'vacation' ? 'Отпуск' :
                                 app.type === 'business_trip' ? 'Командировка' :
                                 app.type === 'purchase' ? 'Закупка' : 'Другое'}
                              </Badge>
                              <Badge className={getPriorityColor(app.priority)}>
                                {app.priority === 'high' ? 'Высокий' : 
                                 app.priority === 'medium' ? 'Средний' : 'Низкий'}
                              </Badge>
                              <Badge className={getStatusColor(app.status, 'application')}>
                                {app.status === 'approved' ? 'Одобрено' :
                                 app.status === 'submitted' ? 'На рассмотрении' :
                                 app.status === 'rejected' ? 'Отклонено' : 'Черновик'}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Icon name="Eye" size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {mockUser.role === 'manager' ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Аналитика и отчеты</h2>
                      <p className="text-gray-600">Полная статистика эффективности сотрудников и выполнения задач</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Выполнено задач</CardTitle>
                        <Icon name="CheckCircle2" className="h-4 w-4 text-green-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</div>
                        <p className="text-xs text-muted-foreground">
                          из {tasks.length} всего задач
                        </p>
                        <Progress value={(tasks.filter(t => t.status === 'completed').length / tasks.length) * 100} className="mt-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">В работе</CardTitle>
                        <Icon name="Clock" className="h-4 w-4 text-blue-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === 'in_progress').length}</div>
                        <p className="text-xs text-muted-foreground">
                          активных задач
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Просрочено</CardTitle>
                        <Icon name="AlertTriangle" className="h-4 w-4 text-red-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-600">{tasks.filter(t => t.status === 'overdue').length}</div>
                        <p className="text-xs text-muted-foreground">
                          требует внимания
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Эффективность</CardTitle>
                        <Icon name="TrendingUp" className="h-4 w-4 text-purple-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                          {Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                          общий показатель
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Статус задач по отделам</CardTitle>
                        <CardDescription>Распределение задач по статусам</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={[
                            { name: 'HR', completed: 2, in_progress: 1, pending: 1, overdue: 0 },
                            { name: 'ИТ', completed: 1, in_progress: 2, pending: 1, overdue: 1 },
                            { name: 'Бухгалтерия', completed: 1, in_progress: 0, pending: 1, overdue: 0 },
                            { name: 'Закупки', completed: 2, in_progress: 1, pending: 0, overdue: 0 },
                            { name: 'Маркетинг', completed: 1, in_progress: 1, pending: 1, overdue: 0 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="completed" fill="#22c55e" name="Выполнено" />
                            <Bar dataKey="in_progress" fill="#3b82f6" name="В работе" />
                            <Bar dataKey="pending" fill="#f59e0b" name="Ожидает" />
                            <Bar dataKey="overdue" fill="#ef4444" name="Просрочено" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Производительность сотрудников</CardTitle>
                        <CardDescription>Количество выполненных задач за период</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={[
                            { name: 'Петров А.', tasks: 8, efficiency: 85 },
                            { name: 'Иванова М.', tasks: 12, efficiency: 92 },
                            { name: 'Сидоров И.', tasks: 6, efficiency: 75 },
                            { name: 'Козлов Д.', tasks: 10, efficiency: 88 },
                            { name: 'Смирнова О.', tasks: 7, efficiency: 80 }
                          ]} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={100} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="tasks" fill="#8b5cf6" name="Задач выполнено" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Динамика выполнения задач</CardTitle>
                        <CardDescription>Тренд за последние 7 дней</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={[
                            { day: 'Пн', completed: 3, created: 5 },
                            { day: 'Вт', completed: 5, created: 4 },
                            { day: 'Ср', completed: 4, created: 6 },
                            { day: 'Чт', completed: 7, created: 3 },
                            { day: 'Пт', completed: 6, created: 7 },
                            { day: 'Сб', completed: 2, created: 1 },
                            { day: 'Вс', completed: 1, created: 2 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} name="Выполнено" />
                            <Line type="monotone" dataKey="created" stroke="#3b82f6" strokeWidth={2} name="Создано" />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Распределение по приоритетам</CardTitle>
                        <CardDescription>Текущие активные задачи</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Высокий', value: tasks.filter(t => t.priority === 'high').length, color: '#ef4444' },
                                { name: 'Средний', value: tasks.filter(t => t.priority === 'medium').length, color: '#f59e0b' },
                                { name: 'Низкий', value: tasks.filter(t => t.priority === 'low').length, color: '#22c55e' }
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {[
                                { name: 'Высокий', value: tasks.filter(t => t.priority === 'high').length, color: '#ef4444' },
                                { name: 'Средний', value: tasks.filter(t => t.priority === 'medium').length, color: '#f59e0b' },
                                { name: 'Низкий', value: tasks.filter(t => t.priority === 'low').length, color: '#22c55e' }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Icon name="Lightbulb" size={24} className="text-yellow-600 mr-2" />
                        Краткие выводы и рекомендации
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="flex items-start space-x-3">
                          <Icon name="TrendingUp" size={20} className="text-green-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-green-900">Положительная динамика</h4>
                            <p className="text-sm text-gray-700 mt-1">
                              Общая эффективность выполнения задач составляет {Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%. 
                              Это хороший показатель. Иванова М. показывает лучший результат - 92% эффективности с 12 выполненными задачами.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-yellow-200">
                        <div className="flex items-start space-x-3">
                          <Icon name="AlertCircle" size={20} className="text-yellow-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-yellow-900">Требует внимания</h4>
                            <p className="text-sm text-gray-700 mt-1">
                              Обнаружено {tasks.filter(t => t.status === 'overdue').length} просроченных задач, в основном в отделе ИТ. 
                              Рекомендуется перераспределить нагрузку и пересмотреть сроки выполнения текущих задач.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <div className="flex items-start space-x-3">
                          <Icon name="Users" size={20} className="text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-blue-900">Распределение нагрузки</h4>
                            <p className="text-sm text-gray-700 mt-1">
                              Наибольшая нагрузка приходится на отделы ИТ и Маркетинг ({tasks.filter(t => t.department === 'ИТ').length} и {tasks.filter(t => t.department === 'Маркетинг').length} задач соответственно). 
                              Сидоров И. имеет самую низкую эффективность (75%) - возможно, требуется дополнительная поддержка или обучение.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-purple-200">
                        <div className="flex items-start space-x-3">
                          <Icon name="Target" size={20} className="text-purple-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-purple-900">Рекомендации</h4>
                            <ul className="text-sm text-gray-700 mt-1 space-y-1 list-disc list-inside">
                              <li>Провести встречу с отделом ИТ для анализа причин просрочек</li>
                              <li>Рассмотреть возможность снижения нагрузки на Сидорова И.</li>
                              <li>Внедрить практику Ивановой М. в работу других сотрудников</li>
                              <li>Пересмотреть приоритеты задач - {tasks.filter(t => t.priority === 'high').length} задач с высоким приоритетом</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Icon name="Lock" size={64} className="text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Доступ ограничен</h3>
                    <p className="text-gray-600 text-center max-w-md">
                      Раздел аналитики доступен только для руководителей. 
                      Обратитесь к администратору системы для получения прав доступа.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'tasks' && activeTab !== 'documents' && activeTab !== 'applications' && activeTab !== 'analytics' && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Icon name="Construction" size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Раздел "{navigationItems.find(item => item.id === activeTab)?.label}" в разработке
                </h3>
                <p className="text-gray-600">
                  Функционал будет доступен в следующих версиях системы
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Index;
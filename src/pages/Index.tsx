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

const getStatusColor = (status: string, type: 'task' | 'document') => {
  if (type === 'task') {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
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

          {activeTab !== 'dashboard' && activeTab !== 'tasks' && activeTab !== 'documents' && (
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
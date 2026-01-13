import { TaskItem } from "../models/TaskItem";

export const taskMock: TaskItem[] = [
     new TaskItem(
    "1",
    "Configurar proyecto",
    "Inicializar React + Vite + Tailwind",
    new Date(2026, 10, 15),
    "Todo"
  ),
  new TaskItem(
    "2",
    "Implementar login - Este texto es muy largo y la idea es probar el overflow en css",
    "Pantalla y lógica de autenticación",
    new Date(2026, 0, 15),
    "Doing"
  ),
  new TaskItem(
    "3",
    "Listado de tareas",
    "Vista principal con estado y fechas y un texto muy largo para probar el corte de css",
    new Date(2026, 0, 1),
    "Done"
  ),
  new TaskItem(
    "4",
    "Refactor dominio",
    "Separar entidades y servicios",
    new Date(2026, 0, 10),
    "Todo"
  ),
]
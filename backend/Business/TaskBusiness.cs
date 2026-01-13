using Data;
using Data.Model;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Business
{
    public class TaskBusiness : ITaskBusiness
    {
        private readonly AppDbContext _dbContext;
        public TaskBusiness(AppDbContext dbContext) 
        { 
            _dbContext = dbContext;
        }

        /// <summary>
        /// Get all task
        /// </summary>
        /// <returns>IEnumerable<TaskItem></returns>
        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            var tasks = await _dbContext.Tasks.AsNoTracking().ToListAsync();
            return tasks.Select(task => new TaskItem{
                                            Id = task.Id,
                                            Title = task.Title,
                                            Description = task.Description ?? "",
                                            DueDate = task.DueDate,
                                            Status = task.Status
                                        });
        }

        /// <summary>
        /// Get a task by Id
        /// </summary>
        /// <param name="id">Task Id</param>
        /// <returns>TaskItem</returns>
#pragma warning disable CS8613 // La nulabilidad de los tipos de referencia en el tipo de valor devuelto no coincide con el miembro implementado de forma implícita
        public async Task<TaskItem?> GetTaskByIdAsync(int id)
#pragma warning restore CS8613 // La nulabilidad de los tipos de referencia en el tipo de valor devuelto no coincide con el miembro implementado de forma implícita
        {
            var task = await _dbContext.Tasks.AsNoTracking().FirstOrDefaultAsync(task => task.Id == id);

            if(task == null) return null;

            return new TaskItem
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description ?? "",
                DueDate = task.DueDate,
                Status = task.Status
            };
        }

        /// <summary>
        /// Add a new task
        /// </summary>
        /// <param name="item">TaskItem</param>
        /// <returns>TaskId</returns>
        public async Task<int> AddNewTaskAsync(TaskItem item)
        {
            ArgumentNullException.ThrowIfNull(item);

            var taskData = new TaskData
            {
                Title = item.Title,
                Description = item.Description,
                DueDate = item.DueDate
            };

            await _dbContext.Tasks.AddAsync(taskData);
            await _dbContext.SaveChangesAsync();

            return taskData.Id;
        }

        /// <summary>
        /// Update a task
        /// </summary>
        /// <param name="item">TaskItem</param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public async Task UpdateTaskAsync(TaskItem item)
        {
            ArgumentNullException.ThrowIfNull(item);

            var currentTask = await _dbContext.Tasks.FirstOrDefaultAsync(task => task.Id == item.Id) ?? throw new KeyNotFoundException("Task not found");

            currentTask.Title = item.Title;
            currentTask.Description = item.Description;
            currentTask.DueDate = item.DueDate;

            await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Remove a task
        /// </summary>
        /// <param name="id">TaskId</param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public async Task DeleteTaskByIdAsync(int id)
        {
            var currentTask = await _dbContext.Tasks.FirstOrDefaultAsync(task => task.Id == id) ?? throw new KeyNotFoundException("Task not found");
            _dbContext.Tasks.Remove(currentTask);
            await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Updata task status to Doing
        /// </summary>
        /// <param name="id">TaskId</param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        /// <exception cref="InvalidOperationException"></exception>
        public async Task StartTaskAsync(int id)
        {
            var currentTask = await _dbContext.Tasks.FirstOrDefaultAsync(task => task.Id == id) ?? throw new KeyNotFoundException("Task not found");
            
            if(currentTask.Status != TaskItemStatus.Todo) throw new InvalidOperationException($"El estado '{currentTask.Status}' no es válido para esta operación.");

            currentTask.Status = TaskItemStatus.Doing;
            await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Update task status to Done
        /// </summary>
        /// <param name="id">TaskId</param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        /// <exception cref="InvalidOperationException"></exception>
        public async Task CompleteTaskAsync(int id)
        {
            var currentTask = await _dbContext.Tasks.FirstOrDefaultAsync(task => task.Id == id) ?? throw new KeyNotFoundException("Task not found");
            
            if (currentTask.Status != TaskItemStatus.Doing) throw new InvalidOperationException($"El estado '{currentTask.Status}' no es válido para esta operación.");

            currentTask.Status = TaskItemStatus.Done;
            await _dbContext.SaveChangesAsync();
        }
    }
}

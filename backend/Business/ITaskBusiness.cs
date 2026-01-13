using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public interface ITaskBusiness
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();

        Task<TaskItem> GetTaskByIdAsync(int id);

        Task<int> AddNewTaskAsync(TaskItem item);

        Task UpdateTaskAsync(TaskItem item);

        Task DeleteTaskByIdAsync(int id);

        Task StartTaskAsync(int id);

        Task CompleteTaskAsync(int id);
    }
}

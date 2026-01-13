using Business;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    private readonly ITaskBusiness _business;
    public TaskController(ITaskBusiness business)
    {
        _business = business;
    }

    #region CRUD
    [HttpGet(Name = "GetTasks")]
    public async Task<ActionResult<IEnumerable<TaskItem>>> Get()
    {
        var tasks = await _business.GetAllTasksAsync();
        return Ok(tasks);
    }

    [HttpGet("{Id}",Name = "GetTask")]
    public async Task<ActionResult<TaskItem>> GetTask(int Id)
    {
        var task = await _business.GetTaskByIdAsync(Id);
        if (task == null)
        {
            return NotFound();
        }
        return Ok(task);
    }

    [HttpPost(Name = "AddTask")]
    public async Task<ActionResult<TaskItem>> AddTask(TaskItem task)
    {
        if(task == null)
            return BadRequest();

        var taskId = await _business.AddNewTaskAsync(task);

        var taskCreated = await _business.GetTaskByIdAsync(taskId);

        return CreatedAtAction(nameof(GetTask), new {id = taskId}, taskCreated);
    }

    [HttpPut(Name = "UpdateTask")]
    public async Task<ActionResult<TaskItem>> UpdateTask(TaskItem task)
    {
        if (task == null)
            return BadRequest();

        var currentTask = await _business.GetTaskByIdAsync(task.Id);
        if (currentTask == null)
            return NotFound();

        await _business.UpdateTaskAsync(task);

        return Ok(task);
    }

    [HttpDelete("{Id}",Name = "RemoveTask")]
    public async Task<ActionResult> RemoveTask(int Id)
    {
        var currentTask = await _business.GetTaskByIdAsync(Id);
        if (currentTask == null)
            return NotFound();

        await _business.DeleteTaskByIdAsync(Id);

        return NoContent();
    }
    #endregion
    #region Status
    [HttpPut("{Id}/start",Name = "StartTask")]
    public async Task<ActionResult> StartTask(int Id)
    {
        var currentTask = await _business.GetTaskByIdAsync(Id);
        if (currentTask == null)
            return NotFound();

        await _business.StartTaskAsync(Id);

        return NoContent();
    }

    [HttpPut("{Id}/complete",Name = "CompleteTask")]
    public async Task<ActionResult> CompleteTask(int Id)
    {
        var currentTask = await _business.GetTaskByIdAsync(Id);
        if (currentTask == null)
            return NotFound();

        await _business.CompleteTaskAsync(Id);

        return NoContent();
    }    
    #endregion
}

using System.Text.Json.Serialization;

namespace Model
{
    public enum TaskItemStatus
    {
        Todo,
        Doing,
        Done
    }

    public class TaskItem
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TaskItemStatus Status { get; set; } = TaskItemStatus.Doing;
    }
}

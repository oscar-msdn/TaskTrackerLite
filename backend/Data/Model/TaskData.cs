using Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Model
{
    public class TaskData
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(30)]
        public required string Title { get; set; }

        [StringLength(100)]
        public string? Description { get; set; }
        
        [Required]
        public DateTime DueDate { get; set; }

        public TaskItemStatus Status { get; set; } = TaskItemStatus.Todo;
    }
}

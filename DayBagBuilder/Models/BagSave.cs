using System;
using System.Collections.Generic;

namespace DayBagBuilder.Models
{
    public partial class BagSave
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? ItemName { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace DayBagBuilder.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public string? TripLocation { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace DayBagBuilder.Models
{
    public partial class BagItem
    {
        public BagItem()
        {
            BagSaves = new HashSet<BagSave>();
        }

        public int Id { get; set; }
        public string? ItemName { get; set; }
        public bool? ForSunny { get; set; }
        public bool? ForHot { get; set; }
        public bool? ForCold { get; set; }
        public bool? ForRain { get; set; }
        public bool? ForSnow { get; set; }

        public virtual ICollection<BagSave> BagSaves { get; set; }
    }
}

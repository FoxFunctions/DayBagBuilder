using System;
using System.Collections.Generic;

namespace DayBagBuilder.Models
{
    public partial class BagSave
    {
        public int BagId { get; set; }
        public int? ItemId { get; set; }

        public virtual BagItem? Item { get; set; }
    }
}
